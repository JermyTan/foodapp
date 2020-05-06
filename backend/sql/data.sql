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

-- Populate default valid shifts for full time riders
BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO "public"."mwsshift" ("shift", "stime1", "etime1", "stime2", "etime2") VALUES ('1', '10', '14', '15', '19');
INSERT INTO "public"."mwsshift" ("shift", "stime1", "etime1", "stime2", "etime2") VALUES ('2', '11', '15', '16', '20');
INSERT INTO "public"."mwsshift" ("shift", "stime1", "etime1", "stime2", "etime2") VALUES ('3', '12', '16', '17', '21');
INSERT INTO "public"."mwsshift" ("shift", "stime1", "etime1", "stime2", "etime2") VALUES ('4', '13', '17', '18', '22');
COMMIT;
