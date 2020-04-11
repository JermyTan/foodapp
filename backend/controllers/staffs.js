const db = require('../db')


// @desc    Create new staff
// @route   POST /staffs
// @acess   Private
exports.createStaff = async (req, response) => {
  const { email, name, rname } = req.body
  const checkCustomerEmailQuery = `SELECT * FROM Users WHERE email = ${email}`
  const createCustomerQuery =
    `BEGIN;

    SET CONSTRAINTS ALL DEFERRED;
    INSERT INTO Users (email, name)
    VALUES(${email}, ${name}) RETURNING id;

    INSERT INTO Staffs (id, rname)
    VALUES((SELECT currval('users_id_seq')), ${rname}) RETURNING *;

    COMMIT;`
  const rows = await db.query(checkCustomerEmailQuery, async (err, result) => {
    console.log("Checking if email exists:", result.rows)
    if (err) {
      console.log("Error:", err.stack)
      response.status(500).json({ success: false, msg: 'Failed to create user account.' })
    } else {
      if (result.rows.length !== 0) {
        //If email already exists in customers table
        response.status(400).json({ success: false, msg: 'This email is already registered.' })
      } else {
        db.query(createCustomerQuery, async (err2, result2) => {
          if (err2) {
            console.log("Error creating customer", err2.stack)
            response.status(500).json({ success: false, msg: 'Failed to create staff account.' })
          } else {
            console.log("Result", result2[2].rows, result2[3].rows)
            if (result2[2].rows.id == result2[3].rows.id)
              response.status(200).json({ success: true, msg: "Created user/staff with id" })
            else {
              response.status(404).json({ success: false, msg: `Failed to create staff.` })
            }
          }
        })
      }
    }
  })
}



