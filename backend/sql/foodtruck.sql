CREATE EXTENSION btree_gist;

DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Riders CASCADE;
DROP TABLE IF EXISTS PTRiders CASCADE;
DROP TABLE IF EXISTS FTRiders CASCADE;
DROP TABLE IF EXISTS Customers CASCADE;
DROP TABLE IF EXISTS Staffs CASCADE;
DROP TABLE IF EXISTS Managers CASCADE;
DROP TABLE IF EXISTS Restaurants CASCADE;
DROP TABLE IF EXISTS Promotions CASCADE;
DROP TABLE IF EXISTS FDSPromotions CASCADE;
DROP TABLE IF EXISTS RPromotions CASCADE;
DROP TABLE IF EXISTS Food CASCADE;
DROP TABLE IF EXISTS MWS CASCADE;
DROP TABLE IF EXISTS WWS CASCADE;
DROP TABLE IF EXISTS Orders CASCADE;
DROP TABLE IF EXISTS Sells CASCADE;
DROP TABLE IF EXISTS Consists CASCADE;
DROP TABLE IF EXISTS Offers CASCADE;
DROP TABLE IF EXISTS FDSOffers CASCADE;
DROP TABLE IF EXISTS Reviews CASCADE;
DROP TABLE IF EXISTS Ratings CASCADE;

--BCNF--
CREATE TABLE Users (
    id          SERIAL PRIMARY KEY,
    email       VARCHAR UNIQUE NOT NULL,
    name        VARCHAR NOT NULL,
    CHECK (email LIKE '%@%'),
    CHECK (name <> '')
);

--BCNF--
CREATE TABLE Riders (
    id          INTEGER PRIMARY KEY REFERENCES Users ON DELETE CASCADE,
    bsalary     INTEGER NOT NULL,
    CHECK (bsalary >= 0)
);

--BCNF--
CREATE TABLE PTRiders (
    id          INTEGER PRIMARY KEY REFERENCES Riders ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE
);

--BCNF--
CREATE TABLE FTRiders (
    id          INTEGER PRIMARY KEY REFERENCES Riders ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE
);

--BCNF--
CREATE TABLE Customers (
    id          INTEGER PRIMARY KEY REFERENCES Users ON DELETE CASCADE
    DEFERRABLE INITIALLY IMMEDIATE,
    rpoints     INTEGER NOT NULL DEFAULT 0,
    cardnum     INTEGER,
    joindate    INTEGER NOT NULL,
    CHECK (rpoints >= 0),
    CHECK (cardnum >= 0)
);

-- INSERT INTO Customers VALUES (1, 0);

--BCNF--
CREATE TABLE Restaurants (
    rname       VARCHAR PRIMARY KEY,
    minamt      FLOAT NOT NULL,
    imgurl      VARCHAR DEFAULT 'https://zabas.com/wp-content/uploads/2017/01/food-placeholder.png',
    CHECK (rname <> ''),
    CHECK (minamt >= 0)
);

--BCNF--
CREATE TABLE Staffs (
    id          INTEGER PRIMARY KEY REFERENCES Users ON DELETE CASCADE
    DEFERRABLE INITIALLY IMMEDIATE,
    rname       VARCHAR UNIQUE NOT NULL REFERENCES Restaurants
);

--BCNF--
CREATE TABLE Managers (
    id          INTEGER PRIMARY KEY REFERENCES Users ON DELETE CASCADE
);

--BCNF--
CREATE TABLE Promotions (
    pid         SERIAL PRIMARY KEY,
    sdatetime   INTEGER NOT NULL,
    edatetime   INTEGER NOT NULL,
    discount    DECIMAL(5, 2) NOT NULL,
    CHECK (pid > 0),
    CHECK (0 <= sdatetime AND sdatetime < edatetime),
    CHECK(discount > 0 AND discount <= 1)
);

--BCNF--
CREATE TABLE FDSPromotions (
    pid         INTEGER PRIMARY KEY REFERENCES Promotions ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE
);

--BCNF--
CREATE TABLE RPromotions (
    pid         INTEGER PRIMARY KEY REFERENCES Promotions ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE
);

--BCNF--
CREATE TABLE Food (
    fname       VARCHAR PRIMARY KEY,
    cat         VARCHAR NOT NULL,
    CHECK (fname <> ''),
    CHECK (cat <> '')
);

