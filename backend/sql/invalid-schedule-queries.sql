-- NOTE: SUCCESSFUL QUERIES IMPLEMENTED AS BACKEND ENDPOINTS. NOT INCLUDED HERE.

-- Require min 5 rider per week, else exception will be thrown
BEGIN;
DELETE FROM wws where dmy = '2020-05-02' and stime = '10' and etime = '12';
COMMIT;

BEGIN;
DELETE FROM mws where dmy = '2020-05-02' and shift = '1';
COMMIT;

-- Complete deletion of an entire day's schedule allowed in single, atomic transaction
BEGIN;
DELETE FROM wws where dmy = '2020-05-02';
DELETE FROM mws where dmy = '2020-05-02';
ROLLBACK;


-- Require no overlap between existing entries, else exception thrown
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ('103', '2020-05-02', '11', '13');

-- Require valid operation time, else, exception thrown
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ('103', '2020-05-02', '22', '23');

-- PTRider: Max 4h hourly interval, else exception thrown
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ('103', '2020-05-05', '10', '15');

-- PTRider: Require 1h break between 2 hourly interval, else, exception thrown
BEGIN;
DELETE FROM wws WHERE id = '103' AND dmy = '2020-05-05';
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ('103', '2020-05-05', '10', '14');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ('103', '2020-05-05', '14', '18');
COMMIT;

-- FTRider: 4 WWS equivalent, else, exception thrown
INSERT INTO "public"."mws" ("id", "dmy", "shift") VALUES ('112', '2020-05-09', '2');

-- PTRider: Validate 10 to 48 hours (ie. returns entries which fails the weekly work hr criteria)
SELECT * FROM check_pt_work_hr();

-- FTRider: Validate 5 consec work days (ie. returns entries with more than 5 consecutive work days, OR 5 consec work days + 1 day break + work day afterwards)
SELECT * FROM check_ft_work_hr();
