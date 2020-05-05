import React, { useState, useEffect } from "react";
import { Menu, Container, Statistic, Icon, Button, Card } from "semantic-ui-react";
import { MonthRangeInput } from "semantic-ui-calendar-react";
import { parse, isBefore, format, set } from "date-fns";
import SummaryData from "components/managers/SummaryData";
import CustomerCard from "components/managers/CustomerCard";
import Axios from "axios";

function ManagerSummaryPage() {
  const [selectedMonths, setSelectedMonths] = useState("");
  const [customersData, setCustomers] = useState([]);
  const [ordersData, setOrders] = useState([]);
  const [ridersData, setRiders] = useState([]);
  const [customerOrderSummary, setCustomerOrder] = useState([]);
  const [viewCustomers, setViewCustomerOn] = useState(false);
  const [viewOrders, setViewOrderOn] = useState(false);
  const [viewRiders, setViewRiderOn] = useState(false);
  const [toggle, setToggle] = useState(1);
  const [button, setButton] = useState(1);
  var pressed = false;

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
  SummaryData(setCustomers, setOrders, setRiders, setCustomerOrder);

  // function toggleButton() {
  //   switch (toggle) {
  //     case 0:
  //       return false
  //     case 1:
  //       return true
  //   }
  // }

  // function toggleButtons() {
  //   switch (button) {
  //     case 0:
  //       setViewCustomerOn(false)
  //       setViewOrderOn(false)
  //       setViewRiderOn(false)
  //     case 1:
  //       // setViewCustomerOn(toggleButton())
  //       // setToggle(Math.abs(toggle - 1))
  //       setViewCustomerOn(true)
  //       setViewOrderOn(false)
  //     // setViewRiderOn(false)
  //     case 2:
  //       // setViewOrderOn(toggleButton())
  //       // setToggle(Math.abs(toggle - 1))
  //       setViewOrderOn(true)
  //       setViewCustomerOn(false)
  //     // setViewRiderOn(false)

  //   }
  // }

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
                setSelectedMonths(data.value);
              }}
              dateFormat="MM/YYYY"
              value={selectedMonths}
              closable
            />
          </span>
          <span>
            <Button.Group>
              <Button
                color="purple"
                onClick={() => {
                  setViewCustomerOn(true)
                  setViewOrderOn(false)
                  setViewRiderOn(false)
                }}
              >
                <Button.Content>View Customers</Button.Content>
              </Button>

              <Button
                color="purple"
                onClick={() => {

                }}
              >
                <Button.Content>View Orders</Button.Content>
              </Button>

              <Button
                color="purple"
                onClick={() => {

                }}
              >
                <Button.Content>View Riders</Button.Content>
              </Button>
            </Button.Group>
          </span>
        </div>

        {
          // period.length > 0 ? (
          //   <>
          //     <h1>
          //       Period{" "}
          //       <font color="#3445c3">{format(period[0], "MMM yyyy")}</font> to{" "}
          //       <font color="#3445c3">{format(period[1], "MMM yyyy")}</font>
          //     </h1>
          //     <Card.Group>
          //       {customerOrderSummary.filter(date => date.customerorder.joindate * 1000 >= new Date(period[0].toString()).getTime() &&
          //         date.customerorder.joindate * 1000 <= new Date(period[1].toString()).getTime())
          //         .map((value, index) => {
          //           return (
          //             <CustomerCard
          //               key={index}
          //               id={value.customerorder.id}
          //               name={value.customerorder.name}
          //               email={value.customerorder.email}
          //               numOrder={value.customerorder.numOrder}
          //               totalCost={value.customerorder.totalCost}
          //             />
          //           )
          //         })}
          //     </Card.Group>
          //   </>
          // ) : 
          viewCustomers ? (
            <>
              <h1>Customer List</h1>
              <Card.Group>
                {customerOrderSummary.map((value, index) => {
                  return (
                    <CustomerCard
                      key={index}
                      id={value.customerorder.id}
                      name={value.customerorder.name}
                      email={value.customerorder.email}
                      numOrder={value.customerorder.numOrder}
                      totalCost={value.customerorder.totalCost}
                    />
                  )
                })}
              </Card.Group>
            </>
          ) : viewOrders ? (
            <Statistic>
              <Statistic.Label>Total Orders</Statistic.Label>
              <Statistic.Value>
                <Icon name="file alternate" />
                {ordersData.length}
              </Statistic.Value>
            </Statistic>
          ) : (
                <Statistic.Group
                  widths="3"
                  size="medium"
                  style={{ margin: "1em 0 1em 0" }}
                >
                  <Statistic>
                    <Statistic.Label>Total Customers</Statistic.Label>
                    <Statistic.Value>
                      <Icon name="user" />
                      {customersData.length}
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
                    <Statistic.Label>Total Riders</Statistic.Label>
                    <Statistic.Value>
                      <Icon name="motorcycle" />
                      {ridersData.length}
                    </Statistic.Value>
                  </Statistic>
                </Statistic.Group>
              )}
      </Container >
    </main >
  );
}

export default ManagerSummaryPage;
