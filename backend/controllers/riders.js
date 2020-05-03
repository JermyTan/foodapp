const db = require('../db')

// @desc    Get all riders id and their base salaries
// @route   GET /riders
// @access   Public
exports.getRiders = async (req, response) => {
  const rows = await db.query('SELECT * FROM riders', (err, result) => {
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

// @desc    Get a rider information with past work schedule and salaries
// @route   GET /riders
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


exports.viewAssignedOrders = async (req, response) => {
  const { email, name, isFT } = req.body;

  const getOrdersQuery = ``


}


exports.acceptOrder = async (req, response) => {
  const { rid, oid, datetime } = req.body




}