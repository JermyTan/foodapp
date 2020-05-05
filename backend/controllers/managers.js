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
    INSERT INTO Users (email, name)
    VALUES(${email}, ${name}) RETURNING id;

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

// @desc    Get customer summary
// @route   GET /manager/summary
// @acess   Public
exports.getCustomerSummary = async (req, response) => {
  const getSummaryQuery =
    `SELECT json_build_object(
  'id', C.id,
  'name', U.name,
  'numOrder', COUNT(*),
  'totalCost', SUM(O.fprice)
  )
  AS customersummary
  FROM (Customers C NATURAL JOIN Users U) JOIN Orders O ON (C.id = O.cid)
  GROUP BY C.id, U.name
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

// @desc    Get total customer, order summary
// @route   GET /manager/summary
// @acess   Public
exports.getGeneralSummary = async (req, response) => {
  const getSummaryQuery =
    `SELECT json_build_object(
  'id', C.id,
  'name', U.name,
  'email', U.email,
  'joindate', C.joindate,
  'numOrder', COUNT(*),
  'totalCost', SUM(O.fprice)
  )
  AS customerorder
  FROM (Customers C NATURAL JOIN Users U) JOIN Orders O ON (C.id = O.cid)
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