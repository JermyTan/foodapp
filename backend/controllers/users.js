const db = require("../db");

// @desc    Get all users
// @route   GET /users
// @acess   Public
exports.getUsers = async (req, response) => {
  const rows = await db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      console.error(err.stack);
      throw err;
    } else {
      if (!result.rows[0]) {
        response
          .status(404)
          .json(`Failed to get all users. There could be no user created yet.`);
      } else {
        console.log("Successfully get all users");
        response.status(200).json(result.rows);
      }
    }
  });
};

// @desc    Get user id and role from email login
// @route   GET /users?email=:email
// @acess   Public
exports.getUser = async (req, response) => {
  const email = req.query.email;
  db.query(`SELECT * FROM Users WHERE email = '${email}'`, (err, result) => {
    if (err) {
      console.error(err.stack);
      response.status(404).json(`Failed to get user. User does not exist.`);
    } else {
      console.log(result.rows);
      if (!result.rows[0]) {
        response.status(404).json(`Failed to get user. User does not exist.`);
      } else {
        console.log(`Successfully get user`);
        response.status(200).json(result.rows[0]);
      }
    }
  });
};

// @desc    Create new user
// @route   POST /users
// @acess   Private
exports.createUser = async (req, response) => {
  const { name, email } = req.body;
  const createUserQuery = `INSERT INTO USERS (email, name) VALUES ('${email}', '${name}') returning *`;
  try {
    const rows = await db.query(createUserQuery, values, (err, result) => {
      if (err) {
        console.error(err.stack);
        throw err;
      } else {
        console.log(result);
        if (!result.rows[0]) {
          response.status(404).json(`Failed to create new user.`);
        } else {
          console.log("Successfully created user");
          response.status(200).json(result.rows[0]);
        }
      }
    });
  } catch (err) {
    console.log("an error occured");
    response.status(409).json(`Something went wrong. Duplicate email?`);
  }
};

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
  const id = parseInt(req.params.id);
  const { email, name } = req.body;

  const updateUserQuery = `UPDATE users
    SET email = '${email}',
    name = '${name}'
    WHERE id = ${id}
    RETURNING *;`;

  const rows = db.query(updateUserQuery, async (err, result) => {
    if (err) {
      const msg = getUserErrorMsg(err);
      response.status(500).json({ msg : msg, err: err});
    } else {
      console.log("Update:", result);
      if (result.rows)
        response
          .status(200)
          .json({ msg: `Updated customer with id ${id}` });
      else {
        response.status(404).json({ msg: `Failed to create user.` });
      }
    }
  });
};

// @desc    Toggle active status of user (ie. set user active/inactive)
// @route   PUT /users/active/toggle
// @acess   Private
exports.toggleActiveUser = async (req, response) => {
  // shape of request body: json of an array arr containing json with { id, active }
  let toggleActiveUserQuery = 
  `BEGIN;
  SET CONSTRAINTS ALL DEFERRED;
  `;

  const arr = req.body;

  if (!Array.isArray(arr) || arr.length == 0) {
    response.status(400).json(`Bad request. Request body missing or not in array.`);
  }

  arr.map((data) => {
    const { id, active } = data;

    if (typeof id == 'undefined' || typeof active == 'undefined' ) { // throw bad request response if data missing
      console.error(`Partial data missing id: ${id}, active: ${active}`)
      throw response.status(400).json({msg : `Bad request. Data missing.`, id: `${id}`, active: `${active}`});
    }

    toggleActiveUserQuery += `UPDATE users
    SET active = '${active}'
    WHERE id = ${id}
    RETURNING *;
    `
  });

  toggleActiveUserQuery += `COMMIT;`

  console.log(`Toggle active user query is ${toggleActiveUserQuery}`);
  
  const rows = await db.query(toggleActiveUserQuery, (err, result) => {
      if (err) {
        const msg = getUserErrorMsg(err);
        response.status(500).json({ msg : msg, err: err});
      } else {
        console.log('Successfully toggled user active status.')
        rowsToggled = [];
        result.map((data) => {
          // console.log(data);
          if (data.rows.length > 0) {
            data.rows.forEach(element => {
              rowsToggled.push(element);
            });
          }
        })
        response.status(200).json(rowsToggled);
      }
    }
  );
};

const getUserErrorMsg = (err) => {
  msg = ``;
  console.error(err);
  switch (err.constraint) {
  case "users_active_check":
    msg = `Invalid user active status value. Only number 0 (inactive) or 1 (active) is allowed.`;
    break;
  case "users_email_check":
    msg = `Invalid email field. Email field entered is empty or in the wrong format.`;
    break;
  case "users_name_check":
    msg = `Invalid user name. User name entered is empty.`;
    break;
  case "users_pkey":
    msg = `Invalid user id. User id field entered is either empty, or id already exists in the database.`;
    break;
  case "users_email_key":
    msg = `Invalid user email. User email already exists in the database.`;
    break;
  default:
    msg = `A constraint is violated in the Users table of the database.`;
    break;
  }
  return msg;
}