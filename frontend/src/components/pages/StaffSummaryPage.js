import React, { useState, useEffect, useContext } from "react";
import {
  Menu,
  Container,
  Statistic,
  Icon,
  Segment,
  Loader,
} from "semantic-ui-react";
import { MonthRangeInput } from "semantic-ui-calendar-react";
import {
  parse,
  isBefore,
  format,
  getUnixTime,
  startOfMonth,
  endOfMonth,
  differenceInCalendarMonths,
  differenceInCalendarWeeks,
} from "date-fns";
import "styles/AllRestaurants.scss";
import Axios from "axios";
import UserContext from "utils/UserContext";

const restaurant = {
  name: "Toast Box",
  food1: {
    name: "Curry Chicken with Rice",
    orders: 193,
  },
  food2: {
    name: "Mee Siam",
    orders: 183,
  },
  food3: {
    name: "Lu Rou Fan",
    orders: 129,
  },
  food4: {
    name: "Peanut Butter Thick Toast",
    orders: 110,
  },
  food5: {
    name: "Ice Milo",
    orders: 101,
  },
};

const promoData = [
  "10% off on all food (14/2/2020 - 14/3/2020)",
  "Free delivery (19/2/2020 - 31/3/2020)",
  "5% off on all food (15/3/2020 - 15/4/2020)",
];

