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
  const createCustomerQuery =
    `BEGIN;

    SET CONSTRAINTS ALL DEFERRED;
    INSERT INTO Users (email, name)
    VALUES(${email}, ${name}) RETURNING id;

    INSERT INTO Customers (id, rpoints, cardNum)
    VALUES((SELECT currval('users_id_seq')), 0, (SELECT NULLIF(${cardnum}, 0))) RETURNING *; 

    COMMIT;`
  try {
    const rows = await db.query(createCustomerQuery, async (err, result) => {
      if (err) {
        // console.error(err.stack);
        console.log("ERROR", err.constraint)
        if (err.constraint === 'users_email_key') {
          response.status(400).json({ success: false, msg: 'Email already exists in DB.' })
        } else {
          response.status(500).json({ success: false, msg: 'Failed db query. Please try again.' })
        }

      } else {
        console.log("result", result[2].rows, result[3].rows)
        if (result[2].rows.id == result[3].rows.id)
          response.status(200).json({ success: true, msg: "Created user/customer with id" })
        else {
          db.query('ROLLBACK');
          response.status(404).json({ success: false, msg: `Failed to create customer.` })
        }
      }
    })
  } catch (err) {
    console.log("ERROR", err)
    response.status(500).json({ success: false, msg: 'Failed db query. Please try again.' })
  }
}