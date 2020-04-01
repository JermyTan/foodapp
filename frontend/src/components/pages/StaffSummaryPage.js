import React, { useState } from "react";
import { Menu, Container, Statistic, Icon } from "semantic-ui-react";
import { MonthRangeInput } from "semantic-ui-calendar-react";
import { parse, isBefore, format } from "date-fns";
import "styles/AllRestaurants.scss";

const restaurant = {
  name: "Toast Box",
  food1: {
    name: "Curry Chicken with Rice",
    orders: 193
  },
  food2: {
    name: "Mee Siam",
    orders: 183
  },
  food3: {
    name: "Lu Rou Fan",
    orders: 129
  },
  food4: {
    name: "Peanut Butter Thick Toast",
    orders: 110
  },
  food5: {
    name: "Ice Milo",
    orders: 101
  }
};

function StaffSummaryPage() {
  const [selectedMonths, setSelectedMonths] = useState("");

  const getPeriod = selectedMonths => {
    let period = selectedMonths.split(" - ");
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

    return [monthA, monthB];
  };

  const period = getPeriod(selectedMonths);

  return (
    <main className="staff-summary-page">
      <Menu size="huge" style={{ opacity: 0 }}></Menu>
      <Container>
        <h1>{restaurant.name}</h1>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <h2 style={{ marginInlineEnd: "1rem" }}>Summary for</h2>
          <MonthRangeInput
            className="rounded-input"
            clearable
            placeholder="Select month(s)"
            popupPosition="bottom center"
            onChange={(event, data) => {
              setSelectedMonths(data.value);
            }}
            dateFormat="MM/YYYY"
            value={selectedMonths}
            closable
            maxDate={new Date()}
          />
        </div>

        {period.length > 0 && (
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
                  8342
                </Statistic.Value>
              </Statistic>

              <Statistic>
                <Statistic.Label>Average revenue per month</Statistic.Label>
                <Statistic.Value>
                  <Icon name="dollar" />
                  2424
                </Statistic.Value>
              </Statistic>

              <Statistic>
                <Statistic.Label>Average revenue per week</Statistic.Label>
                <Statistic.Value>
                  <Icon name="dollar" />
                  823
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
                  3432
                </Statistic.Value>
              </Statistic>

              <Statistic>
                <Statistic.Label>Average orders per month</Statistic.Label>
                <Statistic.Value>
                  <Icon name="food" />
                  34
                </Statistic.Value>
              </Statistic>

              <Statistic>
                <Statistic.Label>Average orders per week</Statistic.Label>
                <Statistic.Value>
                  <Icon name="food" />8
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
          </>
        )}
      </Container>
      <br />
      <br />
      <br />
    </main>
  );
}

export default StaffSummaryPage;
