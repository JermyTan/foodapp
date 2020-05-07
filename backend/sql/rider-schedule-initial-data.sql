-- Clear all rider data
DELETE FROM users WHERE id IN (SELECT r.id from riders r);

-- Initial dummy data to populate 2 week's worth of rider schedule from 2 March to 11 March
BEGIN;
SET CONSTRAINTS ALL DEFERRED;

-- Populate pt riders, then populate wws
INSERT INTO Users (email, name) VALUES('motoride@gmail.com', 'motorider');
INSERT INTO Riders VALUES((SELECT currval('users_id_seq')), '1100');
INSERT INTO Ptriders VALUES((SELECT currval('users_id_seq')));
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-02', '10', '12');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-02', '13', '15');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-02', '16', '18');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-02', '19', '21');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-03', '10', '12');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-03', '13', '15');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-03', '16', '18');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-03', '19', '21');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-04', '10', '12');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-04', '13', '15');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-04', '19', '21');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-06', '20', '22');

INSERT INTO "public"."users" ("email", "name") VALUES ('ptride1@gmail.com', 'PtRide1');
INSERT INTO "public"."riders" ("id", "bsalary") VALUES ((SELECT currval('users_id_seq')), '900');
INSERT INTO "public"."ptriders" ("id") VALUES ((SELECT currval('users_id_seq')));
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-02', '10', '12');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-02', '13', '15');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-02', '16', '18');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-02', '19', '21');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-03', '10', '12');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-03', '13', '15');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-03', '16', '18');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-03', '19', '21');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-05', '12', '14');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-05', '15', '17');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-06', '20', '22');

INSERT INTO "public"."users" ("email", "name") VALUES ('ptride2@gmail.com', 'PtRide2');
INSERT INTO "public"."riders" ("id", "bsalary") VALUES ((SELECT currval('users_id_seq')), '900');
INSERT INTO "public"."ptriders" ("id") VALUES ((SELECT currval('users_id_seq')));
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-02', '10', '12');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-02', '13', '15');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-02', '16', '18');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-02', '19', '21');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-03', '10', '12');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-03', '13', '15');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-03', '16', '18');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-03', '19', '21');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-05', '10', '12');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-06', '20', '22');

INSERT INTO "public"."users" ("email", "name") VALUES ('ptride3@gmail.com', 'PtRide3');
INSERT INTO "public"."riders" ("id", "bsalary") VALUES ((SELECT currval('users_id_seq')), '800');
INSERT INTO "public"."ptriders" ("id") VALUES ((SELECT currval('users_id_seq')));
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-02', '11', '13');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-02', '14', '16');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-02', '17', '19');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-02', '20', '22');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-03', '11', '13');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-03', '14', '16');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-03', '17', '19');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-03', '20', '22');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-06', '20', '22');

INSERT INTO "public"."users" ("email", "name") VALUES ('ptride4@gmail.com', 'PtRide4');
INSERT INTO "public"."riders" ("id", "bsalary") VALUES ((SELECT currval('users_id_seq')), '900');
INSERT INTO "public"."ptriders" ("id") VALUES ((SELECT currval('users_id_seq')));
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-02', '10', '12');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-02', '15', '17');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-03', '10', '12');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-03', '15', '17');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-04', '10', '12');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-04', '14', '16');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-04', '18', '20');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-05', '10', '12');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-05', '13', '15');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-05', '16', '18');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-05', '19', '21');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-06', '10', '12');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-06', '13', '15');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-06', '16', '18');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-06', '19', '21');

INSERT INTO "public"."users" ("email", "name") VALUES ('ptride5@gmail.com', 'PtRide5');
INSERT INTO "public"."riders" ("id", "bsalary") VALUES ((SELECT currval('users_id_seq')), '1000');
INSERT INTO "public"."ptriders" ("id") VALUES ((SELECT currval('users_id_seq')));
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-02', '12', '14');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-02', '18', '20');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-03', '10', '12');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-03', '15', '17');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-04', '10', '12');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-04', '14', '16');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-04', '18', '20');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-05', '10', '12');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-05', '13', '15');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-05', '16', '18');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-05', '19', '21');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-06', '10', '12');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-06', '13', '15');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-06', '16', '18');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-06', '19', '21');

INSERT INTO "public"."users" ("email", "name") VALUES ('ptride6@gmail.com', 'PtRide6');
INSERT INTO "public"."riders" ("id", "bsalary") VALUES ((SELECT currval('users_id_seq')), '1000');
INSERT INTO "public"."ptriders" ("id") VALUES ((SELECT currval('users_id_seq')));
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-02', '12', '14');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-02', '20', '22');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-03', '12', '14');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-03', '18', '20');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-04', '12', '14');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-04', '16', '18');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-04', '20', '22');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-05', '10', '12');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-05', '15', '17');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-05', '18', '20');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-05', '21', '22');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-06', '10', '12');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-06', '14', '16');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-06', '17', '19');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-06', '20', '22');

INSERT INTO "public"."users" ("email", "name") VALUES ('ptride7@gmail.com', 'PtRide7');
INSERT INTO "public"."riders" ("id", "bsalary") VALUES ((SELECT currval('users_id_seq')), '1000');
INSERT INTO "public"."ptriders" ("id") VALUES ((SELECT currval('users_id_seq')));
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-02', '20', '22');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-03', '11', '13');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-03', '20', '22');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-04', '11', '13');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-04', '17', '19');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-04', '20', '22');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-05', '12', '14');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-05', '17', '19');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-05', '20', '22');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-06', '12', '14');

