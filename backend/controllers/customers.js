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
  console.log("req", req.body)
  try {
    const wrapper = async () => db.query(`BEGIN`);
    wrapper().then(
      console.log("Begin finished executed")

    );

    //db.query(`BEGIN`)
    // await db.query(`SET CONSTRAINTS ALL DEFERRED`)

    // const queryCreateUser =
    //   `INSERT INTO Users(email, name) VALUES($1, $2) RETURNING id`
    // const queryCreateCustomer =
    //   `INSERT INTO Customers(id, rpoints, cardNum)
    //     VALUES($1, 0, (SELECT NULLIF($2, 0))) RETURNING *`

    // const rows = await db.query(queryCreateUser, [email, name], async (err, result) => {
    //   if (err) {
    //     console.log(err.stack)
    //     response.status(404).json({ success: false, msg: `Failed to create new user. Email may already exist in db.` })
    //   } else {
    //     console.log("result: ", result)
    //     await db.query(queryCreateCustomer, [result.id, cardnum], async (err, result2) => {
    //       if (err) {
    //         response.status(404).json({ success: false, msg: `Failed to create new customer.` })
    //       } else {
    //         console.log(result2)
    //         if (!result2.rows) {
    //           response.status(404).json({ success: false, msg: `Failed to create new customer.` })
    //         } else {
    //           await db.query('COMMIT;')
    //           console.log('Successfully created customer')
    //           response.status(200).json({ success: true, msg: result2.rows[0] })
    //         }
    //       }
    //     })
    //   }
    // })
  } catch (e) {
    console.log(e);
    await db.query('ROLLBACK')
    response.status(500).send('Failed db query. Please try again.')
  }

}
// const rows = await db.query(createCustomerQuery, (err, result) => {
//       if (err) {
//         console.error(err.stack)
//         console.log("an error occured");
//         response.status(400).json({ success: false, msg: `Something went wrong. Duplicate email?` })
//       } else {
//         console.log(result)
//         if (!result.rows[0]) {
//           response.status(404).json({ success: false, msg: `Failed to create new customer.` })
//         } else {
//           console.log('Successfully created  customer')
//           response.status(200).json({ success: true, msg: result.rows[0] })
//         }
//       }
//     });


 // let createCustomerQuery =
  //   `BEGIN;

  //   SET CONSTRAINTS ALL DEFERRED;
  //   INSERT INTO Users (email, name)
  //   VALUES(${email}, ${name});

  //   INSERT INTO Customers (id, rpoints, cardNum)
  //   VALUES((SELECT currval('users_id_seq')), 0, (SELECT NULLIF(${cardnum}, 0))); 

  //   COMMIT;`

  // const createUserQuery = `INSERT INTO USERS (email, name) VALUES ($1, $2) returning *`