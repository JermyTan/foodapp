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
// @route   GET /managers/summary/orders
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
// @route   GET /managers/summary/customers
// @acess   Public
exports.getGeneralCustomerSummary = async (req, response) => {
  let { starttime, endtime } = req.query
  const getSummaryQuery =
    `WITH SO AS (
    SELECT *
    FROM Orders O
    WHERE O.odatetime >= ${starttime}
    AND O.odatetime <= ${endtime}
    )
    SELECT json_build_object (
      'newcustomers', (SELECT COUNT(DISTINCT id) FROM Customers C WHERE C.joindate >= ${starttime} AND C.joindate <= ${endtime}),
      'ordercount', (SELECT COUNT(DISTINCT oid) FROM SO),
      'completedorders', (SELECT COUNT(DISTINCT oid) FROM SO WHERE SO.status = 2),
      'ordersfoodcost', (SELECT SUM(fprice) FROM SO WHERE SO.status = 2),
      'ordersdfee', (SELECT SUM(dfee) FROM SO WHERE SO.status = 2),
      'customerorders', (SELECT json_agg(rows) as customerorders 
      FROM (
      SELECT cid, name, SUM(DISTINCT OID) as ordercount, SUM(fprice + dfee) AS totalpayment
      FROM SO JOIN Users U ON (U.id = SO.cid)
      GROUP BY (cid, name)
      ) AS rows),
      'orderlocations', (SELECT json_agg(rows) as orderlocations
      FROM(
        SELECT location, COUNT(DISTINCT oid) 
        FROM SO
        GROUP BY location
        ORDER BY COUNT(DISTINCT oid) DESC
      ) AS rows)
    ) as fdssummary`

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

  db.query(getSummaryQuery, (err, result) => {
    if (err) {
      console.error("Error here:", err)
      response.status(404).json(`Failed to get general customer summary.`)
    } else {
      console.log(result.rows)
      if (!result.rows[0]) {
        response.status(404).json(`Failed to get summary data for FDS.`)
      } else {
        console.log('Successfully get customer data')
        response.status(200).json(result.rows)
      }
    }
  })
}

// @desc    Get rider summary info
// @route   GET /managers/summary/riders
// @acess   Public
exports.getGeneralRiderSummary = async (req, response) => {
  const getSummaryQuery =
    `WITH newWWS AS (
    SELECT id, dmy, SUM(etime - stime) AS hours 
    FROM WWS 
    GROUP BY id, dmy
    ), 
    getRiders AS (SELECT P.id, bsalary,(SELECT EXTRACT(MONTH FROM 
      (SELECT dmy FROM newWWS WHERE id = W.id AND dmy = W.dmy AND hours = W.hours))) AS month, 
    SUM(W.hours) AS hours, name, email
    FROM (newWWS W RIGHT JOIN (Riders NATURAL JOIN PTRiders P) USING (id)) NATURAL JOIN Users
    GROUP BY P.id, month, bsalary, name, email
    UNION
    SELECT F.id, bsalary, (SELECT EXTRACT(MONTH FROM 
      (SELECT dmy FROM MWS WHERE id = M.id AND dmy = M.dmy AND shift = M.shift))) AS month, 
    SUM((etime1-stime1) + (etime2-stime2)) AS hours, name, email
    FROM ((MWSShift NATURAL JOIN MWS M) RIGHT JOIN (Riders NATURAL JOIN FTRiders F) USING (id))
    NATURAL JOIN Users
    GROUP BY F.id, month, bsalary, name, email
    ),
    getOrders AS (SELECT rid, SUM(dfee) AS sumdfee, (SELECT EXTRACT(MONTH FROM
      (SELECT to_timestamp((SELECT odatetime FROM Orders WHERE oid = O.oid))::date))) AS month, 
    COUNT(oid) AS noOrders, AVG(deliverdatetime - departdatetime1) AS avgdelivertime
    FROM Orders O
    WHERE status = 2
    GROUP BY rid, month
    ),
    getRatings AS (
    SELECT O.rid, R.rating
    FROM Ratings R NATURAL JOIN Orders O
    )
    SELECT R.id, (R.bsalary + (COALESCE(O.sumdfee, 0))) AS salary, R.month, 
    R.hours, R.name, R.email, O.noorders, O.avgdelivertime, A.rating 
    FROM (getRiders R FULL OUTER JOIN getOrders O ON (R.id = O.rid AND R.month = O.month))
    LEFT JOIN getRatings A ON (A.rid = id)
    ;`

  const rows = await db.query(getSummaryQuery, (err, result) => {
    if (err) {
      console.error("Error here:", err)
      response.status(404).json(`Failed to get rider summary.`)
    } else {
      if (!result.rows[0]) {
        response.status(404).json(`Failed to get rider summary data.`)
      } else {
        console.log('Successfully get rider summary data')
        response.status(200).json(result.rows)
      }
    }
  })
}

