const db = require('../db')

// @desc    Get all restaurants
// @route   GET /restaurants
// @acess   Public
exports.getRestaurants = async (req, response) => {
  const rows = await db.query('SELECT * FROM restaurants', (err, result) => {
    if (err) {
      console.error(err.stack);
      throw err
    } else {
      if (!result.rows[0]) {
        response.status(404).json({ success: false, msg: `Failed to get all restaurants. There could be no restaurants yet.` })
      } else {
        console.log('Successfully get all restaurants')
        response.status(200).json({ success: true, msg: result.rows })
      }
    }
  })
}


// @desc    Get single restaurant and the food items, along with the amount available today
// @route   GET /restaurant/:fname
// @acess   Public
exports.getRestaurant = async (req, response) => {
  const { rname, starttimetoday, endtimetoday } = req.body
  const getRestaurantFoodQuery =
    `SELECT *, flimit - COALESCE(
      (SELECT SUM(C.quantity) AS qtysoldtoday
        FROM (
          SELECT * FROM Orders O
          WHERE (O.odatetime >= ${starttimetoday} AND O.odatetime <= ${endtimetoday}) 
          AND (O.status = 1 OR O.status = 2)) AS O
        JOIN Consists C ON O.oid = C.oid
        GROUP BY C.fname, O.rname
        HAVING S.fname = C.fname
        AND S.rname = O.rname), 0) as qtylefttoday
    FROM Sells S
    WHERE S.rname = ${rname}
    ;`
  const row = await db.query(getRestaurantFoodQuery, (err, result) => {
    if (err) {
      console.error(err.stack)
      response.status(404).json({ success: false, msg: `Failed to get restaurant and food items.` })
    } else {
      console.log("RESULT:", result)
      if (!result.rows) {
        response.status(404).json({ success: false, msg: `Failed to get restaurant and food items.` })
      } else {
        response.status(200).json({ success: true, msg: result.rows })
      }
    }
  })
}

// @desc    Create new restaurant
// @route   POST /restaurant
// @acess   Private
exports.createRestaurant = async (req, response) => {
  const { rname, minamt } = req.body
  const checkRestaurantExistsQuery = `SELECT * FROM Restaurants WHERE rname = ${rname}`
  const createRestaurantQuery = `INSERT INTO Restaurants (${rname}, ${minamt}) VALUES ($1, $2) returning *`

  const rows = await db.query(checkRestaurantExistsQuery, (err, result) => {
    if (err) {
      console.log(err.stack)
      response.status(500).json({ success: false, msg: 'Some error occurred' })
    } else {
      if (result.rows.length !== 0) {
        //Restaurant already registered
        response.status(400).json({ success: false, msg: 'This restaurant is already registered.' })
      } else {
        db.query(createRestaurantQuery, async (err2, result2) => {
          if (err2) {
            console.log("Error creating restaurant", err2.stack)
            response.status(500).json({ success: false, msg: 'Failed to create restaurant account.' })
          } else {
            console.log("Result", result2[2].rows, result2[3].rows)
            if (result.rows) {
              console.log('Successfully created restaurant')
              response.status(200).json({ success: true, msg: "Created restaurant" })
            }
            else {
              response.status(404).json({ success: false, msg: result.rows })
            }
          }
        })
      }

    }
  })
}


// @desc    Add new food to sells table
// @route   POST /restaurant
// @acess   Private
exports.addFoodToSells = async (req, response) => {
  const { fname, rname, price, cat, flimit } = req.body
  const addFoodToSellsQuery =
    `BEGIN;
    SET CONSTRAINTS ALL DEFERRED;
    INSERT INTO Food
    SELECT * FROM 
    (SELECT ${fname}, ${cat}) AS tmp 
    WHERE NOT EXISTS (SELECT fname FROM Food WHERE fname = ${fname})
    LIMIT 1
    returning *;

    INSERT INTO Sells (fname, rname, avail, flimit, price)
    VALUES(${fname}, ${rname}, TRUE, ${flimit}, ${price})
    returning *;
    COMMIT;`
  const rows = await db.query(addFoodToSellsQuery, (err, result) => {
    if (err) {
      console.log("ERROR:", err)
      if (err.constraint === 'sells_pkey') {
        response.status(400).json({ success: false, msg: 'Record already exists.' })
      } else {
        response.status(500).json({ success: false, msg: 'Unable to add food. Please try again.' })
      }
    } else {
      console.log("RESULT", result)
      if (result[3].rows) {
        console.log(result[3].rows)
        response.status(404).json({ success: true, msg: result[3].rows })
      } else {
        console.log('Failed to add new record in sells')
        response.status(400).json({ success: false, msg: `Failed to add new record in sells` })
      }
    }
  });
}