INSERT INTO "public"."users" ("email", "name") VALUES ('ptride8@gmail.com', 'PtRide8');
INSERT INTO "public"."riders" ("id", "bsalary") VALUES ((SELECT currval('users_id_seq')), '1000');
INSERT INTO "public"."ptriders" ("id") VALUES ((SELECT currval('users_id_seq')));
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-03', '12', '14');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-04', '12', '14');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-04', '17', '19');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-04', '20', '22');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-05', '12', '14');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-05', '20', '22');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-06', '12', '14');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-05-06', '19', '21');


-- Populate ft riders, then populate mws
INSERT INTO Users (email, name) VALUES('riderfoo@gmail.com', 'Rider FooTime');
INSERT INTO Riders VALUES((SELECT currval('users_id_seq')), '1100');
INSERT INTO Ftriders VALUES((SELECT currval('users_id_seq')));
INSERT INTO "public"."mws" ("id", "dmy", "shift") VALUES ((SELECT currval('users_id_seq')), '2020-05-02', '1');
INSERT INTO "public"."mws" ("id", "dmy", "shift") VALUES ((SELECT currval('users_id_seq')), '2020-05-03', '3');
INSERT INTO "public"."mws" ("id", "dmy", "shift") VALUES ((SELECT currval('users_id_seq')), '2020-05-04', '1');
INSERT INTO "public"."mws" ("id", "dmy", "shift") VALUES ((SELECT currval('users_id_seq')), '2020-05-05', '2');
INSERT INTO "public"."mws" ("id", "dmy", "shift") VALUES ((SELECT currval('users_id_seq')), '2020-05-06', '1');

INSERT INTO "public"."users" ("email", "name") VALUES ('ftride1@gmail.com', 'FtRide1');
INSERT INTO "public"."riders" ("id", "bsalary") VALUES ((SELECT currval('users_id_seq')), '1200');
INSERT INTO "public"."ftriders" ("id") VALUES ((SELECT currval('users_id_seq')));
INSERT INTO "public"."mws" ("id", "dmy", "shift") VALUES ((SELECT currval('users_id_seq')), '2020-05-02', '3');
INSERT INTO "public"."mws" ("id", "dmy", "shift") VALUES ((SELECT currval('users_id_seq')), '2020-05-03', '4');
INSERT INTO "public"."mws" ("id", "dmy", "shift") VALUES ((SELECT currval('users_id_seq')), '2020-05-04', '1');
INSERT INTO "public"."mws" ("id", "dmy", "shift") VALUES ((SELECT currval('users_id_seq')), '2020-05-05', '1');
INSERT INTO "public"."mws" ("id", "dmy", "shift") VALUES ((SELECT currval('users_id_seq')), '2020-05-06', '1');

INSERT INTO "public"."users" ("email", "name") VALUES ('ftride2@gmail.com', 'FtRide2');
INSERT INTO "public"."riders" ("id", "bsalary") VALUES ((SELECT currval('users_id_seq')), '1300');
INSERT INTO "public"."ftriders" ("id") VALUES ((SELECT currval('users_id_seq')));
INSERT INTO "public"."mws" ("id", "dmy", "shift") VALUES ((SELECT currval('users_id_seq')), '2020-05-02', '4');
INSERT INTO "public"."mws" ("id", "dmy", "shift") VALUES ((SELECT currval('users_id_seq')), '2020-05-03', '4');
INSERT INTO "public"."mws" ("id", "dmy", "shift") VALUES ((SELECT currval('users_id_seq')), '2020-05-04', '4');
INSERT INTO "public"."mws" ("id", "dmy", "shift") VALUES ((SELECT currval('users_id_seq')), '2020-05-05', '4');
INSERT INTO "public"."mws" ("id", "dmy", "shift") VALUES ((SELECT currval('users_id_seq')), '2020-05-06', '3');

INSERT INTO "public"."users" ("email", "name") VALUES ('ftride3@gmail.com', 'FtRide3');
INSERT INTO "public"."riders" ("id", "bsalary") VALUES ((SELECT currval('users_id_seq')), '1400');
INSERT INTO "public"."ftriders" ("id") VALUES ((SELECT currval('users_id_seq')));
INSERT INTO "public"."mws" ("id", "dmy", "shift") VALUES ((SELECT currval('users_id_seq')), '2020-05-02', '4');
INSERT INTO "public"."mws" ("id", "dmy", "shift") VALUES ((SELECT currval('users_id_seq')), '2020-05-03', '4');
INSERT INTO "public"."mws" ("id", "dmy", "shift") VALUES ((SELECT currval('users_id_seq')), '2020-05-04', '4');
INSERT INTO "public"."mws" ("id", "dmy", "shift") VALUES ((SELECT currval('users_id_seq')), '2020-05-05', '4');
INSERT INTO "public"."mws" ("id", "dmy", "shift") VALUES ((SELECT currval('users_id_seq')), '2020-05-06', '4');

COMMIT;


-- Schedule added to show pending order

-- To demo min 5 rider per week, exception will be thrown
BEGIN;
DELETE FROM wws where dmy = '2020-05-02' and stime = '10' and etime = '12';
COMMIT;
BEGIN;
DELETE FROM mws where dmy = '2020-05-02' and shift = '1';
COMMIT;