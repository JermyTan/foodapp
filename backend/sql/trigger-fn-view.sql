DROP VIEW IF EXISTS effective_mws CASCADE;
DROP VIEW IF EXISTS rider_info CASCADE;
DROP VIEW IF EXISTS ftr_mth_sal CASCADE;
DROP VIEW IF EXISTS ptr_wk_sal CASCADE;
DROP VIEW IF EXISTS CombinedScheduleTable CASCADE;
DROP VIEW IF EXISTS st_hr_gen CASCADE;
DROP VIEW IF EXISTS day_gen CASCADE;
DROP VIEW IF EXISTS count_daily_hourly_rider CASCADE;
DROP FUNCTION IF EXISTS check_min_daily_hourly_rider_for_day() CASCADE;
DROP TRIGGER IF EXISTS wws_min_rider_trigger ON wws CASCADE;
DROP TRIGGER IF EXISTS mws_min_rider_trigger ON mws CASCADE;
DROP FUNCTION IF EXISTS check_mws_wk_same() CASCADE;
DROP TRIGGER IF EXISTS mws_check_wk_trigger ON mws CASCADE;

-- Give all ftrider schedules in its stime and etime breakdown per entry, following wws structure
CREATE OR REPLACE VIEW effective_mws AS
SELECT id, dmy, stime1 AS stime, etime1 AS etime
FROM mws JOIN mwsshift mss ON (mws.shift = mss.shift)
UNION
SELECT id, dmy, stime2 AS stime, etime2 AS etime
FROM mws JOIN mwsshift mss ON (mws.shift = mss.shift);

-- Gives all permanent rider info, including FT status
CREATE OR REPLACE VIEW rider_info AS
SELECT r.id, bsalary, email, name, 0 AS isFT FROM riders r NATURAL JOIN users u NATURAL JOIN ptriders ptr
UNION
SELECT r.id, bsalary, email, name, 1 AS isFT FROM riders r NATURAL JOIN users u NATURAL JOIN ftriders ftr;

-- Gives all PAST monthly or weekly salaries of FT and PT riders respectively
CREATE OR REPLACE VIEW ftr_mth_sal AS
WITH FTRiderPastSalary AS (
	SELECT ft.id, bsalary, dfee, (SELECT to_timestamp(deliverdatetime)) AS dldatetime
	FROM ftriders ft JOIN riders r
	ON ft.id = r.id
	JOIN orders o
	ON ft.id = o.rid
	WHERE status = 2)
SELECT id, (SELECT date_trunc('month', dldatetime)) AS mthyr, round(sum(dfee) + avg(bsalary), 2) AS mth_sal
FROM FTRiderPastSalary 
GROUP BY id, (SELECT date_trunc('month', dldatetime));

CREATE OR REPLACE VIEW ptr_wk_sal AS
WITH PTRiderPastSalary AS (
	SELECT pt.id, bsalary, dfee, (SELECT to_timestamp(deliverdatetime)) AS dldatetime
	FROM ptriders pt JOIN riders r
	ON pt.id = r.id
	JOIN orders o
	ON pt.id = o.rid
	WHERE status = 2)
SELECT id, (SELECT date_trunc('week', dldatetime)) AS wkmthyr, round(sum(dfee) + avg(bsalary), 2) AS wk_sal
FROM PTRiderPastSalary 
GROUP BY id, (SELECT date_trunc('week', dldatetime));

-- Combined mws and wws table
CREATE OR REPLACE VIEW CombinedScheduleTable AS
With UnorderedTable AS (
SELECT
	COALESCE(w.id, m.id) as id,
	CASE 
		WHEN m.dmy IS NULL 
		THEN int4range(w.stime, w.etime, '[)') 
		ELSE int4range(m.stime, m.etime, '[)')
	END AS timerange,
	COALESCE(m.dmy, w.dmy) AS sc_date,
	CASE 
		WHEN m.dmy IS NULL 
		THEN 0
		ELSE 1
	END AS isFT
FROM
	wws w FULL OUTER JOIN
	effective_mws m ON (w.id = m.id)
) 
SELECT *
FROM UnorderedTable
ORDER BY sc_date , lower(timerange), upper(timerange);
;

