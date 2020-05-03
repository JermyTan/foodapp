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