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
        response.status(404).json(`Failed to get all customers. There could be no customers yet.`)
      } else {
        console.log('Successfully get all customers')
        response.status(200).json(result.rows)
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
      response.status(500).json('Failed to create customer account.')
    } else {
      if (result.rows.length !== 0) {
        //If email already exists in users table
        response.status(400).json('This email is already registered.')
      } else {
        db.query(createCustomerQuery, async (err2, result2) => {
          if (err2) {
            console.log("Error creating customer", err2.stack)
            response.status(500).json('Failed to create customer account.')
          } else {
            console.log("Result", result2[2].rows, result2[3].rows)
            if (result2[2].rows.id == result2[3].rows.id)
              response.status(200).json("Created user/customer with id")
            else {
              response.status(404).json(`Failed to create customer.`)
            }
          }
        })
      }
    }
  })
}

// @desc    Get a customer
// @route   GET /customers
// @acess   Private
exports.getCustomer = async (req, response) => {
  const rows = await db.query('SELECT * FROM customers NATURAL JOIN users WHERE id = $1', [req.params.id], (err, result) => {
    if (err) {
      console.error(err.stack);
    } else {
      if (!result.rows[0]) {
        response.status(404).json(`Failed to get customer.`)
      } else {
        console.log('Successfully get customer')
        response.status(200).json(result.rows)
      }
    }
  })
}

// @desc    Get all orders and related information made by a customer
// @route   GET /customer/:id/orders
// @acess   Private
exports.getCustomerOrders = async (req, response) => {
  const cid = req.params.id

  //scalar subquery to obtain individual prices of items sold by a restaurant
  const getItemPriceQuery = `SELECT price FROM Sells S WHERE S.rname = O.rname AND S.fname = C.fname`

  const getCustomerOrdersQuery =
    `SELECT json_build_object(
    'oid', oid,
    'fprice', fprice,
    'location', location,
    'dfee', dfee,
    'rname', rname,
    'odatetime', odatetime,
    'status', status,
    'items', (SELECT array_agg(json_build_object('fname', fname, 'qty', quantity, 'price', (${getItemPriceQuery})))
              FROM Consists C
              WHERE C.oid = O.oid))
    AS order
    FROM Orders O
    WHERE O.cid = ${cid}
    ORDER BY O.odatetime
    ;`

  const rows = await db.query(getCustomerOrdersQuery, async (err, result) => {
    if (err) {
      console.error(err.stack);
      response.status(404).json(`Failed to get customer's orders.`)
    } else {
      response.status(200).json(result.rows)
      // console.log("Result.rows for order id:", result.rows);
      // const orderItemsPromises = await result.rows.map(async orderJson => {
      //   //console.log("order json", orderJson);
      //   const oid = orderJson.oid
      //   await db.query(getOrderItemsQuery, [oid], async (err, result2) => {
      //     if (err) {
      //       console.log(err.stack)
      //       response.status(404).json(`Failed to get order items for ` + oid)
      //     } else {
      //       orderJson.items = result2.rows
      //       console.log("orderJson", orderJson)
      //     }
      //   })
      // })
      // console.log("orderitems", orderItemsPromises)
      // const final = await Promise.all(orderItemsPromises)
      // console.log("FINAL", final)
      // response.status(200).json(final)
    }

  })
}




