const db = require('../db');

// @desc    Create new manager
// @route   POST /manager
// @acess   Private
exports.createManager = async (req, response) => {
  const { email, name } = req.body;
  const checkManagerEmailQuery = `SELECT * FROM Users WHERE email = ${email}`
  const createManagerQuery =
    `BEGIN;

    SET CONSTRAINTS ALL DEFERRED;
    INSERT INTO Users (email, name, role)
    VALUES(${email}, ${name}, 3) RETURNING id;

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
// @route   GET /manager/summary/customers
// @acess   Public
exports.getGeneralCustomerSummary = async (req, response) => {
  const getSummaryQuery =
    `SELECT json_build_object(
  'id', C.id,
  'name', U.name,
  'email', U.email,
  'joindate', C.joindate,
  'numOrder', COUNT(O.oid),
  'totalCost', SUM(COALESCE(O.fprice, 0))
  )
  AS customerorder
  FROM (Customers C NATURAL JOIN Users U) LEFT JOIN Orders O ON (C.id = O.cid)
  GROUP BY C.id, U.name, U.email
  ;`

  const rows = await db.query(getSummaryQuery, (err, result) => {
    if (err) {
      console.error(err.stack);
      throw err
    } else {
      if (!result.rows[0]) {
        response.status(404).json(`Failed to get customer data.`)
      } else {
        console.log('Successfully get customer data')
        response.status(200).json(result.rows)
      }
    }
  })
}