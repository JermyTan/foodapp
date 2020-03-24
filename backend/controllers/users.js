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
                response.status(404).json({ success: false, msg: `Failed to get all users. There could be no user created yet.` })
            } else {
                console.log('Successfully get all users')
                response.status(200).json({ success: true, msg: result.rows })
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
                response.status(404).json({ success: false, msg: `Failed to get user ${id}. User does not exist.` })
            } else {
                console.log(`Successfully get user with id ${id}`)
                response.status(200).json({ success: true, msg: result.rows[0] })
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
                    response.status(404).json({ success: false, msg: `Failed to create new user.` })
                } else {
                    console.log('Successfully created user')
                    response.status(200).json({ success: true, msg: result.rows[0] })
                }
            }
        })
    } catch (err) {
        console.log("an error occured");
        response.status(409).json({ success: false, msg: `Something went wrong. Duplicate email?` })
    }
}

// @desc    Update new user
// @route   PUT /users/:id
// @acess   Private
exports.updateUser = async (req, response) => {
    const id = req.params.id
    const { name, email } = req.body
    var values = [name, email, id]
    for (ele of values) {
        if (typeof ele === 'undefined') {
            ele = null
        }
    }
    // TODO: handle update of variable number of fields

    const row = await db.query('UPDATE users SET name = $1, email = $2 WHERE id = $3 returning *', values, (err, result) => {
        if (err) {
            console.error(err.stack)
            throw err
        } else {
            if (!result.rows[0]) {
                response.status(404).json({ success: false, msg: `Failed to update user ${id}. User does not exist.` })
            } else {
                console.log(`Successfully updated user with id ${id}`)
                response.status(200).json({ success: true, msg: result.rows[0] })
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
            response.status(200).json({ success: true, msg: `Successfully deleted user with id ${id}` })
        }
    })
}
