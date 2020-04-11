DROP FUNCTION IF EXISTS getrestaurants();

CREATE TYPE rest_tuple AS (rname text, cat text);

CREATE OR REPLACE FUNCTION getrestaurants()
RETURNS SETOF rest_tuple AS $$ 
declare 
	result rest_tuple; 
begin
	for result in
		select distinct s.rname, f.cat from food f NATURAL JOIN sells s
	loop
		RETURN next result;
	end loop;
end; 
$$ language plpgsql;

-- call fn in backend like this:
-- select * from getrestaurants()
