const db = require('../db')


// @desc    Create new staff
// @route   POST /staffs
// @acess   Private
exports.createStaff = async (req, response) => {
  const { email, name, rname } = req.body
  const checkCustomerEmailQuery = `SELECT * FROM Users WHERE email = '${email}'`
  const createStaffQuery =
    `BEGIN;

    SET CONSTRAINTS ALL DEFERRED;
    INSERT INTO Users (email, name)
    VALUES('${email}', '${name}') RETURNING id;

    INSERT INTO Staffs (id, rname)
    VALUES((SELECT currval('users_id_seq')), '${rname}') RETURNING *;

    COMMIT;`
  const rows = await db.query(checkCustomerEmailQuery, async (err, result) => {
    console.log("Checking if email exists:", result.rows)
    if (err) {
      console.log("Error:", err.stack)
      response.status(400).json('Failed to create user account.')
    } else {
      if (result.rows.length !== 0) {
        //If email already exists in customers table
        response.status(400).json('This email is already registered.')
      } else {
        db.query(createStaffQuery, async (err2, result2) => {
          if (err2) {
            console.log("Error creating customer", err2.stack)
            response.status(400).json('Failed to create staff account.')
          } else {
            console.log("Result", result2[2].rows, result2[3].rows)
            if (result2[2].rows.id == result2[3].rows.id)
              response.status(200).json({ msg: `Created user/staff`, data: result2[3].rows })
            else {
              response.status(404).json(`Failed to create staff.`)
            }
          }
        })
      }
    }
  })
}


// @desc    Retrieves the restaurant that the staff is working for
// @route   GET /staffs/:id
// @acess   Private
exports.getStaffRestaurant = async (req, response) => {
  let staffid = req.params.id
  const getStaffRestaurantQuery = `SELECT rname FROM Staffs WHERE id = ${staffid}`
  db.query(getStaffRestaurantQuery, (err, result) => {
    if (err) {
      console.log("Error:", err.stack)
      response.status(400).json('Failed to retrieve staff restaurant name')
    } else {
      console.log(result.rows[0])
      response.status(200).json({ rname: result.rows[0].rname })
    }
  })
}