CREATE OR REPLACE VIEW st_hr_gen AS
	SELECT *
	FROM generate_series(10, 21, 1) as sthour;

-- Checks the combined daily hourly count of riders for all existing entries in wws and mws 
CREATE OR REPLACE VIEW count_daily_hourly_rider AS 
	WITH RiderCount AS (
		SELECT
			sc_date,
			sthour,
			count(*) AS cnt
		FROM
			st_hr_gen AS dsh
		LEFT OUTER JOIN CombinedScheduleTable t ON sthour <@ t.timerange
	GROUP BY
		sc_date,
		sthour
		UNION
		SELECT
			t.sc_date,
			dsh.sthour,
			0 AS cnt
		FROM
			CombinedScheduleTable t, st_hr_gen dsh
		WHERE NOT EXISTS (
				SELECT 1
				FROM CombinedScheduleTable t2
				WHERE t2.sc_date = t.sc_date
				AND t2.timerange @> dsh.sthour
			)
	)
	SELECT
		*
	FROM
		RiderCount
	ORDER BY sc_date, sthour;

-- Checks 5 riders are assigned hourly, daily for the day
CREATE OR REPLACE FUNCTION check_min_daily_hourly_rider_for_day()
RETURNS TRIGGER
AS $$
DECLARE
r1 record;
check_date date;
BEGIN
	IF (TG_OP = 'DELETE') or (TG_OP = 'UPDATE') THEN
		IF (TG_TABLE_NAME = 'mws') THEN
			check_date := OLD.dmy;
		ELSE
			check_date := OLD.dmy;
		END IF;
	ELSE
		IF (TG_TABLE_NAME = 'mws') THEN
			check_date := NEW.dmy;
		ELSE
			check_date := NEW.dmy;
		END IF;
	END IF;
	SELECT * INTO r1
	FROM count_daily_hourly_rider cd
	WHERE cnt < 5
	AND check_date = cd.sc_date;

	IF r1 IS NOT NULL THEN
		RAISE exception 'Less than 5 riders for table on table name: % for date: % for input values %', TG_TABLE_NAME, check_date, r1;
	END IF;
	RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger that activates on CRUD of wws/mws
CREATE CONSTRAINT TRIGGER wws_min_rider_trigger
	AFTER INSERT OR UPDATE OR DELETE
	ON wws
	DEFERRABLE INITIALLY DEFERRED
	FOR EACH ROW 
	EXECUTE PROCEDURE check_min_daily_hourly_rider_for_day();

CREATE CONSTRAINT TRIGGER mws_min_rider_trigger
	AFTER INSERT OR UPDATE OR DELETE
	ON mws 
	DEFERRABLE INITIALLY DEFERRED
	FOR EACH ROW 
	EXECUTE PROCEDURE check_min_daily_hourly_rider_for_day();

-- Checks all 4 weeks of the same day of the week in an mws, is the same (if available)
CREATE OR REPLACE FUNCTION check_mws_wk_same()
RETURNS TRIGGER
AS $$
DECLARE
r1 record;
check_id		INTEGER;
check_date 	DATE;
check_shift 	INTEGER;
BEGIN
	IF (TG_OP = 'UPDATE') THEN
		check_id := OLD.id;
		check_date := OLD.dmy;
		check_shift := OLD.shift;
	ELSE
		check_id := NEW.id;
		check_date := NEW.dmy;
		check_shift := NEW.shift;
	END IF;
	SELECT * INTO r1
	FROM mws
	WHERE check_id = mws.id
	AND floor((extract(DOY from mws.dmy) - 1) / 28) + 1 = floor((extract(DOY from check_date) - 1) / 28) + 1
	AND (extract(ISODOW from mws.dmy)) = (extract(ISODOW from check_date))
	AND check_shift <> mws.shift;

	IF r1 IS NOT NULL THEN
		RAISE exception 'Inconsistent shift timing found in mws for rider id: %, date: %, for input values %', check_id, check_date, r1;
	END IF;
	RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE CONSTRAINT TRIGGER mws_check_wk_trigger
	AFTER INSERT OR UPDATE
	ON mws 
	DEFERRABLE INITIALLY DEFERRED
	FOR EACH ROW 
	EXECUTE PROCEDURE check_mws_wk_same();
