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
DROP FUNCTION IF EXISTS getrestaurants() CASCADE;

CREATE OR REPLACE FUNCTION public.pt_check_dur()
RETURNS TRIGGER
AS $function$
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
$function$ LANGUAGE plpgsql
