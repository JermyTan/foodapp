
--PIZZA HUT--
INSERT INTO Restaurants(rname, minamt, 'https://media.glassdoor.com/l/b2/e6/60/55/pizza-hut-takeaway.jpg')
VALUES('Pizza Hut', 30);

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Food
SELECT * FROM (SELECT 'Pepperoni Pizza', 'Pizza') AS tmp 
WHERE NOT EXISTS (SELECT fname FROM Food WHERE fname = 'Pepperoni Pizza') LIMIT 1;

INSERT INTO Sells
VALUES('Pepperoni Pizza', 'Pizza Hut', 10, 20.90, 'https://s3.amazonaws.com/secretsaucefiles/photos/images/000/183/731/large/c700x420.jpg?1508553054');
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Food
SELECT * FROM (SELECT 'Hawaiian Pizza', 'Pizza') AS tmp 
WHERE NOT EXISTS (SELECT fname FROM Food WHERE fname = 'Hawaiian Pizza') LIMIT 1;

INSERT INTO Sells
VALUES('Hawaiian Pizza', 'Pizza Hut', 10, 18.90, 'https://i.ytimg.com/vi/ncdJny9PsrM/hqdefault.jpg');
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Food
SELECT * FROM (SELECT 'Pepperoni Pizza', 'Pizza') AS tmp 
WHERE NOT EXISTS (SELECT fname FROM Food WHERE fname = 'Hawaiian Pizza') LIMIT 1;

INSERT INTO Sells
VALUES('Hawaiian Pizza', 'Pizza Hut', 10, 18.90);
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Food
SELECT * FROM (SELECT 'Mala Pizza', 'Pizza') AS tmp 
WHERE NOT EXISTS (SELECT fname FROM Food WHERE fname = 'Mala Pizza') LIMIT 1;

INSERT INTO Sells
VALUES('Mala Pizza', 'Pizza Hut', 5, 25.90);
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Food
SELECT * FROM (SELECT 'Mushroom Pizza', 'Pizza') AS tmp 
WHERE NOT EXISTS (SELECT fname FROM Food WHERE fname = 'Mushroom Pizza') LIMIT 1;

INSERT INTO Sells
VALUES('Mushroom Pizza', 'Pizza Hut', 5, 15.90);
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Food
SELECT * FROM (SELECT 'Cheese Pizza', 'Pizza') AS tmp 
WHERE NOT EXISTS (SELECT fname FROM Food WHERE fname = 'Cheese Pizza') LIMIT 1;

INSERT INTO Sells
VALUES('Cheese Pizza', 'Pizza Hut', 5, 20.90);
COMMIT;

--DOMINOS--

INSERT INTO Restaurants(rname, minamt)
VALUES('Dominos', 25);

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Food
SELECT * FROM (SELECT 'Mushroom Pizza', 'Pizza') AS tmp 
WHERE NOT EXISTS (SELECT fname FROM Food WHERE fname = 'Mushroom Pizza') LIMIT 1;

INSERT INTO Sells
VALUES('Mushroom Pizza', 'Dominos', 15, 16.50);
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Food
SELECT * FROM (SELECT 'Pepperoni Pizza', 'Pizza') AS tmp 
WHERE NOT EXISTS (SELECT fname FROM Food WHERE fname = 'Pepperoni Pizza') LIMIT 1;

INSERT INTO Sells
VALUES('Pepperoni Pizza', 'Dominos', 8, 19.90);
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Food
SELECT * FROM (SELECT 'Hawaiian Pizza', 'Pizza') AS tmp 
WHERE NOT EXISTS (SELECT fname FROM Food WHERE fname = 'Hawaiian Pizza') LIMIT 1;

INSERT INTO Sells
VALUES('Hawaiian Pizza', 'Dominos', 8, 19.90);
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Food
SELECT * FROM (SELECT 'Cheese Pizza', 'Pizza') AS tmp 
WHERE NOT EXISTS (SELECT fname FROM Food WHERE fname = 'Cheese Pizza') LIMIT 1;

INSERT INTO Sells
VALUES('Cheese Pizza', 'Dominos', 5, 21.00);
COMMIT;

--MCDONALDS--

