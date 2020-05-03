--Create Manager--
BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Users (email, name)
VALUES('manager@fds.com','ManagerTan');

INSERT INTO Managers
VALUES((SELECT currval('users_id_seq'))); 
COMMIT;

--FDS Promotions--
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

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Promotions (sdatetime, edatetime, discount) 
VALUES(1587384000000, 1589976000000, 0.4);

INSERT INTO FDSPromotions
VALUES((SELECT currval('promotions_pid_seq')));
COMMIT;

--Restaurants Promotions--
--Pizza Hut--
BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Promotions (sdatetime, edatetime, discount) VALUES(1587384000000, 1592654400000, 0.2);

INSERT INTO RPromotions
VALUES((SELECT currval('promotions_pid_seq')));

INSERT INTO Offers
VALUES((SELECT currval('promotions_pid_seq')), 'Pizza Hut', 'Pepperoni Pizza');
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Promotions (sdatetime, edatetime, discount) VALUES(1587284032400, 1589654400000, 0.1);

INSERT INTO RPromotions
VALUES((SELECT currval('promotions_pid_seq')));

INSERT INTO Offers
VALUES((SELECT currval('promotions_pid_seq')), 'Pizza Hut', 'Hawaiian Pizza');
COMMIT;

--McDonalds--
BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Promotions (sdatetime, edatetime, discount) VALUES(1591012800000, 1592654400000, 0.5);

INSERT INTO RPromotions
VALUES((SELECT currval('promotions_pid_seq')));

INSERT INTO Offers
VALUES((SELECT currval('promotions_pid_seq')), 'McDonalds', 'Fillet O Fish');
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Promotions (sdatetime, edatetime, discount) VALUES(1581296400000, 1586480400000, 0.1);

INSERT INTO RPromotions
VALUES((SELECT currval('promotions_pid_seq')));

INSERT INTO Offers
VALUES((SELECT currval('promotions_pid_seq')), 'McDonalds', 'McSpicy');
COMMIT;