// @desc    Get all riders schedule
// @route   GET /managers/riders/schedule
// @access   Private
exports.getAllRiderSchedule = async (req, response) => {
  const getRiderScheduleQuery =
    `SELECT id, sc_date, lower(timerange) AS st_time, upper(timerange) AS e_time
    FROM CombinedScheduleTable;`
  const rows = await db.query(getRiderScheduleQuery, (err, result) => {
    if (err) {
      console.error(err.stack);
      response.status(500).json(`Failed to get rider schedule.`)
    } else {
      // if (!result.rows[0]) {
      //   response.status(404).json(`No rider schedule found.`)
      // } else {
        console.log('Successfully get rider schedule')
        response.status(200).json(result.rows)
      // }
    }
  })
}

// @desc    Create rider schedule
// @route   POST /managers/riders/schedule
// @access  Private
exports.createRiderSchedule = async (req, response) => {
  // shape of request body is an array of json obj with either { id, date, shift } or { id, date, stime, etime }
  let createRiderScheduleQuery = 
  `BEGIN;
  SET CONSTRAINTS ALL DEFERRED;`;
  const arr = req.body;
  console.log(arr);
  arr.map((data) => {
    let query = ``
    if (data['shift']) {
      const { id, date, shift } = data;
      query = `INSERT INTO MWS (id, dmy, shift) VALUES (${id}, (SELECT to_date('${date}','YYYY-MM-DD')), ${shift}) RETURNING *;`
    } else {
      const { id, date, stime, etime } = data;
      query = `INSERT INTO WWS (id, dmy, stime, etime) VALUES (${id}, (SELECT to_date('${date}','YYYY-MM-DD')), ${stime}, ${etime}) RETURNING *;`
    }
    createRiderScheduleQuery += query;
  })

  createRiderScheduleQuery += `COMMIT;`
  console.log(`Create rider query is ${createRiderScheduleQuery}`);

  const rows = await db.query(createRiderScheduleQuery, (err, result) => {
    if (err) {
      console.error(err.stack);
      response.status(500).json(`Failed to create rider schedule.`);
    } else {
      // console.log('Successfully created rider schedule')
      rowsUpdated = [];
      result.map((data) => {
        console.log(data);
        if (data.rows.length > 0) {
          rowsUpdated.push(data.rows[0]);
        }
      })
      response.status(200).json(rowsUpdated)
    }
  })
}

// @desc    Delete all rider schedule for a partiular date
// @route   DELETE /managers/riders/schedule/:date
// @access   Private
exports.deleteRiderSchedule = async (req, response) => {
  const date = req.params.date;
  let deleteRiderScheduleQuery = 
  `BEGIN;
  SET CONSTRAINTS ALL DEFERRED;
  DELETE FROM MWS WHERE dmy = (SELECT to_date('${date}','YYYY-MM-DD')) RETURNING *;
  DELETE FROM WWS WHERE dmy = (SELECT to_date('${date}','YYYY-MM-DD')) RETURNING *;
  COMMIT;`
  
  console.log(`Delete rider query is ${deleteRiderScheduleQuery}`);
  
  const rows = await db.query(deleteRiderScheduleQuery, (err, result) => {
    if (err) {
      console.error(err.stack);
      response.status(500).json(`Failed to delete rider schedule.`)
    } else {
      console.log('Successfully deleted rider schedule')
      rowsDeleted = [];
      result.map((data) => {
        // console.log(data);
        if (data.rows.length > 0) {
          data.rows.forEach(element => {
            rowsDeleted.push(element);
          });
          // rowsDeleted.push(data.rows);
        }
      })
      response.status(200).json(rowsDeleted)
    }
  })
}
