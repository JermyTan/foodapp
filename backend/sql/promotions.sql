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
VALUES(1588420800, 1591099200, 0.3);

INSERT INTO FDSPromotions
VALUES((SELECT currval('promotions_pid_seq')));
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Promotions (sdatetime, edatetime, discount) 
VALUES(1585834200, 1588426200, 1);

INSERT INTO FDSPromotions
VALUES((SELECT currval('promotions_pid_seq')));
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Promotions (sdatetime, edatetime, discount) 
VALUES(1593167400, 1595766600, 0.2);

INSERT INTO FDSPromotions
VALUES((SELECT currval('promotions_pid_seq')));
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Promotions (sdatetime, edatetime, discount) 
VALUES(1587384000, 1589976000, 0.4);

INSERT INTO FDSPromotions
VALUES((SELECT currval('promotions_pid_seq')));
COMMIT;

--Restaurants Promotions--
--Pizza Hut--
BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Promotions (sdatetime, edatetime, discount) VALUES(1587384000, 1592654400, 0.2);

INSERT INTO RPromotions
VALUES((SELECT currval('promotions_pid_seq')));

INSERT INTO Offers
VALUES((SELECT currval('promotions_pid_seq')), 'Pizza Hut', 'Pepperoni Pizza');
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Promotions (sdatetime, edatetime, discount) VALUES(1587284032, 1589654400, 0.1);

INSERT INTO RPromotions
VALUES((SELECT currval('promotions_pid_seq')));

INSERT INTO Offers
VALUES((SELECT currval('promotions_pid_seq')), 'Pizza Hut', 'Hawaiian Pizza');
COMMIT;

--McDonalds--
BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Promotions (sdatetime, edatetime, discount) VALUES(1591012800, 1592654400, 0.5);

INSERT INTO RPromotions
VALUES((SELECT currval('promotions_pid_seq')));

INSERT INTO Offers
VALUES((SELECT currval('promotions_pid_seq')), 'McDonalds', 'Fillet O Fish');
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Promotions (sdatetime, edatetime, discount) VALUES(1581296400, 1586480400, 0.1);

INSERT INTO RPromotions
VALUES((SELECT currval('promotions_pid_seq')));

INSERT INTO Offers
VALUES((SELECT currval('promotions_pid_seq')), 'McDonalds', 'McSpicy');
COMMIT;

