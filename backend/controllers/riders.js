const db = require('../db')

// @desc    Get all riders id, bsalary, email, name, isft
// @route   GET /riders
// @access   Public
exports.getRiders = async (req, response) => {
  const rows = await db.query('SELECT * FROM rider_info', (err, result) => {
    if (err) {
      console.error(err.stack);
      throw err
    } else {
      if (!result.rows[0]) {
        response.status(404).json(`Failed to get all riders. There could be no rider created yet.`)
      } else {
        console.log('Successfully get all riders')
        response.status(200).json(result.rows)
      }
    }
  })

}

// @desc    Get a rider's permanent information
// @route   GET /riders/:id
// @access   Private
// TODO: WIP
exports.getRider = async (req, response) => {
  const rows = await db.query('SELECT * FROM rider_info WHERE id = $1', [req.params.id], (err, result) => {
    if (err) {
      console.error(err.stack);
    } else {
      if (!result.rows[0]) {
        response.status(404).json(`Failed to get rider.`)
      } else {
        console.log('Successfully get rider')
        response.status(200).json(result.rows)
      }
    }
  })
}

// @desc    Get a rider's past monthly or weekly salary (depending on ft or pt resp)
// @route   GET /riders/:id/salary
// @access   Private
exports.getRiderSalary = async (req, response) => {
  const id = req.params.id
  const getRiderSalaryQuery =
    `With CombinedSalTable AS (
    SELECT id, wkmthyr AS st_mth_wk, wk_sal AS sal
    FROM ptr_wk_sal
    UNION
    SELECT id, mthyr AS st_mth_wk, mth_sal AS sal
    FROM ftr_mth_sal)
    SELECT * 
    FROM CombinedSalTable
    WHERE id = '${id}';`
  const rows = await db.query(getRiderSalaryQuery, (err, result) => {
    if (err) {
      console.error(err.stack);
      response.status(404).json(`Failed to get rider salary.`)
    } else {
      if (!result.rows[0]) {
        response.status(404).json(`Failed to get rider salary.`)
      } else {
        console.log('Successfully get rider salary')
        response.status(200).json(result.rows)
      }
    }
  })
}

// @desc    Get a rider's schedule
// @route   GET /riders/:id/schedule
// @access   Private
exports.getRiderSchedule = async (req, response) => {
  const id = req.params.id
  const getRiderSalaryQuery =
    `SELECT sc_date, lower(timerange) AS st_time, upper(timerange) AS e_time
    FROM CombinedScheduleTable
    WHERE id = '${id}'
    ORDER BY sc_date;`
  const rows = await db.query(getRiderSalaryQuery, (err, result) => {
    if (err) {
      console.error(err.stack);
      response.status(404).json(`Failed to get rider schedule.`)
    } else {
      if (!result.rows[0]) {
        response.status(404).json(`Failed to get rider schedule.`)
      } else {
        console.log('Successfully get rider schedule')
        response.status(200).json(result.rows)
      }
    }
  })
}

// @desc    Create new rider with default base salary of $1000
// @route   POST /riders
// @access   Public
exports.createRider = async (req, response) => {
  const { email, name, isFT } = req.body
  const checkRiderEmailQuery = `SELECT * FROM Users WHERE email = '${email}'`
  var riderType = Boolean(parseInt(isFT)) ? `FTRiders` : `PTRiders`

  const createRiderQuery =
    `BEGIN;
    SET CONSTRAINTS ALL DEFERRED;
    INSERT INTO Users (email, name, role)
    VALUES('${email}','${name}', 2);
    
    INSERT INTO Riders (id, bsalary)
    VALUES((SELECT currval('users_id_seq')), 1000);

    INSERT INTO ${riderType} (id)
    VALUES((SELECT currval('users_id_seq')));

    COMMIT;`

  const rows = await db.query(checkRiderEmailQuery, async (err, result) => {
    console.log("Checking if email exists:", result.rows)
    if (err) {
      console.log("Error:", err.stack)
      response.status(500).json('Failed to create rider account - email check.')
    } else {
      if (result.rows.length !== 0) {
        //If email already exists in users table
        response.status(400).json('This email is already registered.')
      } else {
        const rows = await db.query(createRiderQuery, (err2, result2) => {
          if (err2) {
            console.error("Error creating rider", err2.stack)
            response.status(500).json('Failed to create rider account.')
          } else {
            console.log("New ID:", "user: ", result2[2].rows.id, "rider", result2[3].rows.id)
            if (result2[2].rows.id == result2[3].rows.id)
              response.status(200).json(`Successfully created user/rider.`)
            else {
              response.status(404).json(`Failed to create rider.`)
            }
          }
        })
      }
    }
  })
}

// @desc    Get all orders and related information made by a rider
// @route   GET /riders/:id/orders
// @acess   Private
exports.getRiderOrders = async (req, response) => {
  const rid = req.params.id

  //scalar subquery to obtain individual prices of items sold by a restaurant
  const getItemPriceQuery = `SELECT price FROM Sells S WHERE S.rname = O.rname AND S.fname = C.fname`

  const getRiderOrdersQuery =
    `SELECT json_build_object(
    'oid', oid,
    'fprice', fprice,
    'cname', (SELECT name FROM Users U WHERE U.id = O.cid),
    'location', location,
    'dfee', dfee,
    'rname', rname,
    'odatetime', odatetime,
    'status', status,
    'departdatetime1', departdatetime1,
    'departdatetime2', departdatetime2,
    'arrivedatetime', arrivedatetime,
    'deliverdatetime', deliverdatetime,
    'items', (SELECT array_agg(json_build_object('fname', fname, 'qty', quantity, 'price', itemprice))
              FROM Consists C
              WHERE C.oid = O.oid))
    AS order
    FROM Orders O
    WHERE O.rid = '${rid}'
    ORDER BY O.odatetime DESC
    ;`

  const rows = await db.query(getRiderOrdersQuery, async (err, result) => {
    if (err) {
      console.error(err.stack);
      response.status(404).json(`Failed to get rider's orders.`)
    } else {
      console.log(result.rows)
      let allRiderOrders = []
      result.rows.forEach(item => {
        allRiderOrders.push(item.order)
      })
      response.status(200).json(allRiderOrders)
    }
  })
}

