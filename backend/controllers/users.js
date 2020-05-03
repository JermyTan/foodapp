const db = require('../db')

// @desc    Get all users
// @route   GET /users
// @acess   Public
exports.getUsers = async (req, response) => {
    const rows = await db.query('SELECT * FROM users', (err, result) => {
        if (err) {
            console.error(err.stack);
            throw err
        } else {
            if (!result.rows[0]) {
                response.status(404).json(`Failed to get all users. There could be no user created yet.`)
            } else {
                console.log('Successfully get all users')
                response.status(200).json(result.rows)
            }
        }
    })

}

// @desc    Get single user
// @route   GET /users/:id
// @acess   Public
exports.getUser = async (req, response) => {
    const id = req.params.id
    const row = await db.query('SELECT * FROM users WHERE id = $1', [id], (err, result) => {
        if (err) {
            console.error(err.stack)
            throw err
        } else {
            if (!result.rows[0]) {
                response.status(404).json(`Failed to get user ${id}. User does not exist.`)
            } else {
                console.log(`Successfully get user with id ${id}`)
                response.status(200).json(result.rows[0])
            }
        }
    })
}

// @desc    Create new user
// @route   POST /users
// @acess   Private
exports.createUser = async (req, response) => {
    const { name, email } = req.body
    const createUserQuery = `INSERT INTO USERS (email, name) VALUES ($1, $2) returning *`
    const values = [email, name]
    try {
        const rows = await db.query(createUserQuery, values, (err, result) => {
            if (err) {
                console.error(err.stack)
                throw err
            } else {
                console.log(result);
                if (!result.rows[0]) {
                    response.status(404).json(`Failed to create new user.`)
                } else {
                    console.log('Successfully created user')
                    response.status(200).json(result.rows[0])
                }
            }
        })
    } catch (err) {
        console.log("an error occured");
        response.status(409).json(`Something went wrong. Duplicate email?`)
    }
}

// @desc    Update new user
// @route   PUT /users/:id
// @acess   Private
// exports.updateUser = async (req, response) => {
//     const id = req.params.id
//     const { name, email } = req.body
//     var values = [name, email, id]
//     for (ele of values) {
//         if (typeof ele === 'undefined') {
//             ele = null
//         }
//     }
//     // TODO: handle update of variable number of fields

//     const row = await db.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 returning *', values, (err, result) => {
//         if (err) {
//             console.error(err.stack)
//             throw err
//         } else {
//             if (!result.rows[0]) {
//                 response.status(404).json(`Failed to update user ${id}. User does not exist.`)
//             } else {
//                 console.log(`Successfully updated user with id ${id}`)
//                 response.status(200).json(result.rows[0])
//             }
//         }
//     })
// }

// @desc    Update user info
// @route   PUT /users/:id
// @acess   Public
exports.updateUser = async (req, response) => {
    const id = req.params.id
    const { email, name } = req.body
    const checkUserEmailQuery = `SELECT * FROM Users WHERE email = ${email}`

    const updateUserQuery =
        `UPDATE users
    SET email = ${email},
    name = ${name}
    WHERE id = ${id}
    RETURNING *;`

    db.query(checkUserEmailQuery, async (err, result) => {
        console.log("Checking if email exists:", result.rows)
        if (err) {
            console.log("Error:", err.stack)
            response.status(500).json('Failed to verify if email exists.')
        } else {
            if (result.rows.length !== 0) {
                //If email already exists in users table
                response.status(400).json('This email is already registered.')
            } else {
                db.query(updateUserQuery, async (err2, result2) => {
                    if (err2) {
                        console.log("Error creating customer", err2.stack)
                        response.status(500).json('Failed to update user account.')
                    } else {
                        console.log("Update:", result2)
                        if (result2.rows)
                            response.status(200).json({ msg: `Updated customer with id ${id}` })
                        else {
                            response.status(404).json({ msg: `Failed to create customer.` })
                        }
                    }
                })
            }
        }
    })

}

// @desc    Delete user
// @route   DELETE /users/:id
// @acess   Private
exports.deleteUser = async (req, response) => {
    const id = req.params.id
    const row = await db.query('DELETE FROM users WHERE id = $1', [id], (err, result) => {
        if (err) {
            console.error(err.stack)
            throw err
        } else {
            // TODO: detect case and handle when nothing is deleted

            console.log(`Successfully deleted user with id ${id}`)
            response.status(200).json(`Successfully deleted user with id ${id}`)
        }
    })
}