function StaffSummaryPage() {
  const [selectedMonths, setSelectedMonths] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [period, setPeriod] = useState([]);
  const [summaryInfo, setSummaryInfo] = useState({});
  const { uid } = useContext(UserContext);
  const [statisticsLoading, setStatisticsLoading] = useState(false);
  const [nameLoading, setNameLoading] = useState(true);

  useEffect(() => {
    Axios.get(`http://localhost:5000/api/staffs/${uid}`)
      .then((response) => {
        console.log(response);
        let { rname } = response.data;
        setRestaurantName(rname);
        setNameLoading(false);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  const fetchSummaryInfo = (monthA, monthB) => {
    setStatisticsLoading(true);
    console.log("Fetch some info!");
    console.log(monthA, monthB);
    let starttime = getUnixTime(startOfMonth(monthA));
    let endtime = getUnixTime(endOfMonth(monthB));
    console.log("Start unix time", starttime);
    const url = `http://localhost:5000/api/restaurants/${restaurantName}/summary?starttime=${starttime}&endtime=${endtime}`;
    Axios.get(url)
      .then((response) => {
        let { rsummary } = response.data;
        console.log(rsummary);
        setSummaryInfo(rsummary);
        setPeriod([monthA, monthB]);
        setStatisticsLoading(false);
      })
      .catch((error) => {
        console.log("Error", error);
        setStatisticsLoading(false);
      });
  };

  const onMonthInput = (range) => {
    setSelectedMonths(range);
    let period = range.split(" - ");
    console.log(period);
    if (period.length < 2 || period[0] === "" || period[1] === "") {
      console.log("period invalid");
      return [];
    }
    let monthA = parse(period[0], "MM/yyyy", new Date());
    let monthB = parse(period[1], "MM/yyyy", new Date());

    if (isBefore(monthB, monthA)) {
      [monthA, monthB] = [monthB, monthA];
    }

    fetchSummaryInfo(monthA, monthB);
  };

  const getTotalRevenue = () => {
    return summaryInfo.totalrevenue;
  };

  const getAvgMonthlyRevenue = () => {
    let months = differenceInCalendarMonths(period[1], period[0]);
    console.log(months);
    return getTotalRevenue() / months;
  };

  const getAvgWeeklyRevenue = () => {
    let weeks = differenceInCalendarWeeks(period[1], period[0]);
    return getTotalRevenue() / weeks;
  };

  const getTotalOrders = () => {
    return summaryInfo.ordercount;
  };

  const getAvgMonthlyOrders = () => {
    let months = differenceInCalendarMonths(period[1], period[0]);
    return getTotalOrders() / months;
  };

  const getAvgWeeklyOrders = () => {
    let weeks = differenceInCalendarWeeks(period[1], period[0]);
    return getTotalOrders() / weeks;
  };

  return (
    <main className="staff-summary-page">
      <Menu size="huge" style={{ opacity: 0 }}></Menu>
      <Container>
        <h1>{nameLoading ? <Loader inline active /> : restaurantName}</h1>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <h2 style={{ marginInlineEnd: "1rem" }}>Summary for</h2>
          <MonthRangeInput
            className="rounded-input"
            clearable
            placeholder="Select month(s)"
            popupPosition="bottom center"
            onChange={(event, data) => {
              onMonthInput(data.value);
            }}
            value={selectedMonths}
            dateFormat="MM/YYYY"
            closable
            maxDate={new Date()}
            disabled={nameLoading}
            loading={nameLoading}
          />
        </div>

        {period.length === 2 ? (
          <>
            <h1>
              Period{" "}
              <font color="#3445c3">{format(period[0], "MMM yyyy")}</font> to{" "}
              <font color="#3445c3">{format(period[1], "MMM yyyy")}</font>
            </h1>

            <Statistic.Group
              widths="3"
              size="large"
              style={{ margin: "1em 0 1em 0" }}
            >
              <Statistic>
                <Statistic.Label>Total revenue</Statistic.Label>
                <Statistic.Value>
                  <Icon name="dollar" />
                  {getTotalRevenue().toFixed(2)}
                </Statistic.Value>
              </Statistic>

              <Statistic>
                <Statistic.Label>Average revenue per month</Statistic.Label>
                <Statistic.Value>
                  <Icon name="dollar" />
                  {getAvgMonthlyRevenue().toFixed(2)}
                </Statistic.Value>
              </Statistic>

              <Statistic>
                <Statistic.Label>Average revenue per week</Statistic.Label>
                <Statistic.Value>
                  <Icon name="dollar" />
                  {getAvgWeeklyRevenue().toFixed(2)}
                </Statistic.Value>
              </Statistic>
            </Statistic.Group>

            <Statistic.Group
              widths="3"
              size="large"
              style={{ margin: "1em 0 1em 0" }}
            >
              <Statistic>
                <Statistic.Label>Total orders</Statistic.Label>
                <Statistic.Value>
                  <Icon name="food" />
                  {getTotalOrders().toFixed(0)}
                </Statistic.Value>
              </Statistic>

              <Statistic>
                <Statistic.Label>Average orders per month</Statistic.Label>
                <Statistic.Value>
                  <Icon name="food" />
                  {getAvgMonthlyOrders().toFixed(2)}
                </Statistic.Value>
              </Statistic>

              <Statistic>
                <Statistic.Label>Average orders per week</Statistic.Label>
                <Statistic.Value>
                  <Icon name="food" />
                  {getAvgWeeklyOrders().toFixed(2)}
                </Statistic.Value>
              </Statistic>
            </Statistic.Group>

            <Statistic.Group
              widths="2"
              size="large"
              style={{ margin: "1em 0 1em 0" }}
            >
              <Statistic color="violet">
                <Statistic.Label>Total ratings</Statistic.Label>
                <Statistic.Value>
                  <Icon name="star" />
                  67
                </Statistic.Value>
              </Statistic>

              <Statistic color="violet">
                <Statistic.Label>Average ratings</Statistic.Label>
                <Statistic.Value>
                  <Icon name="star" />
                  4.6
                </Statistic.Value>
              </Statistic>
            </Statistic.Group>
            <br />
            <br />
            <br />
            <Statistic.Group widths="1" size="huge">
              <Statistic>
                <Statistic.Label>Top</Statistic.Label>
                <Statistic.Value text>5 Food</Statistic.Value>
              </Statistic>
            </Statistic.Group>

            <Statistic.Group widths="5" size="tiny">
              <Statistic>
                <Statistic.Value>1st</Statistic.Value>
                <Statistic.Value text>
                  <font color="#643cc6">{restaurant.food1.name}</font>
                </Statistic.Value>
                <Statistic.Label>
                  {restaurant.food1.orders} Orders
                </Statistic.Label>
              </Statistic>

              <Statistic>
                <Statistic.Value>2nd</Statistic.Value>
                <Statistic.Value text>
                  <font color="#643cc6">{restaurant.food2.name}</font>
                </Statistic.Value>
                <Statistic.Label>
                  {restaurant.food2.orders} Orders
                </Statistic.Label>
              </Statistic>

              <Statistic>
                <Statistic.Value>3rd</Statistic.Value>
                <Statistic.Value text>
                  <font color="#643cc6">{restaurant.food3.name}</font>
                </Statistic.Value>
                <Statistic.Label>
                  {restaurant.food3.orders} Orders
                </Statistic.Label>
              </Statistic>

              <Statistic>
                <Statistic.Value>4th</Statistic.Value>
                <Statistic.Value text>
                  <font color="#643cc6">{restaurant.food4.name}</font>
                </Statistic.Value>
                <Statistic.Label>
                  {restaurant.food4.orders} Orders
                </Statistic.Label>
              </Statistic>

              <Statistic>
                <Statistic.Value>5th</Statistic.Value>
                <Statistic.Value text>
                  <font color="#643cc6">{restaurant.food5.name}</font>
                </Statistic.Value>
                <Statistic.Label>
                  {restaurant.food5.orders} Orders
                </Statistic.Label>
              </Statistic>
            </Statistic.Group>
            <br />
            <br />
            <br />
          </>
        ) : (
            <Segment
              size="massive"
              basic
              placeholder
              content="You have not selected a period"
              textAlign="center"
              loading={statisticsLoading}
            />
          )}
        <h1>Promotional Campaigns</h1>
        {promoData.map((promo, index) => {
          return (
            <div key={index}>
              <h2>{promo}</h2>

              <Statistic.Group
                widths="3"
                size="small"
                style={{ margin: "1em 0 1em 0" }}
              >
                <Statistic>
                  <Statistic.Value>30</Statistic.Value>
                  <Statistic.Label>Days</Statistic.Label>
                </Statistic>

                <Statistic>
                  <Statistic.Label>Total orders</Statistic.Label>
                  <Statistic.Value>
                    <Icon name="food" />
                    3432
                  </Statistic.Value>
                </Statistic>

                <Statistic>
                  <Statistic.Label>Average orders</Statistic.Label>
                  <Statistic.Value>
                    <Icon name="food" />
                    34
                  </Statistic.Value>
                </Statistic>
              </Statistic.Group>
            </div>
          );
        })}
      </Container>
      <br />
      <br />
      <br />
    </main>
  );
}

export default StaffSummaryPage;
