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
SELECT
	COALESCE(w.id, m.id) as id,
	COALESCE((SELECT
		EXTRACT(WEEK FROM w.dmy)), 
		(SELECT
		EXTRACT(WEEK FROM m.dmy))) AS wknum,
	COALESCE((SELECT
		EXTRACT(ISODOW FROM w.dmy)), (SELECT
		EXTRACT(ISODOW FROM m.dmy))) AS dow,
	COALESCE((SELECT
		EXTRACT(MONTH FROM w.dmy)), 
		(SELECT
		EXTRACT(MONTH FROM m.dmy))) AS mth,
		COALESCE((SELECT
		EXTRACT(YEAR FROM w.dmy)), 
		(SELECT
		EXTRACT(YEAR FROM m.dmy))) AS yr,
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
	mws m ON (w.id = m.id)
;

CREATE OR REPLACE VIEW st_hr_gen AS
	SELECT *
	FROM generate_series(10, 22, 1) as sthour;

CREATE OR REPLACE VIEW day_gen AS
	SELECT *
	FROM generate_series(1, 7, 1) as dayofweek, generate_series(10, 21, 1) as starthour, generate_series(0, 53, 1) as weeknum, 
	generate_series(1970, 2050, 1) as year;

-- Checks the combined daily hourly count of riders for all existing entries in wws and mws 
CREATE OR REPLACE VIEW count_daily_hourly_rider AS 
	WITH RiderCount AS (
		SELECT
			t.yr AS yr,
			t.wknum AS wknum,
			t.dow AS dow,
			sthour AS sthour,
			count(*) AS cnt
		FROM
			st_hr_gen AS dsh
		LEFT OUTER JOIN CombinedScheduleTable t ON sthour <@ t.timerange
	GROUP BY
		t.yr,
		t.wknum,
		t.dow,
		sthour
	ORDER BY
		t.yr,
		t.wknum,
		t.dow,
		sthour
	), RiderDailyHourlyCount AS (
		SELECT
			*
		FROM
			RiderCount rc
		UNION
		SELECT
			dg.year,
			dg.weeknum,
			dg.dayofweek,
			dg.starthour,
			0 AS cnt
		FROM
			day_gen dg
		WHERE
			(dg.year, dg.weeknum, dg.dayofweek) IN (
				SELECT
					yr, wknum, dow FROM RiderCount rc)
			AND dg.starthour NOT IN(
				SELECT
					rc2.sthour FROM RiderCount rc2
				WHERE
					rc2.yr = dg.year
					AND rc2.wknum = dg.weeknum
					AND rc2.dow = dg.dayofweek
			)
	)
	SELECT
		*
	FROM
		RiderDailyHourlyCount
	ORDER BY yr, wknum, dow, sthour;

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
	AND (SELECT EXTRACT(YEAR FROM check_date)) = cd.yr
	AND (SELECT EXTRACT(WEEK FROM check_date)) = cd.wknum
	AND (SELECT EXTRACT(ISODOW FROM check_date)) = cd.dow;

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
