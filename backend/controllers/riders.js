const db = require('../db')

// @desc    Get all riders id, bsalary, email, name, isft
// @route   GET /riders
// @access   Public
exports.getRiders = async (req, response) => {
  const rows = await db.query('SELECT * FROM rider_info', (err, result) => {
      if (err) {
          console.error(err.stack);
          throw err
      } else {
          if (!result.rows[0]) {
              response.status(404).json(`Failed to get all riders. There could be no rider created yet.`)
          } else {
              console.log('Successfully get all riders')
              response.status(200).json(result.rows)
          }
      }
  })

}

// @desc    Get a rider's permanent information
// @route   GET /riders/:id
// @access   Private
// TODO: WIP
exports.getRider = async (req, response) => {
  const rows = await db.query('SELECT * FROM rider_info WHERE id = $1', [req.params.id], (err, result) => {
    if (err) {
      console.error(err.stack);
    } else {
      if (!result.rows[0]) {
        response.status(404).json(`Failed to get rider.`)
      } else {
        console.log('Successfully get rider')
        response.status(200).json(result.rows)
      }
    }
  })
}

// @desc    Create new rider
// @route   POST /riders
// @access   Public
exports.createRider = async (req, response) => {
  const { email, name, isFT } = req.body
  const checkRiderEmailQuery = `SELECT * FROM Users WHERE email = ${email}`
  var riderType = isFT ? 'FTRiders' : 'PTRiders'

  const createRiderQuery =
    `BEGIN;
    SET CONSTRAINTS ALL DEFERRED;
    INSERT INTO Users (email, name)
    VALUES(${email},${name});
    
    INSERT INTO Riders (id, bsalary)
    VALUES((SELECT currval('users_id_seq')), 1000);

    INSERT INTO ${riderType} (id)
    VALUES((SELECT currval('users_id_seq')));

    COMMIT;`

  const rows = await db.query(checkRiderEmailQuery, async (err, result) => {
    console.log("Checking if email exists:", result.rows)
    if (err) {
      console.log("Error:", err.stack)
      response.status(500).json('Failed to create rider account - email check.')
    } else {
      if (result.rows.length !== 0) {
        //If email already exists in users table
        response.status(400).json('This email is already registered.')
      } else {
        await db.query(createRiderQuery, (err2, result2) => {
          if (err2) {
            console.log("Error creating rider", err2.stack)
            response.status(500).json('Failed to create rider account.')
          } else {
            console.log("New ID:", "user: ", result2[2].rows.id, "rider", result2[3].rows.id)
            if (result2[2].rows.id == result2[3].rows.id)
              response.status(200).json("Created user/rider with id ")
            else {
              response.status(404).json(`Failed to create rider.`)
            }
          }
        })
      }
    }
  })
}

// @desc    Get all orders and related information made by a rider
// @route   GET /riders/:id/orders
// @acess   Private
exports.getRiderOrders = async (req, response) => {
  const rid = req.params.id

  //scalar subquery to obtain individual prices of items sold by a restaurant
  const getItemPriceQuery = `SELECT price FROM Sells S WHERE S.rname = O.rname AND S.fname = C.fname`

  const getRiderOrdersQuery =
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
    WHERE O.rid = ${rid}
    ORDER BY O.odatetime DESC
    ;`

  const rows = await db.query(getRiderOrdersQuery, async (err, result) => {
    if (err) {
      console.error(err.stack);
      response.status(404).json(`Failed to get rider's orders.`)
    } else {
      console.log(result.rows)
      let allRiderOrders = []
      result.rows.forEach(item => {
        allRiderOrders.push(item.order)
      })
      response.status(200).json(allRiderOrders)
    }
  })
}

exports.acceptOrder = async (req, response) => {
  const { rid, oid, datetime } = req.body
}
