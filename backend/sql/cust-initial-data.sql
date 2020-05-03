BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Users (email, name)
VALUES('foodlover@gmail.com', 'Aaron');

INSERT INTO Customers (id, rpoints, cardnum, joindate)
VALUES((
	SELECT currval('users_id_seq')), 80, 111,  (select extract(epoch from now()))*1000);

INSERT INTO Users (email, name)
		VALUES('moarfood@gmail.com', 'Betty');
INSERT INTO Customers (id, rpoints, cardnum)
		VALUES((
			SELECT
				currval('users_id_seq')), 110, 987);
INSERT INTO Users (email, name)
		VALUES('casey@gmail.com', 'Casey');
INSERT INTO Customers (id, cardnum)
		VALUES((
			SELECT
				currval('users_id_seq')), 323);
INSERT INTO Users (email, name)
		VALUES('don@gmail.com', 'Don');
INSERT INTO Customers (id, rpoints)
		VALUES((
			SELECT
				currval('users_id_seq')), 70);
INSERT INTO Users (email, name)
		VALUES('ethan@gmail.com', 'Ethan');
INSERT INTO Customers (id)
		VALUES((
			SELECT
				currval('users_id_seq')));
INSERT INTO Users (email, name)
		VALUES('fred@gmail.com', 'Fred');
INSERT INTO Customers (id)
		VALUES((
			SELECT
				currval('users_id_seq')));
INSERT INTO Users (email, name)
		VALUES('gillian@gmail.com', 'Gillian');
INSERT INTO Customers (id)
		VALUES((
			SELECT
				currval('users_id_seq')));
INSERT INTO Users (email, name)
		VALUES('henry@gmail.com', 'Henry');
INSERT INTO Customers (id)
		VALUES((
			SELECT
				currval('users_id_seq')));
INSERT INTO Users (email, name)
		VALUES('indra@gmail.com', 'Indra');
INSERT INTO Customers (id)
		VALUES((
			SELECT
				currval('users_id_seq')));
INSERT INTO Users (email, name)
		VALUES('june@gmail.com', 'June');
INSERT INTO Customers (id)
		VALUES((
			SELECT
				currval('users_id_seq')));
INSERT INTO Users (email, name)
		VALUES('kevin@gmail.com', 'Kevin');
INSERT INTO Customers (id)
		VALUES((
			SELECT
				currval('users_id_seq')));
COMMIT;