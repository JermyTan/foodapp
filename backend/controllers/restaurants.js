const db = require('../db')

// @desc    Get all restaurants with info rname, category
// @route   GET /restaurants
// @acess   Public
exports.getRestaurants = async (req, response) => {
  const getRestaurantsQuery =
    `SELECT rname, 
    ARRAY_AGG (DISTINCT cat) as categories
    FROM Sells NATURAL JOIN Food
    GROUP BY rname`
  const rows = await db.query(getRestaurantsQuery, async (err, result) => {
    if (err) {
      console.error(err.stack);
      response.status(404).json(`Failed to get restaurants and categories.`);
    } else {
      console.log("Get restaurants result:", result.rows);
      response.status(200).json(result.rows)
    }
  })
}



// @desc    Get single restaurant and the food items, along with the amount available today
// @route   GET /restaurant/:rname/:start/:end
// @acess   Public
exports.getRestaurant = async (req, response) => {
  //const rname = req.params.rname
  //start and end refer to 10am and 10pm on the day the request is made
  const { rname, start, end } = req.params
  console.log("PARAMS", req.params)

  const getFoodCategoriesQuery = `SELECT ARRAY_AGG(DISTINCT cat) FROM Food F WHERE F.fname = S.fname`
  const getRestaurantFoodQuery =
    `SELECT *, flimit - COALESCE(
      (SELECT SUM(C.quantity) AS qtysoldtoday
        FROM (
          SELECT * FROM Orders O
          WHERE (O.odatetime >= ${start} AND O.odatetime <= ${end}) 
          AND (O.status = 1 OR O.status = 2)) AS O
        JOIN Consists C ON O.oid = C.oid
        GROUP BY C.fname, O.rname
        HAVING S.fname = C.fname
        AND S.rname = O.rname), 0) as qtylefttoday, (${getFoodCategoriesQuery}) as categories
    FROM Sells S
    WHERE S.rname = ${rname};`
  const row = await db.query(getRestaurantFoodQuery, (err, result) => {
    if (err) {
      console.error("Error here:", err)
      response.status(404).json(`Failed to get restaurant and food items.`)
    } else {
      console.log("RESULT:", result)
      if (!result.rows) {
        response.status(404).json(`Failed to get restaurant and food items.`)
      } else {
        console.log(result.rows)
        response.status(200).json(result.rows)
      }
    }
  })
}

// @desc    Create new restaurant
// @route   POST /restaurant
// @acess   Private
exports.createRestaurant = async (req, response) => {
  const { rname, minamt, imgurl } = req.body
  const checkRestaurantExistsQuery = `SELECT * FROM Restaurants WHERE rname = ${rname}`
  const createRestaurantQuery = `INSERT INTO Restaurants (rname, minamt, imgurl) VALUES (${rname}, ${minamt}, ${imgurl}) returning *`

  const rows = await db.query(checkRestaurantExistsQuery, (err, result) => {
    if (err) {
      console.log(err.stack)
      response.status(500).json('Some error occurred')
    } else {
      if (result.rows.length !== 0) {
        //Restaurant already registered
        response.status(400).json('This restaurant is already registered.')
      } else {
        db.query(createRestaurantQuery, async (err2, result2) => {
          if (err2) {
            console.log("Error creating restaurant", err2.stack)
            response.status(500).json('Failed to create restaurant account.')
          } else {
            console.log("Result", result2[2].rows, result2[3].rows)
            if (result.rows) {
              console.log('Successfully created restaurant')
              response.status(200).json(`Created restaurant`)
            }
            else {
              response.status(404).json(result.rows)
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
    VALUES(${fname}, ${rname}, ${flimit}, ${price})
    returning *;
    COMMIT;`
  const rows = await db.query(addFoodToSellsQuery, (err, result) => {
    if (err) {
      console.log("ERROR:", err)
      if (err.constraint === 'sells_pkey') {
        response.status(400).json('Record already exists.')
      } else {
        response.status(500).json('Unable to add food. Please try again.')
      }
    } else {
      console.log("RESULT", result)
      if (result[3].rows) {
        console.log(result[3].rows)
        response.status(404).json(result[3].rows)
      } else {
        console.log('Failed to add new record in sells')
        response.status(400).json(`Failed to add new record in sells`)
      }
    }
  });
}

const groupBy = key => array =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});


// @desc    View all orders made to restaurant
// @route   GET /restaurants/orders/rname
// @acess   Private
exports.viewNewOrders = async (req, response) => {
  const { rname } = req.body
  const viewNewOrdersQuery = `SELECT O.oid, O.status, C.fname, C.quantity
  FROM Orders O NATURAL JOIN Consists C
  WHERE O.rname = ${rname};`

  db.query(viewNewOrdersQuery, (err, result) => {
    if (err) {
      console.log(err.stack)
      response.status(500).json('Unable to view orders.')
    } else {
      console.log(result.rows)
      const groupByOid = groupBy("oid")
      const data = groupByOid(result.rows)
      response.status(200).json(data)
    }
  })
}
