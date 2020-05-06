const db = require('../db')

// @desc    Get all restaurants with info rname, category
// @route   GET /restaurants
// @acess   Public
exports.getRestaurants = async (req, response) => {
  const getRestaurantsQuery =
    `SELECT R.rname, R.imgurl, R.minamt, ARRAY_AGG(DISTINCT cat) as categories
    FROM Restaurants R JOIN Sells S ON (R.rname = S.rname) NATURAL JOIN Food
    GROUP BY R.rname`
  db.query(getRestaurantsQuery, async (err, result) => {
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
// @route   GET /restaurant/:rname?start=:start&end=:end 
// @acess   Public
exports.getRestaurant = async (req, response) => {
  //const rname = req.params.rname
  //start and end refer to 10am and 10pm on the day the request is made
  let rname = req.params.rname
  let { start, end } = req.query

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
    WHERE S.rname = ${rname}
    ORDER BY S.fname;`
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
// @route   POST /restaurant/:rname
// @acess   Private
exports.addFoodToSells = async (req, response) => {
  const { name, price, category, limit, imgurl } = req.body
  const rname = req.params.rname
  const addFoodToSellsQuery =
    `BEGIN;
    SET CONSTRAINTS ALL DEFERRED;
    INSERT INTO Food
    SELECT * FROM 
    (SELECT ${name}, ${category}) AS tmp 
    WHERE NOT EXISTS (SELECT fname FROM Food WHERE fname = ${name})
    LIMIT 1
    returning *;

    INSERT INTO Sells (fname, rname, flimit, price, imgurl)
    VALUES(${name}, ${rname}, ${limit}, ${price}, ${imgurl})
    returning *;
    COMMIT;`
  const rows = await db.query(addFoodToSellsQuery, (err, result) => {
    if (err) {
      console.log("ERROR:", err)
      if (err.constraint === 'sells_pkey') {
        response.status(400).json('Record already exists.')
      } else {
        response.status(400).json('Unable to add food. Please try again.')
      }
    } else {
      console.log("RESULT", result)
      if (result[3].rows) {
        console.log(result[3].rows)
        response.status(200).json(result[3].rows)
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
  const viewNewOrdersQuery = `SELECT O.oid, O.status, C.fname, C.quantity, C.itemprice
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

// @desc    Get staff menu
// @route   GET /restaurants/:rname/menu
// @acess   Private
exports.getStaffMenu = async (req, response) => {
  let rname = req.params.rname
  const getMenuQuery = `SELECT *
    FROM Sells S NATURAL JOIN Food
    WHERE S.rname = ${rname}
    ORDER BY S.fname
    ;`

  db.query(getMenuQuery, (err, result) => {
    if (err) {
      console.log(err.stack)
      response.status(404).json('Unable to view orders.')
    } else {
      console.log(result.rows)
      //data processing
      let menuData = [];
      result.rows.forEach(item => {
        let menuItem = {};
        menuItem.name = item.fname
        menuItem.price = parseFloat(item.price)
        menuItem.limit = parseInt(item.flimit)
        menuItem.imgurl = item.imgurl
        menuItem.category = item.cat
        menuData.push(menuItem)
      })

      db.query(`SELECT minamt FROM Restaurants WHERE rname = ${rname}`, (err, result2) => {
        if (err) {
          console.log(`Error occured retrieving min amt from ${rname}:`)
          response.status(200).json({ msg: `Error occured retrieving min amt from ${rname}:` });
        } else {
          console.log("Get min order amt:", result2.rows)
          let minamt = result2.rows[0].minamt
          response.status(200).json({ menu: menuData, minamt: minamt });
        }
      })
    }
  })
}

// @desc    Update food daily limit/food price for a restuarant's menu
// @route   PATCH /restaurant/rname
// @acess   Private
exports.updateMenu = async (req, response) => {
  let rname = req.params.rname
  let foodLimitPrice = req.body.foodLimitPrice
  let restMinAmt = req.body.minamt
  //const updateMenuItemQuery = `UPDATE Sells SET flimit = $1, price = $2, imgurl = $3 WHERE rname = $4 AND fname = $5 returning *`
  const updateMinAmtQuery = `UPDATE Restaurants SET minamt = ${restMinAmt} WHERE rname = ${rname} returning *`

  let errorFlag = false;
  let errorList = [];

  db.query(updateMinAmtQuery, async (err, result) => {
    if (err) {
      console.log("Error updating min amount", err.stack)
      response.status(400).json({ msg: `Unable to update min amt for ${rname}` })
    } else {
      for (var i = 0; i < foodLimitPrice.length; i += 1) {
        var fooditem = foodLimitPrice[i]
        console.log("food item:", fooditem)

        db.query(`    
        UPDATE Sells SET flimit = ${fooditem.flimit}, price = ${fooditem.price}, imgurl = ${fooditem.imgurl}
         WHERE rname = ${rname} AND fname = ${fooditem.fname} returning *`, (err2, result2) => {
          if (err2) {
            errorFlag = true;
            console.log("Some error occured for editing details for", fooditem.fname)
            console.log(err2.stack)
            errorList.push(fooditem.fname)
          } else {
            console.log("Updated item details. New datails are:")
            console.log(result2.rows)
          }
        })
      }
      if (errorFlag) {
        response.status(400).json({ msg: `Unable to update details for the following:`, errors: errorList })
      } else {
        response.status(200).json({ msg: "Successfully saved changes for items" })
      }
    }

  })

}

// @desc    Deletes an item from the menu
// @route   DELETE /restaurant/rname
// @acess   Private
exports.deleteMenuItem = async (req, response) => {
  let rname = req.params.rname
  let fname = req.body.fname
  console.log("fname", fname)
  const deleteMenuItemQuery = `DELETE FROM Sells WHERE rname = ${rname} AND fname = ${fname}`

  db.query(deleteMenuItemQuery, (err, result) => {
    if (err) {
      console.log("Error:", err.stack)
      response.status(400).json({ msg: `Failed to delete ${fname} from menu of ${rname}` })
    } else {
      console.log(result)
      response.status(200).json({ msg: `Successfully deleted ${fname} from menu of ${rname}` })
    }
  })

}


// @desc    Gets the reviews of a restaurant
// @route   GET /restaurant/rname/reviews
// @acess   Private
exports.getRestaurantReviews = async (req, response) => {
  let rname = req.params.rname
  const getReviewsQuery = `SELECT review, reviewdatetime, name
  FROM Reviews NATURAL JOIN Orders O JOIN Users U ON (O.cid = U.id)
  WHERE O.rname = ${rname}`

  db.query(getReviewsQuery, (err, result) => {
    if (err) {
      console.log("Error:", err.stack)
      response.status(400).json({ msg: `Failed to retrieve reviews for ${rname}` })
    } else {
      console.log(result.rows)
      response.status(200).json(result.rows)
    }
  })
}


// @desc    Get all restaurants with info rname, category
// @route   GET /restaurants
// @acess   Public
exports.getRestaurants = async (req, response) => {
  const getRestaurantsQuery =
    `SELECT R.rname, R.imgurl, R.minamt, ARRAY_AGG(DISTINCT cat) as categories
    FROM Restaurants R JOIN Sells S ON (R.rname = S.rname) NATURAL JOIN Food
    GROUP BY R.rname`
  db.query(getRestaurantsQuery, async (err, result) => {
    if (err) {
      console.error(err.stack);
      response.status(404).json(`Failed to get restaurants and categories.`);
    } else {
      console.log("Get restaurants result:", result.rows);
      response.status(200).json(result.rows)
    }
  })
}


exports.getSummaryInfo = async (req, response) => {
  let { starttime, endtime } = req.query
  let rname = req.params.rname

  const getRestaurantsQuery =
    `SELECT SUM(fprice), COUNT(DISTINCT oid)
    FROM Orders O
    WHERE O.status = 2
    AND O.rname = '${rname}'
    AND O.odatetime >= ${starttime}
    AND O.odatetime <= ${endtime}`
  db.query(getRestaurantsQuery, async (err, result) => {
    if (err) {
      console.error(err.stack);
      response.status(404).json(`Failed to get restaurants and categories.`);
    } else {
      console.log("Get restaurants result:", result.rows);
      response.status(200).json(result.rows)
    }
  })
}