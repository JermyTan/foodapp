const db = require('../db')

// @desc    Get all restaurants with info rname, category
// @route   GET /restaurants
// @acess   Public
exports.getRestaurants = async (req, response) => {
  // const getRating = 'SELECT AVG(rating)'
  const getCategoriesQuery =
    `SELECT DISTINCT cat FROM food f NATURAL JOIN sells s
  WHERE s.rname = $1`

  const getRatingQuery = ``

  const data = { restaurant: [] }

  const rows = await db.query(
    "SELECT DISTINCT rname FROM restaurants",
    async (err, result) => {
      if (err) {
        console.error(err.stack);
        throw err;
      } else {
        if (!result.rows[0]) { // case when no restaurants retrieved
          response.status(404).json({
            success: false,
            msg: `Failed to get all restaurants. There could be no restaurants yet.`
          });
        } else {
          console.log(result.rows)
          const restCatPromises = await result.rows.map(async rnameJson => {
              const restName = rnameJson.rname
              // short form
              return await db.query(getCategoriesQuery, [restName])

              // long form
              // return await db.query(getCategoriesQuery, [restName], (err, result2) => {
              //   if (err) {
              //     console.error(err.stack);
              //     response.status(404).json({
              //       success: false,
              //       msg: `Failed to get restaurant categories for ` + restName
              //     });

              //   } else {
              //     rnameJson.categories = result2.rows.map(catJson => catJson.cat)
              //     data.restaurant.push(rnameJson)
              //     console.log(`data is: ${JSON.stringify(data)}`)
              //     console.log(`rnameJson is: ${JSON.stringify(rnameJson)}`)
              //   }
              // })
              // return rnameJson
            })
          
          console.log(restCatPromises);
          const restCat = await Promise.all(restCatPromises)
          console.log(restCat)
          response.status(200).json(restCat)









          // for every restaurant
          // for (var i = 0; i < result.rows.length; i++) {
          //   const rinfo = {};
          //   rinfo.rname = result.rows[i].rname;
          //   rinfo.categories = [];

          //   let temp = async () => {
          //     await db.query(getCategoriesQuery, [rinfo.rname], (err, catresult) => {
          //       if (err) {
          //         console.error(err.stack);
          //         response.status(404).json({
          //           success: false,
          //           msg:
          //             `Failed to get restaurant categories for ` + rinfo.rname
          //         });
          //       } else {
          //         var catlist = catresult.rows;
          //         for (var c = 0; c < catlist.length; c++) {
          //           rinfo.categories.push(catlist[c].cat);
          //         }
          //         data.restaurants.push(rinfo);
          //         console.log(data);
          //       }
          //       console.log("hello", i);
          //     });
          //   };
          //   await temp();
          //   console.log("called temp", i);
          // }
          // console.log("final data: " + data);
          // response.status(200).json(data);      
        }
      }
    }
  );


  // const data = { restaurants: [] }
  // const rows = db.query('SELECT DISTINCT rname FROM restaurants', (err, result) => {
  //   if (err) {
  //     console.error(err.stack);
  //     throw err
  //   } else {
  //     if (!result.rows[0]) {
  //       response.status(404).json({ success: false, msg: `Failed to get all restaurants. There could be no restaurants yet.` })
  //     } else {
  //       // for every restaurant
  //       for (var i = 0; i < result.rows.length; i++) {
  //         const rinfo = {}
  //         rinfo.rname = result.rows[i].rname
  //         rinfo.categories = []
  //         const morerows = db.query(getCategoriesQuery, [rinfo.rname], function res(err, catresult) {
  //           if (err) {
  //             console.error(err.stack)
  //             response.status(404).json({ success: false, msg: `Failed to get restaurant categories for ` + rinfo.rname })
  //           } else {
  //             var catlist = catresult.rows
  //             for (var c = 0; c < catlist.length; c++) {
  //               rinfo.categories.push(catlist[c].cat)
  //             }
  //             data.restaurants.push(rinfo)
  //             console.log(data)
  //           }
  //         })
  //         if (i === result.rows.length - 1) {
  //           response.status(200).json(data)
  //         }
  //       }
  //       // console.log(data)
  //       // response.status(200).json(data)

  //     }

  //   }
  // })






  // var promise = db.query('SELECT DISTINCT rname FROM restaurants', async (err, result) => {
  //   if (err) {
  //     console.error(err.stack);
  //     throw err
  //   } else {
  //     if (!result.rows[0]) {
  //       response.status(404).json({ success: false, msg: `Failed to get all restaurants. There could be no restaurants yet.` })
  //     } else {
  //       // for every restaurant
  //       for (var i = 0; i < result.rows.length; i++) {
  //         const rinfo = {}
  //         rinfo.rname = result.rows[i].rname
  //         rinfo.categories = []

  //         db.query(getCategoriesQuery, [rinfo.rname], async function res(err, catresult) {
  //           if (err) {
  //             console.error(err.stack)
  //             response.status(404).json({ success: false, msg: `Failed to get restaurant categories for ` + rinfo.rname })
  //           } else {
  //             var catlist = catresult.rows
  //             for (var c = 0; c < catlist.length; c++) {
  //               rinfo.categories.push(catlist[c].cat)
  //             }
  //             data.restaurants.push(rinfo)
  //           }
  //         })
  //       }
  //       console.log(data)
  //     }
  //   }
  // })

  // response.status(200).json(data)
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
      response.status(500).json({ success: false, msg: 'Unable to view orders.' })
    } else {
      console.log(result.rows)
      const groupByOid = groupBy("oid")
      const data = groupByOid(result.rows)
      response.status(200).json(data)
    }
  })

}