INSERT INTO Restaurants(rname, minamt)
VALUES('McDonalds', 20);

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Food
SELECT * FROM (SELECT 'McSpicy', 'Burger') AS tmp 
WHERE NOT EXISTS (SELECT fname FROM Food WHERE fname = 'McSpicy') LIMIT 1;

INSERT INTO Sells
VALUES('McSpicy', 'McDonalds', 20, 7.50);
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Food
SELECT * FROM (SELECT 'Fries', 'Snack') AS tmp 
WHERE NOT EXISTS (SELECT fname FROM Food WHERE fname = 'Fries') LIMIT 1;

INSERT INTO Sells
VALUES('Fries', 'McDonalds', 20, 4.50);
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Food
SELECT * FROM (SELECT 'Chicken Nuggets', 'Snack') AS tmp 
WHERE NOT EXISTS (SELECT fname FROM Food WHERE fname = 'Chicken Nuggets') LIMIT 1;

INSERT INTO Sells
VALUES('Chicken Nuggets', 'McDonalds', 10, 6.50);
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Food
SELECT * FROM (SELECT 'Fillet O Fish', 'Burger') AS tmp 
WHERE NOT EXISTS (SELECT fname FROM Food WHERE fname = 'Fillet O Fish') LIMIT 1;

INSERT INTO Sells
VALUES('Fillet O Fish', 'McDonalds', 10, 5.50);
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Food
SELECT * FROM (SELECT 'Cheese Burger', 'Burger') AS tmp 
WHERE NOT EXISTS (SELECT fname FROM Food WHERE fname = 'Cheese Burger') LIMIT 1;

INSERT INTO Sells
VALUES('Cheese Burger', 'McDonalds', 10, 5.50);
COMMIT;

--Burger King--
INSERT INTO Restaurants(rname, minamt)
VALUES('Burger King', 20);

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Food
SELECT * FROM (SELECT 'Cheese Burger', 'Burger') AS tmp 
WHERE NOT EXISTS (SELECT fname FROM Food WHERE fname = 'Cheese Burger') LIMIT 1;

INSERT INTO Sells
VALUES('Cheese Burger', 'Burger King', 15, 6.50);
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Food
SELECT * FROM (SELECT 'Fries', 'Snack') AS tmp 
WHERE NOT EXISTS (SELECT fname FROM Food WHERE fname = 'Fries') LIMIT 1;

INSERT INTO Sells
VALUES('Fries', 'Burger King', 10, 4.00);
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Food
SELECT * FROM (SELECT 'Fish Burger', 'Burger') AS tmp 
WHERE NOT EXISTS (SELECT fname FROM Food WHERE fname = 'Fish Burger') LIMIT 1;

INSERT INTO Sells
VALUES('Fish Burger', 'Burger King', 15, 7.50);
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Food
SELECT * FROM (SELECT 'Truffle Beef Burger', 'Burger') AS tmp 
WHERE NOT EXISTS (SELECT fname FROM Food WHERE fname = 'Truffle Beef Burger') LIMIT 1;

INSERT INTO Sells
VALUES('Truffle Beef Burger', 'Burger King', 5, 8.50);
COMMIT;


--KFC--
INSERT INTO Restaurants(rname, minamt)
VALUES('KFC', 20);

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Food
SELECT * FROM (SELECT 'Fries', 'Snack') AS tmp 
WHERE NOT EXISTS (SELECT fname FROM Food WHERE fname = 'Fries') LIMIT 1;

INSERT INTO Sells
VALUES('Fries', 'KFC', 10, 5.50);
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Food
SELECT * FROM (SELECT 'Chicken Nuggets', 'Snack') AS tmp 
WHERE NOT EXISTS (SELECT fname FROM Food WHERE fname = 'Chicken Nuggets') LIMIT 1;

INSERT INTO Sells
VALUES('Chicken Nuggets', 'KFC', 10, 8.00);
COMMIT;

BEGIN;
SET CONSTRAINTS ALL DEFERRED;
INSERT INTO Food
SELECT * FROM (SELECT 'Drumstick Set', 'Snack') AS tmp 
WHERE NOT EXISTS (SELECT fname FROM Food WHERE fname = 'Drumstick Set') LIMIT 1;

INSERT INTO Sells
VALUES('Drumstick Set', 'KFC', 10, 8.00);
COMMIT;