DROP VIEW IF EXISTS CombinedTable CASCADE;
DROP VIEW IF EXISTS st_hr_gen CASCADE;
DROP VIEW IF EXISTS day_gen CASCADE;
DROP VIEW IF EXISTS count_daily_hourly_rider CASCADE;

-- Sample PL/PGSQL function
DROP FUNCTION IF EXISTS getrestaurants() CASCADE;
DROP TYPE IF EXISTS rest_tuple CASCADE;

CREATE TYPE rest_tuple AS (rname text, cat text);

CREATE OR REPLACE FUNCTION getrestaurants()
RETURNS SETOF rest_tuple AS $$ 
DECLARE 
	result rest_tuple; 
BEGIN
	for result IN
		SELECT DISTINCT r.rname, f.cat 
		FROM restaurants r
		left outer join
		(food f NATURAL JOIN sells s)
		on r.rname = s.rname
	LOOP
		RETURN next result;
	END LOOP;
END; 
$$ LANGUAGE plpgsql;
-- call fn in backend like this:
-- select * from getrestaurants()

-- Sample PL/PGSQL trigger
DROP FUNCTION IF EXISTS pt_check_dur() CASCADE;

CREATE OR REPLACE FUNCTION public.pt_check_dur()
RETURNS TRIGGER
AS $$
DECLARE
	dur INTEGER;
BEGIN
    SELECT(etime - stime) INTO dur
        FROM wws
        WHERE (etime - stime) >= 4;
    IF dur IS NOT NULL THEN
        RAISE exception 'Rider id: % is working for % hours', wws.id, dur;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Combined mws and wws table
CREATE OR REPLACE VIEW CombinedTable AS
SELECT
	COALESCE(w.id, m.id) as id,
	COALESCE((SELECT
		EXTRACT(WEEK FROM w.dmy)), 
		(SELECT
		EXTRACT(WEEK FROM m.stdom))) AS wknum,
	COALESCE((SELECT
		EXTRACT(ISODOW FROM w.dmy)), (SELECT
		EXTRACT(ISODOW FROM m.stdom))) AS dow,
	COALESCE((SELECT
		EXTRACT(MONTH FROM w.dmy)), 
		(SELECT
		EXTRACT(MONTH FROM m.stdom))) AS mth,
		COALESCE((SELECT
		EXTRACT(YEAR FROM w.dmy)), 
		(SELECT
		EXTRACT(YEAR FROM m.stdom))) AS yr,
	CASE 
		WHEN m.stdom IS NULL 
		THEN int4range(w.stime, w.etime, '[]') 
		ELSE int4range(m.stime, m.etime, '[]')
	END AS timerange,
	w.dmy,
	m.stdom
FROM
	wws w FULL OUTER JOIN 
	mws m ON (w.id = m.id)
;

CREATE OR REPLACE VIEW st_hr_gen AS
	SELECT *
	FROM generate_series(10, 22, 1) as sthour;

CREATE OR REPLACE VIEW day_gen AS
	SELECT *
	FROM generate_series(1, 7, 1) as dayofweek, generate_series(10, 22, 1) as starthour, generate_series(0, 53, 1) as weeknum, 
	generate_series(1970, 2050, 1) as year;

-- Checks the combined daily hourly count of riders for all existing entries in wws and mws 
CREATE OR REPLACE VIEW count_daily_hourly_rider_for_week AS 
	WITH RiderCount AS (
		SELECT
			t.yr AS yr,
			t.wknum AS wknum,
			t.dow AS dow,
			sthour AS sthour,
			count(*) AS cnt
		FROM
			st_hr_gen AS dsh
		LEFT OUTER JOIN CombinedTable t ON sthour <@ t.timerange
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
	), RiderWeekDailyHourlyCount AS (
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
			dg.year IN(
				SELECT
					rc.yr FROM RiderCount rc)
			AND dg.weeknum IN(
				SELECT
					rc.wknum FROM RiderCount rc)
			AND dg.dayofweek IN(
				SELECT
					rc.dow FROM RiderCount rc)
			AND dg.starthour NOT IN(
				SELECT
					rc2.sthour FROM RiderCount rc2
				WHERE
					rc2.yr = dg.year
					AND rc2.wknum = dg.weeknum
					AND rc2.dow = dg.dayofweek
			)
		OR
			dg.year IN(
				SELECT
					rc.yr FROM RiderCount rc)
			AND dg.weeknum IN(
				SELECT
					rc.wknum FROM RiderCount rc)
			AND dg.dayofweek NOT IN(
				SELECT
					rc2.dow FROM RiderCount rc2
				WHERE
					rc2.yr = dg.year
					AND rc2.wknum = dg.weeknum
			)
	)
	SELECT
		*
	FROM
		RiderWeekDailyHourlyCount
	ORDER BY yr, wknum, dow, sthour;


SELECT * from count_daily_hourly_rider_for_week;

-- Checks 5 riders are assigned for every hour for a particular day
DROP FUNCTION IF EXISTS check_wws_constraint() CASCADE;

CREATE OR REPLACE FUNCTION check_wws_constraint()
RETURNS TRIGGER
AS $$
DECLARE
	
BEGIN

	IF weeknum, daynum, sthour IS NOT NULL THEN
		RAISE exception 'Less than 5 riders';
	END IF;
	RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger that activates on CRUD of wws/mws
DROP TRIGGER IF EXISTS wws_trigger ON wws CASCADE;
CREATE CONSTRAINT TRIGGER wws_trigger
	AFTER UPDATE OR DELETE OR INSERT ON wws
	DEFERRABLE INITIALLY DEFERRED
	FOR EACH ROW EXECUTE FUNCTION check_wws_constraint();