// @desc    Get all processing orders (ie. status = 0) that fall in rider's work schedule
// @route   GET /riders/:id/eligible-p-orders
// @access   Private
exports.getProcessingOrders = async (req, response) => {
  const rid = req.params.id

  //scalar subquery to obtain individual prices of items sold by a restaurant
  const getItemPriceQuery = `SELECT price FROM Sells S WHERE S.rname = O.rname AND S.fname = C.fname`

  // Query to get all processing orders that fall in rider's work schedule
  const getProcessingOrdersQuery =
    `SELECT json_build_object(
    'oid', oid,
    'fprice', fprice,
    'location', location,
    'dfee', dfee,
    'rname', rname,
    'odatetime', odatetime,
    'status', status,
    'departdatetime1', departdatetime1,
    'departdatetime2', departdatetime2,
    'arrivedatetime', arrivedatetime,
    'deliverdatetime', deliverdatetime,
    'items', (SELECT array_agg(json_build_object('fname', fname, 'qty', quantity, 'price', (${getItemPriceQuery})))
              FROM Consists C
              WHERE C.oid = O.oid))
    AS order
    FROM Orders O
    WHERE EXISTS (
      SELECT 1
        FROM CombinedScheduleTable cst
        WHERE cst.id = '${rid}'
        AND cst.timerange @> EXTRACT(HOUR from to_timestamp(O.odatetime))::int4
        AND cst.sc_date = date_trunc('day', to_timestamp(O.odatetime))::date  
    )
    AND
    o.status = 0
    ORDER BY O.odatetime DESC;`

  const rows = await db.query(getProcessingOrdersQuery, async (err, result) => {
    if (err) {
      console.error(err.stack);
      response.status(404).json(`Failed to get eligible processing orders.`)
    } else {
      console.log(result.rows)
      let allEligibleProcessingOrders = []
      result.rows.forEach(item => {
        allEligibleProcessingOrders.push(item.order)
      })
      response.status(200).json(allEligibleProcessingOrders)
    }
  })
}

// @desc    Get all eligible riders for the order (ie. order falls in rider's work schedule)
// @route   GET /riders/order?time=:time
// @access   Private
exports.getEligibleRiders = async (req, response) => {
  const odatetime = req.query.time

  // Query to get all processing orders that fall in rider's work schedule
  const getEligibleRidersQuery =
    `SELECT cst.id
          FROM CombinedScheduleTable cst
          WHERE cst.timerange @> EXTRACT(HOUR from to_timestamp('${odatetime}'))::int4
          AND cst.sc_date = date_trunc('day', to_timestamp('${odatetime}'))::date
          ORDER BY cst.id ASC;`

  const rows = await db.query(getEligibleRidersQuery, async (err, result) => {
    if (err) {
      console.error(err.stack);
      response.status(404).json(`Failed to get eligible riders.`)
    } else {
      console.log(result.rows)
      let allEligibleRiders = []
      result.rows.forEach(item => {
        allEligibleRiders.push(item.id)
      })
      response.status(200).json({ 'rid': allEligibleRiders })
    }
  })
}

// @desc    Get summmary info for riders
// @route   GET /riders/:id/summary?stime=:stime&etime=:etime
// @access   Private
exports.getSummaryInfo = async (req, response) => {
  let id = req.params.id;
  let { stime, etime } = req.query;
  const getRidersSummary = 
  `WITH RiderOrders AS (
    SELECT count(*) AS num_order
    FROM Orders O
    WHERE O.rid = ${id}
    AND O.odatetime >= ${stime}
    AND O.odatetime <= ${etime}
    AND O.status = 2
  )
  , RiderSalary AS (
    With CombinedSalTable AS (
      SELECT id, EXTRACT(EPOCH from wkmthyr) AS epoch_date, wk_sal AS sal
      FROM ptr_wk_sal
      UNION
      SELECT id, EXTRACT(EPOCH from mthyr) AS epoch_date, mth_sal AS sal
      FROM ftr_mth_sal)
    SELECT SUM(sal) AS total_sal
    FROM CombinedSalTable
    WHERE id = ${id}
    AND epoch_date >= ${stime}
    AND epoch_date <= ${etime}
  )
  , RiderHours AS (
    SELECT SUM(upper(timerange) - lower(timerange)) AS total_hr
    FROM CombinedScheduleTable
    WHERE id = ${id}
    AND EXTRACT(EPOCH from sc_date) >= ${stime}
    AND EXTRACT(EPOCH from sc_date) <= ${etime}
  )
  SELECT
    total_sal,
    num_order,
    total_hr
      FROM RiderOrders, RiderSalary, RiderHours;`;
  db.query(getRidersSummary, async (err, result) => {
    if (err) {
      console.error(err.stack);
      response.status(404).json(`Failed to get rider's summary.`);
    } else {
      console.log("Get rider summary result:", result.rows[0]);
      response.status(200).json(result.rows[0]);
    }
  });
};