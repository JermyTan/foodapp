const db = require('../db');

// @desc    Create new manager
// @route   POST /managers
// @acess   Private
exports.createManager = async (req, response) => {
  const { email, name } = req.body;
  const checkManagerEmailQuery = `SELECT * FROM Users WHERE email = '${email}'`
  const createManagerQuery =
    `BEGIN;

    SET CONSTRAINTS ALL DEFERRED;
    INSERT INTO Users (email, name, role)
    VALUES('${email}', '${name}', 3) RETURNING id;

    INSERT INTO Managers (id)
    VALUES((SELECT currval('users_id_seq'))) RETURNING *;

    COMMIT;`
  const rows = await db.query(checkManagerEmailQuery, async (err, result) => {
    console.log('Checking if email exists:', result.rows)
    if (err) {
      console.log('Error:', err.stack);
      response.status(500).json('Failed to create user account.')
    } else {
      if (result.rows.length !== 0) {
        //If email already exists in customers table
        response.status(400).json('This email is already registered.')
      } else {
        db.query(createManagerQuery, async (err2, result2) => {
          if (err2) {
            console.log('Error creating manager', err2.stack);
            response.status(500).json('Failed to create manager account.')
          } else {
            console.log('Result', result2[2].rows, result2[3].rows);
            if (result2[2].rows.id == result2[3].rows.id)
              response.status(200).json('Created user/manager with id')
            else {
              response.status(404).json(`Failed to create manager.`)
            }
          }
        })
      }
    }
  })
}

// // @desc    Get total no. of order and total cost of these orders with filter dates
// // @route   GET /manager/summary/orders/filtered?start=:start&end=:end
// // @acess   Public
// exports.getGeneralOrderSummaryFiltered = async (req, response) => {
//   let { start, end } = req.query
//   const rows = await db.query(
//     `SELECT COUNT(*), SUM(fprice + dfee)
//     FROM Orders 
//     WHERE odatetime >= ${start} 
//     AND odatetime <= ${end}`,
//     (err, result) => {
//       if (err) {
//         console.error("Error here:", err)
//         response.status(404).json(`Failed to get general filtered order summary.`)
//       } else {
//         if (!result.rows[0]) {
//           response.status(404).json(`Failed to get filtered order data. There could be no order yet.`)
//         } else {
//           console.log('Successfully get filtered order data')
//           response.status(200).json(result.rows)
//         }
//       }
//     })
// }

// @desc    Get total no. of order and total cost of these orders
// @route   GET /manager/summary/orders
// @acess   Public
exports.getGeneralOrderSummary = async (req, response) => {
  let { start, end } = req.query
  const rows = await db.query(
    `SELECT COUNT(*), SUM(fprice + dfee)
    FROM Orders`,
    (err, result) => {
      if (err) {
        console.error("Error here:", err)
        response.status(404).json(`Failed to get general order summary.`)
      } else {
        if (!result.rows[0]) {
          response.status(404).json(`Failed to get order data. There could be no order yet.`)
        } else {
          console.log('Successfully get order data')
          response.status(200).json(result.rows)
        }
      }
    })
}

// @desc    Get customer info, no. of orders made by them and the cost
// @route   GET /manager/summary/customers?starttime=:starttime&endtime=:endtime
// @acess   Public
exports.getGeneralCustomerSummary = async (req, response) => {
  let { starttime, endtime } = req.query;
  const getSummaryQuery =
    `WITH SO AS (
    SELECT *
    FROM Orders O
    WHERE O.odatetime >= ${starttime}
    AND O.odatetime <= ${endtime}
    )
    SELECT json_build_object (
      'newcustomers', (SELECT COUNT(*) FROM Customers C WHERE C.joindate >= ${starttime} AND C.joindate <= ${endtime}),
      'ordercount', (SELECT COUNT(*) FROM SO),
      'completedorders', (SELECT COUNT(*) FROM SO WHERE SO.status = 2),
      'orderscost', COALESCE((SELECT SUM(fprice + dfee) FROM SO WHERE SO.status = 2), 0),
      'customerorders', (SELECT json_agg(rows) as customerorders 
      FROM (
      SELECT cid, name, email, COUNT(DISTINCT OID) as ordercount, SUM(fprice + dfee) AS totalpayment
      FROM SO JOIN Users U ON (U.id = SO.cid)
      GROUP BY (cid, name, email)
      ) AS rows),
      'orderlocations', (SELECT json_agg(rows) as orderlocations
      FROM(
        SELECT location, COUNT(DISTINCT oid) 
        FROM SO
        GROUP BY location
        ORDER BY COUNT(DISTINCT oid) DESC
      ) AS rows)
    ) as fdssummary`;

  db.query(getSummaryQuery, async (err, result) => {
    if (err) {
      console.error(err.stack);
      response.status(404).json(`Failed to get general customer summary.`);
    } else {
      console.log("Get customer summary:", result.rows[0]);
      response.status(200).json(result.rows[0]);
    }
  });
};


