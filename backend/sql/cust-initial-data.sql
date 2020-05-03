BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Users (email, name)
VALUES('foodlover@gmail.com', 'Aaron');
INSERT INTO Customers (id, rpoints, cardnum, joindate)
VALUES((
	SELECT currval('users_id_seq')), 80, 111, 1585134300);

INSERT INTO Users (email, name)
		VALUES('moarfood@gmail.com', 'Betty');
INSERT INTO Customers (id, rpoints, cardnum, joindate)
		VALUES((
			SELECT
				currval('users_id_seq')), 110, 987, 1584270300);

INSERT INTO Users (email, name)
		VALUES('casey@gmail.com', 'Casey');
INSERT INTO Customers (id, cardnum, joindate)
		VALUES((
			SELECT
				currval('users_id_seq')), 323, 1579795500);

INSERT INTO Users (email, name)
		VALUES('don@gmail.com', 'Don');
INSERT INTO Customers (id, rpoints, joindate)
		VALUES((
			SELECT
				currval('users_id_seq')), 70, (select extract(epoch from now())));

INSERT INTO Users (email, name)
		VALUES('ethan@gmail.com', 'Ethan');
INSERT INTO Customers (id, joindate)
		VALUES((
			SELECT
				currval('users_id_seq')), 1588331100);

INSERT INTO Users (email, name)
		VALUES('fred@gmail.com', 'Fred');
INSERT INTO Customers (id, joindate)
		VALUES((
			SELECT
				currval('users_id_seq')), 1576868700);

INSERT INTO Users (email, name)
		VALUES('gillian@gmail.com', 'Gillian');
INSERT INTO Customers (id, joindate)
		VALUES((
			SELECT
				currval('users_id_seq')), 1587095340);

INSERT INTO Users (email, name)
		VALUES('henry@gmail.com', 'Henry');
INSERT INTO Customers (id, joindate)
		VALUES((
			SELECT
				currval('users_id_seq')), (select extract(epoch from now())));

INSERT INTO Users (email, name)
		VALUES('indra@gmail.com', 'Indra');
INSERT INTO Customers (id, joindate)
		VALUES((
			SELECT
				currval('users_id_seq')), 1580646240);

INSERT INTO Users (email, name)
		VALUES('june@gmail.com', 'June');
INSERT INTO Customers (id, joindate)
		VALUES((
			SELECT
				currval('users_id_seq')), 1582464240);

INSERT INTO Users (email, name)
		VALUES('kevin@gmail.com', 'Kevin');
INSERT INTO Customers (id, joindate)
		VALUES((
			SELECT
				currval('users_id_seq')), 1578618000);
COMMIT;