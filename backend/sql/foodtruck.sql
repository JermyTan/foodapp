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

CREATE TABLE Users (
    id          SERIAL PRIMARY KEY,
    email       VARCHAR UNIQUE NOT NULL,
    name        VARCHAR NOT NULL,
    CHECK (email LIKE '%@%'),
    CHECK (name <> '')
);

-- INSERT INTO Users VALUES (1, 'tan_kai_qun97@yahoo.com.sg', 'Jermy Tan');

CREATE TABLE Riders (
    id          INTEGER PRIMARY KEY REFERENCES Users ON DELETE CASCADE,
    bsalary     INTEGER NOT NULL,
    CHECK (bsalary >= 0)
);

CREATE TABLE PTRiders (
    id          INTEGER PRIMARY KEY REFERENCES Riders ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE
);

CREATE TABLE FTRiders (
    id          INTEGER PRIMARY KEY REFERENCES Riders ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE
);

CREATE TABLE Customers (
    id          INTEGER PRIMARY KEY REFERENCES Users ON DELETE CASCADE
    DEFERRABLE INITIALLY IMMEDIATE,
    rpoints     INTEGER NOT NULL,
    cardnum     INTEGER,
    CHECK (rpoints >= 0),
    CHECK (cardnum >= 0)
);

-- INSERT INTO Customers VALUES (1, 0);

CREATE TABLE Restaurants (
    rname       VARCHAR PRIMARY KEY,
    minamt      FLOAT NOT NULL,
    CHECK (rname <> ''),
    CHECK (minamt >= 0)
);

CREATE TABLE Staffs (
    id          INTEGER PRIMARY KEY REFERENCES Users ON DELETE CASCADE
    DEFERRABLE INITIALLY IMMEDIATE,
    rname       VARCHAR UNIQUE NOT NULL REFERENCES Restaurants
);

CREATE TABLE Managers (
    id          INTEGER PRIMARY KEY REFERENCES Users ON DELETE CASCADE
);

CREATE TABLE Promotions (
    pid         SERIAL PRIMARY KEY,
    sdatetime   INTEGER NOT NULL,
    edatetime   INTEGER NOT NULL,
    discount    DECIMAL(5, 2) NOT NULL,
    CHECK (pid > 0),
    CHECK (0 <= sdatetime AND sdatetime < edatetime),
    CHECK(discount > 0 AND discount <= 1)
);

CREATE TABLE FDSPromotions (
    pid         INTEGER PRIMARY KEY REFERENCES Promotions ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE
);

CREATE TABLE RPromotions (
    pid         INTEGER PRIMARY KEY REFERENCES Promotions ON DELETE CASCADE DEFERRABLE INITIALLY IMMEDIATE
);

CREATE TABLE Food (
    fname       VARCHAR PRIMARY KEY,
    cat         VARCHAR NOT NULL,
    CHECK (fname <> ''),
    CHECK (cat <> '')
);

CREATE TABLE MWS (
    id          INTEGER REFERENCES FTRiders ON DELETE CASCADE,
    month       SMALLINT,
    dayofweek   SMALLINT,
    stime       INTEGER,
    etime       INTEGER,
    PRIMARY KEY (id, month, dayofweek, stime, etime),
    CHECK (1 <= month AND month <= 12),
    CHECK (1 <= dayofweek AND dayofweek <= 7),
    CHECK (10 <= stime AND stime < etime AND etime <= 22)
);

CREATE TABLE WWS (
    id          INTEGER REFERENCES PTRiders ON DELETE CASCADE,
    week        SMALLINT,
    dayofweek   SMALLINT,
    stime       INTEGER,
    etime       INTEGER,
    PRIMARY KEY (id, week, dayofweek, stime, etime),
    CHECK (1 <= week AND week <= 52),
    CHECK (1 <= dayofweek AND dayofweek <= 7),
    CHECK (10 <= stime AND stime < etime AND etime <= 22 AND etime - stime <= 4)
);

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
    -- rating      SMALLINT
    --             CHECK (0 <= rating AND rating <= 5),
    
    departdatetime1 INTEGER CHECK (odatetime <= departdatetime1),
    arrivedatetime  INTEGER CHECK (departdatetime1 <= arrivedatetime),
    departdatetime2 INTEGER CHECK (arrivedatetime <= departdatetime2),
    deliverdatetime INTEGER CHECK (departdatetime2 <= deliverdatetime)

    -- reviewdatetime  INTEGER CHECK (deliverdatetime <= reviewdatetime),
    -- review          VARCHAR CHECK (review <> ''),
    -- CHECK (
    --     (reviewdatetime IS NULL AND review IS NULL) 
    --     OR (reviewdatetime IS NOT NULL AND review IS NOT NULL)
    -- )
);

CREATE TABLE Ratings (
    oid         INTEGER PRIMARY KEY REFERENCES Orders,
    rating      SMALLINT
                CHECK (0 <= rating AND rating <= 5)
);

CREATE TABLE Reviews (
    oid         INTEGER PRIMARY KEY REFERENCES Orders,
    review      VARCHAR NOT NULL
                CHECK (review <> ''),
    reviewdatetime INTEGER NOT NULL
);


CREATE TABLE Sells (
    fname       VARCHAR REFERENCES Food,
    rname       VARCHAR REFERENCES Restaurants,
    avail       BOOLEAN NOT NULL,
    flimit      INTEGER NOT NULL,
    price       NUMERIC(12, 2) NOT NULL,
    PRIMARY KEY (fname, rname),
    CHECK (flimit >= 0),
    CHECK (price >= 0)
);

CREATE TABLE Consists (
    oid         INTEGER REFERENCES Orders ON DELETE CASCADE,
    fname       VARCHAR REFERENCES Food,
    quantity    INTEGER NOT NULL,
    CHECK (quantity > 0)
);

CREATE TABLE Offers (
    pid         INTEGER REFERENCES Promotions,
    rname       VARCHAR REFERENCES Restaurants,
    fname       VARCHAR REFERENCES Food,
    PRIMARY KEY (pid, rname, fname)
);

CREATE TABLE FDSOffers (
    pid         INTEGER REFERENCES Promotions,
    oid         INTEGER REFERENCES Orders,
    PRIMARY KEY (pid, oid)
);