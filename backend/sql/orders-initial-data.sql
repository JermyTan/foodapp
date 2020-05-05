-- NOTE: cid is hard-coded value. Look up customer table to hard code new value for cid

INSERT INTO orders(location, dfee, status, fprice, odatetime, paymethod, cid, rname) 
VALUES('Woodlands', 3.99, 2, 104.50, 1588486582, 1, 3, 'Pizza Hut');
INSERT INTO Consists (oid, fname, quantity, itemprice) VALUES (1, 'Pepperoni Pizza', 5, 20.9);

INSERT INTO orders(location, dfee, status, fprice, odatetime, paymethod, cid, rname) 
VALUES('Bukit Batok', 3.99, 2, 79.60, 1588486900, 1, 4, 'Pizza Hut');
INSERT INTO Consists (oid, fname, quantity, itemprice) VALUES (2, 'Pepperoni Pizza', 2, 20.9);
INSERT INTO Consists (oid, fname, quantity, itemprice) VALUES (2, 'Hawaiian Pizza', 2, 18.9);

INSERT INTO orders(location, dfee, status, fprice, odatetime, paymethod, cid, rname) 
VALUES('Bukit Batok', 3.99, 2, 205.00, 1588490182, 1, 5, 'Pizza Hut');
INSERT INTO Consists (oid, fname, quantity, itemprice) VALUES (3, 'Pepperoni Pizza', 2, 20.9);
INSERT INTO Consists (oid, fname, quantity, itemprice) VALUES (3, 'Hawaiian Pizza', 2, 18.9);
INSERT INTO Consists (oid, fname, quantity, itemprice) VALUES (3, 'Mushroom Pizza', 2, 15.9);
INSERT INTO Consists (oid, fname, quantity, itemprice) VALUES (3, 'Mala Pizza', 2, 25.9);
INSERT INTO Consists (oid, fname, quantity, itemprice) VALUES (3, 'Cheese Pizza', 2, 20.9);

INSERT INTO orders(location, dfee, status, fprice, odatetime, paymethod, cid, rname) 
VALUES('Woodlands', 3.99, 2, 31.80, 1588486582, 1, 3, 'Pizza Hut');
INSERT INTO Consists (oid, fname, quantity, itemprice) VALUES (4, 'Mushroom Pizza', 2, 15.9);