--BCNF--
CREATE TABLE MWS (
    id          INTEGER REFERENCES FTRiders ON DELETE CASCADE,
    dmy         DATE,
    stime       INTEGER,
    etime       INTEGER,
    PRIMARY KEY (id, dmy, stime, etime),
    CHECK (10 <= stime AND stime < etime AND etime <= 22),
    CHECK ((stime = 10 AND etime = 14) OR (stime = 11 AND etime = 15) OR (stime = 12 AND etime = 16) OR (stime = 13 AND etime = 17)
    OR (stime = 15 AND etime = 19) OR (stime = 16 AND etime = 20) OR (stime = 17 AND etime = 21) OR (stime = 18 AND etime = 22)),
    EXCLUDE USING gist (id WITH =, dmy WITH =, int4range(stime, etime, '[]') WITH &&)
);

--BCNF--
CREATE TABLE WWS (
    id          INTEGER REFERENCES PTRiders ON DELETE CASCADE,
    dmy         DATE,
    stime       INTEGER,
    etime       INTEGER,
    PRIMARY KEY (id, dmy, stime, etime),
    CHECK (10 <= stime AND stime < etime AND etime <= 22 AND etime - stime <= 4),
    EXCLUDE USING gist (id WITH =, dmy WITH =, int4range(stime, etime, '[]') WITH &&)
);

--BCNF--
CREATE TABLE Orders (
    oid         SERIAL PRIMARY KEY,

    location    VARCHAR NOT NULL
                CHECK (location <> ''),

    dfee        NUMERIC(12, 2) NOT NULL
                CHECK (dfee >= 0),

    -- status: 0 -> processing, 1 -> delivering, 2 -> delivered, 3 -> cancelled
    status      SMALLINT NOT NULL
                CHECK (status in (0, 1, 2, 3)),

    fprice      NUMERIC(12, 2) NOT NULL
                CHECK (fprice >= 0),

    odatetime    INTEGER NOT NULL
                CHECK (odatetime >= 0),

    -- paymethod: 0 -> cash, 1 -> card
    paymethod   SMALLINT NOT NULL
                CHECK (paymethod in (0, 1)),

    cid         INTEGER NOT NULL REFERENCES Customers,
    rname       VARCHAR NOT NULL REFERENCES Restaurants,

    rid         INTEGER REFERENCES Riders,
    
    departdatetime1 INTEGER CHECK (odatetime <= departdatetime1),
    arrivedatetime  INTEGER CHECK (departdatetime1 <= arrivedatetime),
    departdatetime2 INTEGER CHECK (arrivedatetime <= departdatetime2),
    deliverdatetime INTEGER CHECK (departdatetime2 <= deliverdatetime)

);

--BCNF--
CREATE TABLE Ratings (
    oid         INTEGER PRIMARY KEY REFERENCES Orders ON DELETE CASCADE,
    rating      SMALLINT
                CHECK (0 <= rating AND rating <= 5)
);

--BCNF--
CREATE TABLE Reviews (
    oid         INTEGER PRIMARY KEY REFERENCES Orders ON DELETE CASCADE,
    review      VARCHAR NOT NULL
                CHECK (review <> ''),
    reviewdatetime INTEGER NOT NULL
);

--BCNF--
CREATE TABLE Sells (
    fname       VARCHAR REFERENCES Food,
    rname       VARCHAR REFERENCES Restaurants,
    flimit      INTEGER NOT NULL,
    price       NUMERIC(12, 2) NOT NULL,
    imgurl      VARCHAR DEFAULT 'https://platerate.com/images/tempfoodnotext.png',
    PRIMARY KEY (fname, rname),
    CHECK (flimit >= 0),
    CHECK (price >= 0)
);


CREATE TABLE Consists (
    oid         INTEGER REFERENCES Orders ON DELETE CASCADE,
    fname       VARCHAR REFERENCES Food,
    quantity    INTEGER NOT NULL,
    itemprice   FLOAT NOT NULL,
    CHECK (quantity > 0)
);

CREATE TABLE Offers (
    pid         INTEGER REFERENCES Promotions ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE,
    rname       VARCHAR REFERENCES Restaurants,
    fname       VARCHAR REFERENCES Food,
    PRIMARY KEY (pid, rname, fname)
);

CREATE TABLE FDSOffers (
    pid         INTEGER REFERENCES Promotions,
    oid         INTEGER REFERENCES Orders,
    PRIMARY KEY (pid, oid)
);