// @desc    Get rider summary info
// @route   GET /manager/summary/riders?starttime=:starttime&endtime=:endtime
// @acess   Public
exports.getGeneralRiderSummary = async (req, response) => {
  let { starttime, endtime } = req.query;

  const getSummaryQuery = `WITH getOrder AS (
    SELECT O.rid, COUNT(O.oid) AS count, SUM(O.dfee) AS sumdfee, 
    AVG(deliverdatetime - departdatetime2) AS avgdelivertime,
    AVG(R.rating) AS avgrating, COUNT(R.rating) AS norating
    FROM Orders O LEFT JOIN Ratings R USING (oid)
    WHERE O.status = 2
    AND O.odatetime >= ${starttime}
    AND O.odatetime <= ${endtime}
    GROUP BY O.rid
    ),
  getRiders AS (
    SELECT * FROM Riders R FULL OUTER JOIN getOrder S ON (S.rid = R.id)
  ),
  getHours AS (
    SELECT W.id, SUM(W.etime - W.stime) AS hours
    FROM WWS W  
    WHERE (SELECT EXTRACT(EPOCH FROM(
      SELECT dmy FROM WWS WHERE id = W.id 
      AND dmy = W.dmy AND etime = W.etime AND stime = W.stime))) >= ${starttime}
    AND (SELECT EXTRACT(EPOCH FROM(
      SELECT dmy FROM WWS WHERE id = W.id 
      AND dmy = W.dmy AND etime = W.etime AND stime = W.stime))) <= ${endtime}
    GROUP BY W.id
    UNION 
    SELECT M.id, SUM((etime1-stime1) + (etime2 - stime2)) AS hours
    FROM MWS M NATURAL JOIN MWSShift
    WHERE (SELECT EXTRACT(EPOCH FROM(
      SELECT dmy FROM MWS WHERE id = M.id AND dmy = M.dmy))) >= ${starttime}
    AND (SELECT EXTRACT(EPOCH FROM(
      SELECT dmy FROM MWS WHERE id = M.id AND dmy = M.dmy))) <= ${endtime}
    GROUP BY M.id
  ),
  riderInfo AS (
    SELECT * FROM getHours FULL OUTER JOIN getRiders USING (id)
  )
  SELECT json_build_object(
    'id', R.id, 
    'totalsalary', (R.bsalary + COALESCE(R.sumdfee, 0)), 
    'noorder', COALESCE(R.count, 0), 
    'avgdelivertime', COALESCE(R.avgdelivertime, 0),
    'hours', COALESCE(R.hours, 0),
    'norating', COALESCE(R.norating, 0),
    'avgrating', COALESCE(R.avgrating, 0)
    )
    AS riderinfo
    FROM riderInfo R
  `;
  // SELECT json_build_object (
  //   'riderinfo', (SELECT json_agg(rows) as riderinfo
  //   FROM (
  // SELECT R.id, (R.bsalary + COALESCE(R.sumdfee, 0)) AS totalsalary, R.count AS noorder, 
  // R.avgdelivertime, R.hours, R.norating, R.avgrating
  // FROM riderInfo R
  //   ) 
  //   AS rows)
  // ) as ridersummary`;

  db.query(getSummaryQuery, async (err, result) => {
    if (err) {
      console.error("Error here:", err);
      response.status(404).json(`Failed to get rider summary.`);
    } else {
      console.log("Get rider summary:", result.rows);
      response.status(200).json(result.rows);
    }
  });
};

// @desc    Get total customers, orders, cost
// @route   GET /manager/summary/general
// @acess   Public
exports.getGeneralSummary = async (req, response) => {
  const getSummaryQuery =
    `SELECT json_build_object(
    'totalcustomers', (SELECT COUNT(*) FROM Customers),
    'totalorders', (SELECT COUNT(*) FROM Orders),
    'totalcompletedorders', (SELECT COUNT(*) FROM Orders WHERE status = 2),
    'totalcost', (SELECT SUM(fprice + dfee) FROM Orders WHERE status = 2),
    'goodcustomers', (SELECT json_agg(rows) as goodcustomers
    FROM(
    SELECT cid, name, COUNT(*), SUM(fprice + dfee) 
    FROM Orders O JOIN Users U ON (O.cid = U.id)
    GROUP BY (cid, name)
    ORDER BY SUM(fprice + dfee) DESC
    LIMIT 3
    ) AS rows),
    'toplocations', (SELECT json_agg(rows) as toplocations
    FROM(
    SELECT location, COUNT(*)
    FROM Orders
    GROUP BY location
    ORDER BY COUNT(*) DESC
    LIMIT 3
    ) AS rows),
    'topriders', (SELECT json_agg(rows) as topriders
    FROM(
    SELECT rid, name, COUNT(oid), AVG(deliverdatetime - departdatetime2)
    FROM Orders O JOIN Users U ON (O.rid = U.id)
    WHERE status = 2
    GROUP BY rid, name
    ORDER BY COUNT(oid) DESC
    LIMIT 3
    ) AS rows)
  ) AS overviewsummary`;

  db.query(getSummaryQuery, async (err, result) => {
    if (err) {
      console.error(err.stack);
      response.status(404).json(`Failed to get overview summary.`);
    } else {
      console.log("Get overview summary:", result.rows[0]);
      response.status(200).json(result.rows[0]);
    }
  });
};
  //   `SELECT json_build_object(
  // 'id', C.id,
  // 'name', U.name,
  // 'email', U.email,
  // 'joindate', C.joindate,
  // 'numOrder', COUNT(O.oid),
  // 'totalCost', SUM(COALESCE(O.fprice, 0))
  // )
  // AS customerorder
  // FROM (Customers C NATURAL JOIN Users U) LEFT JOIN Orders O ON (C.id = O.cid)
  // GROUP BY C.id, U.name, U.email
  // ;`