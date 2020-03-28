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


// @desc    Get single restaurant and its food items
// @route   GET /restaurant/:fname
// @acess   Public
exports.getRestaurant = async (req, response) => {
  const { rname, starttimetoday, endtimetoday } = req.body
  const getRestaurantFoodQuery =
    `SELECT *,
      (SELECT SUM(C.quantity) as qtysoldtoday
        FROM (
          SELECT * FROM Orders O
          WHERE (O.odatetime >= $1 AND O.odatetime <= $2) 
          AND (O.status = 1 OR O.status = 2)) AS O
        JOIN Consists C ON O.oid = C.oid
        GROUP BY C.fname, O.rname
        HAVING S.fname = C.fname
        AND S.rname = O.rname)
    FROM Sells S
    WHERE S.rname = $3;`
  const row = await db.query(getRestaurantFoodQuery, [starttimetoday, endtimetoday, rname], (err, result) => {
    if (err) {
      console.error(err.stack)
    } else {
      console.log(result)
      if (!result.rows) {
        response.status(404).json({ success: false, msg: `Failed to get restaurant and food items.` })
      } else {
        console.log(`Successfully create restaurant ${rname}`)
        response.status(200).json({ success: true, msg: "Successfully create restaurant" })
      }
    }
  })
}

// @desc    Create new restaurant
// @route   POST /restaurant
// @acess   Private
exports.createRestaurant = async (req, response) => {
  const { rname, minamt } = req.body
  const createRestaurantQuery = `INSERT INTO Restaurants (rname, minamt) VALUES ($1, $2) returning *`

  const rows = await db.query(createRestaurantQuery, values, (err, result) => {
    if (err) {
      console.error(err.stack);
      console.log("ERROR", err.constraint)
      if (err.constraint === 'restaurants_pkey') {
        response.status(400).json({ success: false, msg: 'Restaurants already exists in DB.' })
      } else {
        response.status(500).json({ success: false, msg: 'Unable to create restaurant. Please try again.' })
      }
    } else {
      if (!result.rows) {
        console.log(result)
        response.status(404).json({ success: false, msg: `Failed to create new Restaurant.` })
      } else {
        console.log('Successfully created restaurant')
        response.status(200).json({ success: true, msg: result.rows })
      }
    }
  });
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



