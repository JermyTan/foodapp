import React, { useState, useEffect } from "react";
import { Menu, Container, Statistic, Icon, Button, Card } from "semantic-ui-react";
import { MonthRangeInput } from "semantic-ui-calendar-react";
import { parse, isBefore, format, set } from "date-fns";
import SummaryData from "components/managers/SummaryData";
import CustomerSummaryCard from "components/managers/CustomerSummaryCard";
import OrderSummaryCard from "components/managers/OrderSummaryCard";

function ManagerSummaryPage() {
  const [selectedMonths, setSelectedMonths] = useState("");
  const [orderSummary, setOrderSummary] = useState([]);
  const [orderSummaryFiltered, setOrderSummaryFiltered] = useState([]);
  const [customersData, setCustomers] = useState([]);
  const [ordersData, setOrders] = useState([]);
  const [ridersData, setRiders] = useState([]);
  const [customerOrderSummary, setCustomerOrder] = useState([]);

  const [viewCustomers, setViewCustomerOn] = useState(false);
  const [viewOrders, setViewOrderOn] = useState(false);
  const [viewRiders, setViewRiderOn] = useState(false);
  const [toggleCus, setToggleCus] = useState(true);
  const [toggleOr, setToggleOr] = useState(true);
  const [toggleRid, setToggleRid] = useState(true);

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
  SummaryData(setOrders, setCustomerOrder, setOrderSummaryFiltered, setOrderSummary);
  const profileImages = [
    "elliot.jpg",
    "helen.jpg",
    "jenny.jpg",
    "joe.jpg",
    "justen.jpg",
    "laura.jpg",
    "steve.jpg",
    "molly.png",
  ];

  return (
    <main className="manager-summary-page">
      <Menu size="huge" style={{ opacity: 0 }}></Menu>
      <Container>
        <div style={{ display: "flex" }}>
          <span style={{ display: "flex", flexWrap: "wrap" }}>
            <h2 style={{ marginInlineEnd: "1rem" }}>Summary for period</h2>
            <MonthRangeInput
              style={{ marginInlineEnd: "5rem" }}
              className="rounded-input"
              clearable
              placeholder="Select month(s)"
              popupPosition="bottom center"
              onChange={(event, data) => {
                setSelectedMonths(data.value)
              }}
              dateFormat="MM/YYYY"
              value={selectedMonths}
              closable />
          </span>
          <span>
            <Button.Group>
              <Button
                color="purple"
                onClick={() => {
                  setToggleCus(!toggleCus)
                  setViewCustomerOn(toggleCus)
                  setViewOrderOn(false)
                  setViewRiderOn(false)
                  setToggleRid(true)
                  setToggleOr(true)
                  setSelectedMonths("")
                }}>
                <Button.Content>View Customers</Button.Content>
              </Button>
              <Button
                color="purple"
                onClick={() => {
                  setToggleOr(!toggleOr)
                  setViewOrderOn(toggleOr)
                  setViewCustomerOn(false)
                  setViewRiderOn(false)
                  setToggleRid(true)
                  setToggleCus(true)
                  setSelectedMonths("")
                }}>
                <Button.Content>View Orders</Button.Content>
              </Button>
              <Button
                color="purple"
                onClick={() => {
                  setToggleRid(!toggleRid)
                  setViewRiderOn(toggleRid)
                  setViewCustomerOn(false)
                  setViewOrderOn(false)
                  setToggleCus(true)
                  setToggleOr(true)
                  setSelectedMonths("")
                }}>
                <Button.Content>View Riders</Button.Content>
              </Button>
            </Button.Group>
          </span>
        </div>

        {period.length > 0 && (!viewCustomers && !viewOrders && !viewRiders) ? (
          <>
            <h1>
              Period{" "}
              <font color="#3445c3">{format(period[0], "MMM yyyy")}</font> to{" "}
              <font color="#3445c3">{format(period[1], "MMM yyyy")}</font>
            </h1>

            <Statistic.Group
              widths="3"
              size="medium"
              style={{ margin: "1em 0 1em 0" }}
            >
              <Statistic>
                <Statistic.Label>Total New Customers</Statistic.Label>
                <Statistic.Value>
                  <Icon name="user" />
                  {(customerOrderSummary.filter(date =>
                    date.customerorder.joindate * 1000 >= new Date(period[0].toString()).getTime() &&
                    date.customerorder.joindate * 1000 <= new Date(period[1].toString()).getTime()
                  )).length
                  }
                </Statistic.Value>
              </Statistic>

              <Statistic>
                <Statistic.Label>Total New Orders</Statistic.Label>
                <Statistic.Value>
                  <Icon name="file alternate" />
                  {(ordersData.filter(date =>
                    date.odatetime * 1000 >= new Date(period[0].toString()).getTime() &&
                    date.odatetime * 1000 <= new Date(period[1].toString()).getTime()
                  )).length
                  }
                </Statistic.Value>
              </Statistic>

              <Statistic>
                <Statistic.Label>Total Cost of Orders</Statistic.Label>
                <Statistic.Value>
                  <Icon name="dollar" />
                  {(ordersData.filter(date =>
                    date.odatetime * 1000 >= new Date(period[0].toString()).getTime() &&
                    date.odatetime * 1000 <= new Date(period[1].toString()).getTime()
                  )).reduce((acc, curr) =>
                    (parseFloat(acc) + parseFloat(curr.fprice) + parseFloat(curr.dfee)).toFixed(2), 0)}
                </Statistic.Value>
              </Statistic>
            </Statistic.Group>
          </>
        ) : viewCustomers && period.length === 0 ? (
          <Container>
            <h1>Customer List</h1>
            <Card.Group>
              {customerOrderSummary.map((value, index) => {
                let image =
                  profileImages[Math.floor(Math.random() * profileImages.length)];
                return (
                  <CustomerSummaryCard
                    key={index}
                    id={value.customerorder.id}
                    name={value.customerorder.name}
                    joindate={value.customerorder.joindate}
                    email={value.customerorder.email}
                    numOrder={value.customerorder.numOrder}
                    totalCost={parseFloat(value.customerorder.totalCost).toFixed(2)}
                    image={image}
                  />
                )
              })}
            </Card.Group>
          </Container>
        ) : viewCustomers && period.length > 0 ? (
          <Container>
            <h1>Customer List</h1>
            <Card.Group>
              {customerOrderSummary.filter(date =>
                date.customerorder.joindate * 1000 >= new Date(period[0].toString()).getTime() &&
                date.customerorder.joindate * 1000 <= new Date(period[1].toString()).getTime()
              ).map((value, index) => {
                let image =
                  profileImages[Math.floor(Math.random() * profileImages.length)];
                return (
                  <CustomerSummaryCard
                    key={index}
                    id={value.customerorder.id}
                    name={value.customerorder.name}
                    joindate={value.customerorder.joindate}
                    email={value.customerorder.email}
                    numOrder={value.customerorder.numOrder}
                    totalCost={parseFloat(value.customerorder.totalCost).toFixed(2)}
                    image={image}
                  />
                )
              })}
            </Card.Group>
          </Container>
        ) : viewOrders && period.length === 0 ? (
          <Container>
            <h1>Order List</h1>
            <Card.Group>
              {ordersData.map((value, index) => {
                return (
                  <OrderSummaryCard
                    key={index}
                    oid={value.oid}
                    odatetime={value.odatetime}
                    cost={value.fprice}
                    location={value.location}
                  />
                )
              })}
            </Card.Group>
          </Container>
        ) : viewOrders && period.length > 0 ? (
          <Container>
            <h1>Order List</h1>
            <Card.Group>
              {ordersData.filter(date =>
                date.odatetime * 1000 >= new Date(period[0].toString()).getTime() &&
                date.odatetime * 1000 <= new Date(period[1].toString()).getTime()
              ).map((value, index) => {
                return (
                  <OrderSummaryCard
                    key={index}
                    oid={value.oid}
                    odatetime={value.odatetime}
                    cost={value.fprice}
                    location={value.location}
                  />
                )
              })}
            </Card.Group>
          </Container>
        ) : viewRiders && period.length === 0 ? (
          <Statistic>
            <Statistic.Label>Total New Customers</Statistic.Label>
            <Statistic.Value>
              <Icon name="user" />
              {customerOrderSummary.length}
            </Statistic.Value>
          </Statistic>
        ) : (
                      <Statistic.Group
                        widths="3"
                        size="medium"
                        style={{ margin: "1em 0 1em 0" }}
                      >
                        <Statistic>
                          <Statistic.Label>Total New Customers</Statistic.Label>
                          <Statistic.Value>
                            <Icon name="user" />
                            {customerOrderSummary.length}
                          </Statistic.Value>
                        </Statistic>

                        <Statistic>
                          <Statistic.Label>Total Orders</Statistic.Label>
                          <Statistic.Value>
                            <Icon name="file alternate" />
                            {ordersData.length}
                          </Statistic.Value>
                        </Statistic>

                        <Statistic>
                          <Statistic.Label>Total Cost Of Orders</Statistic.Label>
                          <Statistic.Value>
                            <Icon name="dollar" />
                            {orderSummary.map((value, index) => {
                              return (
                                value.sum
                              )
                            })}
                          </Statistic.Value>
                        </Statistic>

                      </Statistic.Group>
                    )}
      </Container >
    </main>
  );
}

export default ManagerSummaryPage;
