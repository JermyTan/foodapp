BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Users (email, name)
VALUES('cynthia@gmail.com','Cynthia');

INSERT INTO Customers (id, rpoints)
VALUES(
(SELECT currval('users_id_seq')), 0);
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Users (email, name)
VALUES('vivian@gmail.com', 'Vivian');

INSERT INTO Customers (id, rpoints, cardnum)
VALUES((SELECT currval('users_id_seq')), 0, 123);
COMMIT;

INSERT INTO Restaurants(rname, minamt)
VALUES('Pizza Hut', 30);

INSERT INTO Restaurants(rname, minamt)
VALUES('McDonalds', 20);

INSERT INTO Restaurants(rname, minamt)
VALUES('Dominos', 20);

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Users (email, name)
VALUES('lee@gmail.com', 'Lee');

INSERT INTO Staffs
VALUES((SELECT currval('users_id_seq')), 'Pizza Hut');
COMMIT;


UPDATE Staffs
SET rname = 'McDonalds'
WHERE id = (SELECT currval('users_id_seq');

UPDATE Users
SET name = 'Jane'
WHERE id = (SELECT currval('users_id_seq');

UPDATE Users
SET email = 'lee99@gmail.com'
WHERE id = (SELECT currval('users_id_seq');

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Users (email, name)
VALUES('motoride@gmail.com', 'motorider');

INSERT INTO Riders
VALUES((SELECT currval('users_id_seq')), '1000');

INSERT INTO Ptriders
VALUES((SELECT currval('users_id_seq')));

INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '03-04-2020', '10', '12');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '03-04-2020', '13', '15');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '03-03-2020', '10', '12');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '03-03-2020', '13', '15');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '03-03-2020', '16', '18');

INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '03-11-2020', '10', '12');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '03-01-2020', '13', '15');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '03-10-2020', '10', '12');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '03-10-2020', '13', '15');
INSERT INTO "public"."wws" ("id", "dmy", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '03-10-2020', '16', '18');

COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Users (email, name)
VALUES('riderfoo@gmail.com', 'Rider FooTime');

INSERT INTO Riders
VALUES((SELECT currval('users_id_seq')), '1100');

INSERT INTO Ftriders
VALUES((SELECT currval('users_id_seq')));

INSERT INTO "public"."mws" ("id", "stdom", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-03-02', '10', '14');
INSERT INTO "public"."mws" ("id", "stdom", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-03-02', '15', '19');
INSERT INTO "public"."mws" ("id", "stdom", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-03-03', '11', '15');
INSERT INTO "public"."mws" ("id", "stdom", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-03-03', '16', '20');
INSERT INTO "public"."mws" ("id", "stdom", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-03-04', '10', '14');
INSERT INTO "public"."mws" ("id", "stdom", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-03-04', '15', '19');
INSERT INTO "public"."mws" ("id", "stdom", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-03-05', '12', '16');
INSERT INTO "public"."mws" ("id", "stdom", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-03-05', '17', '21');
INSERT INTO "public"."mws" ("id", "stdom", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-03-06', '13', '17');
INSERT INTO "public"."mws" ("id", "stdom", "stime", "etime") VALUES ((SELECT currval('users_id_seq')), '2020-03-06', '18', '22');
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Food
SELECT * FROM (SELECT 'Pepperoni Pizza', 'Pizza') AS tmp 
WHERE NOT EXISTS (SELECT fname FROM Food WHERE fname = 'Pepperoni Pizza') LIMIT 1;

INSERT INTO Sells
VALUES('Pepperoni Pizza', 'Pizza Hut', true, 10, 20.90);
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Food
SELECT * FROM (SELECT 'Pepperoni Pizza', 'Pizza') AS tmp 
WHERE NOT EXISTS (SELECT fname FROM Food WHERE fname = 'Pepperoni Pizza') LIMIT 1;

INSERT INTO Sells
VALUES('Pepperoni Pizza', 'Dominos', true, 20, 18.90);
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO "public"."users" ("email", "name") 
VALUES ('manager@fds.com','ManagerTan');

INSERT INTO "public"."managers"
VALUES((SELECT currval('users_id_seq'))); 
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Promotions (sdatetime, edatetime, discount) 
VALUES(1588420800000, 1591099200000, 0.3);

INSERT INTO FDSPromotions
VALUES((SELECT currval('promotions_pid_seq')));
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Promotions (sdatetime, edatetime, discount) 
VALUES(1585834200000, 1588426200000, 1);

INSERT INTO FDSPromotions
VALUES((SELECT currval('promotions_pid_seq')));
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Promotions (sdatetime, edatetime, discount) 
VALUES(1593167400000, 1595766600000, 0.2);

INSERT INTO FDSPromotions
VALUES((SELECT currval('promotions_pid_seq')));
COMMIT;