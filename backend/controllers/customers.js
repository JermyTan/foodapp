const db = require('../db')

// @desc    Get all customers
// @route   GET /customers
// @acess   Public
exports.getCustomers = async (req, response) => {
  const rows = await db.query('SELECT * FROM customers', (err, result) => {
    if (err) {
      console.error(err.stack);
      throw err
    } else {
      if (!result.rows[0]) {
        response.status(404).json({ success: false, msg: `Failed to get all customers. There could be no customers yet.` })
      } else {
        console.log('Successfully get all customers')
        response.status(200).json({ success: true, msg: result.rows })
      }
    }
  })
}

// @desc    Create new customer
// @route   POST /customers
// @acess   Private
exports.createCustomer = async (req, response) => {
  const { email, name, cardnum } = req.body
  const checkCustomerEmailQuery = `SELECT * FROM Users WHERE email = ${email}`
  const createCustomerQuery =
    `BEGIN;

    SET CONSTRAINTS ALL DEFERRED;
    INSERT INTO Users (email, name)
    VALUES(${email}, ${name}) RETURNING id;

    INSERT INTO Customers (id, rpoints, cardNum)
    VALUES((SELECT currval('users_id_seq')), 0, (SELECT NULLIF(${cardnum}, 0))) RETURNING *;

    COMMIT;`

  const rows = await db.query(checkCustomerEmailQuery, async (err, result) => {
    console.log("Checking if email exists:", result.rows)
    if (err) {
      console.log("Error:", err.stack)
      response.status(500).json({ success: false, msg: 'Failed to create customer account.' })
    } else {
      if (result.rows.length !== 0) {
        //If email already exists in customers table
        response.status(400).json({ success: false, msg: 'This email is already registered.' })
      } else {
        db.query(createCustomerQuery, async (err2, result2) => {
          if (err2) {
            console.log("Error creating customer", err2.stack)
            response.status(500).json({ success: false, msg: 'Failed to create customer account.' })
          } else {
            console.log("Result", result2[2].rows, result2[3].rows)
            if (result2[2].rows.id == result2[3].rows.id)
              response.status(200).json({ success: true, msg: "Created user/customer with id" })
            else {
              response.status(404).json({ success: false, msg: `Failed to create customer.` })
            }
          }
        })
      }
    }
  })
}

exports.getCustomer = async (req, response) => {
  const rows = await db.query('SELECT * FROM customers NATURAL JOIN users WHERE id = $1', [req.body.id], (err, result) => {
    if (err) {
      console.error(err.stack);
      throw err
    } else {
      if (!result.rows[0]) {
        response.status(404).json({ success: false, msg: `Failed to get all customer.` })
      } else {
        console.log('Successfully get customer')
        response.status(200).json({ success: true, msg: result.rows })
      }
    }
  })
}