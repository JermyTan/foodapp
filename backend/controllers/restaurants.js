const db = require("../db");
const getUnixTime = require("date-fns/getUnixTime")
const addHours = require("date-fns/addHours")
const startOfToday = require("date-fns/startOfToday")

// @desc    Get all restaurants with info rname, category
// @route   GET /api/restaurants
// @acess   Public
exports.getRestaurants = async (req, response) => {
  //TODO: Fetch promotion information after implementation
  const getRestaurantsQuery = `SELECT R.rname, R.imgurl, R.minamt, ARRAY_AGG(DISTINCT cat) as categories
    FROM Restaurants R JOIN Sells S ON (R.rname = S.rname)
    GROUP BY R.rname`;
  db.query(getRestaurantsQuery, async (err, result) => {
    if (err) {
      console.error(err.stack);
      response.status(404).json(`Failed to get restaurants and categories.`);
    } else {
      console.log("Get restaurants result:", result.rows);
      response.status(200).json(result.rows);
    }
  });
};

// @desc    Get single restaurant and the food items, along with the amount available today
// @route   GET api/restaurant
// @acess   Public
exports.getRestaurant = async (req, response) => {
  //start and end refer to 10am and 10pm on the day the request is made
  let rname = req.params.rname;
  let start = getUnixTime(addHours(startOfToday(), 10));
  let end = getUnixTime(addHours(startOfToday(), 22));

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
        AND S.rname = O.rname), 0) as qtylefttoday
    FROM Sells S
    WHERE S.rname = '${rname}'
    AND S.avail = true
    ORDER BY S.fname;`;

  db.query(getRestaurantFoodQuery, (err, result) => {
    if (err) {
      console.error("Error here:", err);
      response.status(404).json(`Failed to get restaurant and food items.`);
    } else {
      console.log("Restaurant and food items data:", result.rows);
      if (!result.rows) {
        response.status(404).json(`Failed to get restaurant and food items, or no restaurants exist.`);
      } else {
        console.log(result.rows);
        response.status(200).json(result.rows);
      }
    }
  });
};

// @desc    Create new restaurant
// @route   POST /restaurant
// @acess   Private
exports.createRestaurant = async (req, response) => {
  const { rname, minamt, imgurl } = req.body;
  const checkRestaurantExistsQuery = `SELECT * FROM Restaurants WHERE rname = ${rname}`;
  const createRestaurantQuery = `INSERT INTO Restaurants (rname, minamt, imgurl) VALUES (${rname}, ${minamt}, ${imgurl}) returning *`;

  const rows = await db.query(checkRestaurantExistsQuery, (err, result) => {
    if (err) {
      console.log(err.stack);
      response.status(500).json("Some error occurred");
    } else {
      if (result.rows.length !== 0) {
        //Restaurant already registered
        response.status(400).json("This restaurant is already registered.");
      } else {
        db.query(createRestaurantQuery, async (err2, result2) => {
          if (err2) {
            console.log("Error creating restaurant", err2.stack);
            response.status(500).json("Failed to create restaurant account.");
          } else {
            console.log("Result", result2[2].rows, result2[3].rows);
            if (result.rows) {
              console.log("Successfully created restaurant");
              response.status(200).json(`Created restaurant`);
            } else {
              response.status(404).json(result.rows);
            }
          }
        });
      }
    }
  });
};

getSellsErrorMessage = (err) => {
  let msg = "";
  switch (err.constraint) {
    case "unique_fname_rname":
      msg = "Record with same food name already exists.";
      break;
    case "sells_flimit_check":
      msg = "Food daily limit must be more than or equal to 0.";
      break;
    case "sells_price_check":
      msg = "Food price must be more than or equal to 0.";
      break;
    case "restaurants_minamt_check":
      msg = "Restaurant minamt must be more than or equal to 0.";
      break;
    default:
      msg = "Some error occurred while adding menu item.";
      break;
  }
  return msg;
}


// @desc    Add new food to sells table
// @route   POST /restaurant/:rname
// @acess   Private
exports.addFoodToSells = async (req, response) => {
  const { name, price, category, limit, imgurl } = req.body;
  const rname = req.params.rname;
  const addFoodToSellsQuery =
    `INSERT INTO Sells (fname, rname, flimit, price, imgurl, category)
    VALUES('${name}', '${rname}', ${limit}, ${price}, '${imgurl}', '${category}')
    RETURNING *;`;
  console.log("body:", req.body, "params:", req.params)

  db.query(addFoodToSellsQuery, (err, result) => {
    if (err) {
      console.log("Error adding item into menu:", err.constraint);
      console.log(err.constraint);
      if (err.constraint) {
        let msg = getSellsErrorMessage(err)
        response.status(400).json({ success: false, msg: msg });
      } else {
        response.status(400).json({ success: false, msg: "Unable to add food. Please try again." });
      }
    } else {
      console.log("Insert new record into sells:", result);
      if (result.rows[0]) {
        console.log("Added new item:", result.rows[0]);
        response.status(200).json({ success: true, msg: "Successfully added new item", data: result.rows[0] });
      } else {
        console.log("Failed to add new record in sells");
        response.status(400).json({ success: false, msg: "Failed to add new item" });
      }
    }
  });
};

const groupBy = (key) => (array) =>
  array.reduce((objectsByKeyValue, obj) => {
    const value = obj[key];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
    return objectsByKeyValue;
  }, {});

// @desc    View all orders made to restaurant
// @route   GET /restaurants/orders/rname
// @acess   Private
exports.viewNewOrders = async (req, response) => {
  const { rname } = req.body;
  const viewNewOrdersQuery = `SELECT O.oid, O.status, C.fname, C.quantity, C.itemprice
  FROM Orders O NATURAL JOIN Consists C
  WHERE O.rname = ${rname};`;

  db.query(viewNewOrdersQuery, (err, result) => {
    if (err) {
      console.log(err.stack);
      response.status(500).json("Unable to view orders.");
    } else {
      console.log(result.rows);
      const groupByOid = groupBy("oid");
      const data = groupByOid(result.rows);
      response.status(200).json(data);
    }
  });
};

// @desc    Get staff menu
// @route   GET /restaurants/:rname/menu
// @acess   Private
exports.getStaffMenu = async (req, response) => {
  let rname = req.params.rname;
  const getMenuQuery =
    `SELECT json_build_object (
      'minamt', (SELECT minamt FROM Restaurants WHERE rname = '${rname}'),
      'menu', (SELECT json_agg(rows) as menu
      FROM (
        SELECT fname as name, flimit as limit, price, imgurl, category, fid, avail
        FROM Sells S
        WHERE S.rname = '${rname}'
        ORDER BY (S.fname)
      ) as rows)
    ) as staffMenu`

  db.query(getMenuQuery, (err, result) => {
    if (err) {
      console.log(err.stack);
      response.status(404).json("Unable to view staff menu.");
    } else {
      let staffMenu = result.rows[0].staffmenu
      console.log("Restaurant information retreived:", staffMenu);
      response.status(200).json({ menu: staffMenu.menu, minamt: staffMenu.minamt })
    }
  });
};

// @desc    Update food daily limit/food price for a restuarant's menu
// @route   PATCH /restaurant/rname
// @acess   Private
exports.updateMenu = async (req, response) => {
  let rname = req.params.rname;
  let updatedMenu = req.body.updatedMenu;
  let restMinAmt = req.body.minamt;

  let updateMenuQuery =
    `BEGIN;
  UPDATE Restaurants SET minamt = ${restMinAmt} WHERE rname = '${rname}';`

  console.log(updatedMenu)
  //append queries to ensure that menu updates for individual items are all made together
  updatedMenu.forEach((fooditem) => {
    updateMenuQuery +=
      `UPDATE Sells
      SET
      fname = '${fooditem.name}',
      category = '${fooditem.category}',
      flimit = ${fooditem.limit},
      price = ${fooditem.price},
      imgurl = '${fooditem.imgurl}',
      avail = ${fooditem.avail}
      WHERE rname = '${rname}'
      AND fid = '${fooditem.fid}'
      RETURNING *;`
  })

  updateMenuQuery += `COMMIT;`

  db.query(updateMenuQuery, async (err, result) => {
    if (err) {
      console.log("Error updating menu:", err)
      let msg = getSellsErrorMessage(err)
      response.status(400).json({ msg: msg })
    } else {
      response.status(200).json({ msg: "Successfully updated menu items and min amount" })
    }
  })
};

// @desc    Deletes an item from the menu
// @route   DELETE /restaurant/rname
// @acess   Private
exports.deleteMenuItem = async (req, response) => {
  let rname = req.params.rname;
  let fname = req.body.fname;
  console.log("fname", fname);
  const deleteMenuItemQuery = `DELETE FROM Sells WHERE rname = ${rname} AND fname = ${fname}`;

  db.query(deleteMenuItemQuery, (err, result) => {
    if (err) {
      console.log("Error:", err.stack);
      response
        .status(400)
        .json({ msg: `Failed to delete ${fname} from menu of ${rname}` });
    } else {
      console.log(result);
      response
        .status(200)
        .json({ msg: `Successfully deleted ${fname} from menu of ${rname}` });
    }
  });
};

// @desc    Gets the reviews of a restaurant
// @route   GET /restaurant/rname/reviews
// @acess   Private
exports.getRestaurantReviews = async (req, response) => {
  let rname = req.params.rname;
  const getReviewsQuery = `SELECT review, reviewdatetime, name
  FROM Reviews NATURAL JOIN Orders O JOIN Users U ON (O.cid = U.id)
  WHERE O.rname = ${rname}`;

  db.query(getReviewsQuery, (err, result) => {
    if (err) {
      console.log("Error:", err.stack);
      response
        .status(400)
        .json({ msg: `Failed to retrieve reviews for ${rname}` });
    } else {
      console.log(result.rows);
      response.status(200).json(result.rows);
    }
  });
};

// @desc    Get all restaurants with info rname, category
// @route   GET /restaurants
// @acess   Public
exports.getRestaurants = async (req, response) => {
  const getRestaurantsQuery = `SELECT R.rname, R.imgurl, R.minamt, ARRAY_AGG(DISTINCT category) as categories
    FROM Restaurants R JOIN Sells S ON (R.rname = S.rname)
    GROUP BY R.rname`;
  db.query(getRestaurantsQuery, async (err, result) => {
    if (err) {
      console.error(err.stack);
      response.status(404).json(`Failed to get restaurants and categories.`);
    } else {
      console.log("Get restaurants result:", result.rows);
      response.status(200).json(result.rows);
    }
  });
};

exports.getSummaryInfo = async (req, response) => {
  let { starttime, endtime } = req.query;
  let rname = req.params.rname;

  const getRestaurantsSummary =
    `WITH SO AS (
    SELECT *
    FROM Orders O
    WHERE O.status = 2
    AND O.rname = '${rname}'
    AND O.odatetime >= ${starttime}
    AND O.odatetime <= ${endtime}
    )
    SELECT json_build_object (
      'totalrevenue', COALESCE((SELECT SUM(fprice) FROM SO), 0),
      'ordercount', (SELECT COUNT(DISTINCT oid) FROM SO),
      'popularitems', (SELECT json_agg(rows) as popularItems 
        FROM (
        SELECT fname, SUM(quantity)
        FROM Consists C
        WHERE C.oid IN (SELECT oid FROM SO)
        GROUP BY fname
        ORDER BY SUM (quantity) DESC
        LIMIT 5
        ) 
        AS rows)
    ) as rsummary`;
  db.query(getRestaurantsSummary, async (err, result) => {
    if (err) {
      console.error(err.stack);
      response.status(404).json(`Failed to get restaurants and categories.`);
    } else {
      console.log("Get restaurants result:", result.rows[0]);
      response.status(200).json(result.rows[0]);
    }
  });
};
