import React, { useState, useEffect } from "react";
import { Menu, Container, Statistic, Icon, Button, Card, Segment, Loader } from "semantic-ui-react";
import { MonthRangeInput } from "semantic-ui-calendar-react";
import {
  parse,
  isBefore,
  format,
  getUnixTime,
  startOfMonth,
  endOfMonth
} from "date-fns";
import SummaryData from "components/managers/SummaryData";
import CustomerSummaryCard from "components/managers/CustomerSummaryCard";
import OrderSummaryCard from "components/managers/OrderSummaryCard";
import RiderSummaryCard from "components/managers/RiderSummaryCard";
import Axios from "axios";

function ManagerSummaryPage() {
  const [period, setPeriod] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState("");
  const [riderSummary, setRiderSummary] = useState([]);
  const [customerSummary, setCustomerSummary] = useState([]);
  const [overviewSummary, setOverviewSummary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [overview, setOverviewOn] = useState(true);
  const [viewCustomers, setViewCustomerOn] = useState(false);
  const [viewOrders, setViewOrderOn] = useState(false);
  const [viewRiders, setViewRiderOn] = useState(false);

  const url = `http://localhost:5000/api/managers/summary/general`
  useEffect(() => {
    Axios.get(url)
      .then(response => {
        let { overviewsummary } = response.data;
        console.log(overviewsummary);
        setOverviewSummary(overviewsummary);
        setLoading(false);
      })
      .catch(error => {
        console.log("Error retrieving overview:", error);
      })
  }, []);

  const getCustomerSummary = (monthA, monthB) => {
    setLoading1(true);
    let cusstarttime = getUnixTime(monthA);
    let cusendtime = getUnixTime(monthB);
    const url = `http://localhost:5000/api/managers/summary/customers?starttime=${cusstarttime}&endtime=${cusendtime}`;
    Axios.get(url)
      .then(response => {
        let { fdssummary } = response.data;
        console.log(fdssummary);
        setCustomerSummary(fdssummary);
        setPeriod([monthA, monthB]);
        setLoading1(false);
      })
      .catch(error => {
        console.log("Error retrieving customer summary data:", error);
        setLoading1(false);
      });
  };

  const getRiderSummary = (monthA, monthB) => {
    setLoading1(true);
    let starttime = getUnixTime(monthA);
    let endtime = getUnixTime(monthB);
    const url1 = `http://localhost:5000/api/managers/summary/riders?starttime=${starttime}&endtime=${endtime}`;
    Axios.get(url1)
      .then(response => {
        console.log(response.date);
        setRiderSummary(response.data);
        setPeriod([monthA, monthB]);
        setLoading1(false);
      })
      .catch(error => {
        console.log("Error retrieving rider summary data:", error);
        setLoading1(false);
      });
  };

  const onMonthInput = (range) => {
    setSelectedMonths(range);
    setPeriod({});
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
    getCustomerSummary(startOfMonth(monthA), endOfMonth(monthB));
    getRiderSummary(startOfMonth(monthA), endOfMonth(monthB));
  };

  function checkdatanull() {
    if ((customerSummary.customerorders) == null) {
      return (
        <Segment
          textAlign='center'
          basic
          size='huge'
          content="No data for this period"
        />
      )
    } else {
      return (
        customerSummary.customerorders.map((value, index) => {
          let image =
            profileImages[Math.floor(Math.random() * profileImages.length)];
          return (
            <CustomerSummaryCard
              key={index}
              cid={value.cid}
              name={value.name}
              email={value.email}
              ordercount={value.ordercount}
              totalpayment={value.totalpayment}
              image={image}
            />
          )
        })
      )
    }
  }

  function checklocationdatanull() {
    if ((customerSummary.orderlocations) == null) {
      return (
        <Segment
          textAlign='center'
          basic
          size='huge'
          content="No data for this period"
        />
      )
    } else {
      return (
        customerSummary.orderlocations.map((value, index) => {
          return (
            <OrderSummaryCard
              key={index}
              location={value.location}
              count={value.count}
            />
          )
        })
      )
    }
  }

  const goodcustomers = overviewSummary.goodcustomers;
  const toplocations = overviewSummary.toplocations;
  const topriders = overviewSummary.topriders;

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
                onMonthInput(data.value);
              }}
              dateFormat="MM/YYYY"
              value={selectedMonths}
              maxDate={new Date()}
              loading={loading1}
              disabled={loading1}
              closable />
          </span>
          <span>
            <Button.Group>
              <Button
                color="purple"
                onClick={() => {
                  setOverviewOn(true)
                  setViewCustomerOn(false)
                  setViewOrderOn(false)
                  setViewRiderOn(false)
                  setSelectedMonths("")
                  setPeriod([])
                }}>
                <Button.Content>Overview</Button.Content>
              </Button>
              <Button
                color="purple"
                onClick={() => {
                  setViewCustomerOn(true)
                  setOverviewOn(false)
                  setViewOrderOn(false)
                  setViewRiderOn(false)
                  setSelectedMonths("")
                  setPeriod([])
                }}>
                <Button.Content>View Customers</Button.Content>
              </Button>
              <Button
                color="purple"
                onClick={() => {
                  setViewOrderOn(true)
                  setOverviewOn(false)
                  setViewCustomerOn(false)
                  setViewRiderOn(false)
                  setSelectedMonths("")
                  setPeriod([])
                }}>
                <Button.Content>View Orders</Button.Content>
              </Button>
              <Button
                color="purple"
                onClick={() => {
                  setViewRiderOn(true)
                  setOverviewOn(false)
                  setViewCustomerOn(false)
                  setViewOrderOn(false)
                  setSelectedMonths("")
                  setPeriod([])
                }}>
                <Button.Content>View Riders</Button.Content>
              </Button>
            </Button.Group>
          </span>
        </div>

        {period.length === 2 && overview ? (
          <Container>
            <h1>Overview</h1>
            <Segment
              basic
              textAlign='center'
              size='small'>
              <h1>Start of{" "}
                <font color="#3445c3">{format(period[0], "MMM yyyy")}</font> to End of{" "}
                <font color="#3445c3">{format(period[1], "MMM yyyy")}</font></h1></Segment>
            <Statistic.Group
              widths="2"
              size="large"
              style={{ margin: "3em 0 3em 0" }}
            >
              <Statistic>
                <Statistic.Label>Total New Customers</Statistic.Label>
                <Statistic.Value>
                  <Icon name="user" />
                  {customerSummary.newcustomers}
                </Statistic.Value>
              </Statistic>

              <Statistic>
                <Statistic.Label>Total New Orders</Statistic.Label>
                <Statistic.Value>
                  <Icon name="food" />
                  {customerSummary.ordercount}
                </Statistic.Value>
              </Statistic>
            </Statistic.Group>

            <Statistic.Group
              widths="2"
              size="large"
              style={{ margin: "1em 0 1em 0" }}
            >
              <Statistic>
                <Statistic.Label>Total Completed Orders</Statistic.Label>
                <Statistic.Value>
                  <Icon name="food" />
                  {customerSummary.completedorders}
                </Statistic.Value>
              </Statistic>

              <Statistic>
                <Statistic.Label>Total Cost of Completed Orders</Statistic.Label>
                <Statistic.Value>
                  <Icon name="dollar" />
                  {customerSummary.orderscost}
                </Statistic.Value>
              </Statistic>
            </Statistic.Group>
          </Container>
        ) : viewCustomers && period.length != 2 ? (
          <Container>
            <h1>Customer List</h1>
            {loading ? (
              <Loader active
                size='large'>Loading</Loader>
            ) : (
                <>
                  <Segment
                    textAlign='center'
                    basic
                    size='huge'
                    content="You have not selected a period"
                  />
                  <br />
                  <br />
                  <br />
                  <br />
                  <Statistic.Group widths="1" size="huge">
                    <Statistic>
                      <Statistic.Label><font color="#643cc6">Top 3 Customers</font></Statistic.Label>
                    </Statistic>
                    <br />
                    <br />
                    <br />
                  </Statistic.Group>
                  {goodcustomers && (
                    <Statistic.Group widths={goodcustomers.length} size="small">
                      {goodcustomers.length >= 1 && (
                        <Statistic>
                          <Statistic.Value>{goodcustomers[0].name}</Statistic.Value>
                          <Statistic.Value text>Customer ID: {" "}
                            <font color="#643cc6">{goodcustomers[0].cid}</font>
                          </Statistic.Value>
                          <Statistic.Label>
                            <font color="#643cc6">{goodcustomers[0].count}</font> {" "}Orders
                          <br />
                            <Icon name='dollar' />
                            {goodcustomers[0].sum}
                          </Statistic.Label>
                        </Statistic>
                      )}

                      {goodcustomers.length >= 2 && (
                        <Statistic>
                          <Statistic.Value>{goodcustomers[1].name}</Statistic.Value>
                          <Statistic.Value text>Customer ID: {" "}
                            <font color="#643cc6">{goodcustomers[1].cid}</font>
                          </Statistic.Value>
                          <Statistic.Label>
                            <font color="#643cc6">{goodcustomers[1].count}</font> {" "}Orders
                          <br />
                            <Icon name='dollar' />
                            {goodcustomers[1].sum}
                          </Statistic.Label>
                        </Statistic>
                      )}

                      {goodcustomers.length >= 3 && (
                        <Statistic>
                          <Statistic.Value>{goodcustomers[2].name}</Statistic.Value>
                          <Statistic.Value text>Customer ID: {" "}
                            <font color="#643cc6">{goodcustomers[2].cid}</font>
                          </Statistic.Value>
                          <Statistic.Label>
                            <font color="#643cc6">{goodcustomers[2].count}</font> {" "}Orders
                          <br />
                            <Icon name='dollar' />
                            {goodcustomers[2].sum}
                          </Statistic.Label>
                        </Statistic>
                      )}
                    </Statistic.Group>
                  )}
                </>
              )}

          </Container>
        ) : viewCustomers && period.length === 2 ? (
          <Container>
            <h1>Customer List</h1>
            <Segment
              basic
              textAlign='center'
              size='small'>
              <h1>Start of{" "}
                <font color="#3445c3">{format(period[0], "MMM yyyy")}</font> to End of{" "}
                <font color="#3445c3">{format(period[1], "MMM yyyy")}</font></h1></Segment>
            <Card.Group>
              {checkdatanull()}
            </Card.Group>
          </Container>
        ) : viewOrders && period.length != 2 ? (
          <Container>
            <h1>Order Location List</h1>
            {loading ? (
              <Loader active
                size='large'>Loading</Loader>
            ) : (
                <>
                  <Segment
                    textAlign='center'
                    basic
                    size='huge'
                    content="You have not selected a period"
                  />
                  <br />
                  <br />
                  <br />
                  <br />
                  <Statistic.Group widths="1" size="huge">
                    <Statistic>
                      <Statistic.Label><font color="#643cc6">Top 3 Locations</font></Statistic.Label>
                    </Statistic>
                    <br />
                    <br />
                    <br />
                  </Statistic.Group>
                  {toplocations && (
                    <Statistic.Group widths={toplocations.length} size="small">
                      {toplocations.length >= 1 && (
                        <Statistic>
                          <Statistic.Value>{toplocations[0].location}</Statistic.Value>
                          <br />
                          <Statistic.Label>
                            <font color="#643cc6">{toplocations[0].count}</font>{" "}Orders
                          </Statistic.Label>
                        </Statistic>
                      )}

                      {toplocations.length >= 2 && (
                        <Statistic>
                          <Statistic.Value>{toplocations[1].location}</Statistic.Value>
                          <br />
                          <Statistic.Value text>
                            <font color="#643cc6">{toplocations[1].count}</font>{" "}Orders
                          </Statistic.Value>
                        </Statistic>
                      )}

                      {toplocations.length >= 3 && (
                        <Statistic>
                          <Statistic.Value>{toplocations[2].location}</Statistic.Value>
                          <br />
                          <Statistic.Value text>
                            <font color="#643cc6">{toplocations[2].count}</font>{" "}Orders
                          </Statistic.Value>
                        </Statistic>
                      )}
                    </Statistic.Group>
                  )}
                </>
              )}

          </Container>
        ) : viewOrders && period.length === 2 ? (
          <Container>
            <h1>Order Location List</h1>
            <Segment
              basic
              textAlign='center'
              size='small'>
              <h1>Start of{" "}
                <font color="#3445c3">{format(period[0], "MMM yyyy")}</font> to End of{" "}
                <font color="#3445c3">{format(period[1], "MMM yyyy")}</font></h1></Segment>
            <Card.Group>
              {checklocationdatanull()}
            </Card.Group>
          </Container>
        ) : viewRiders && period.length != 2 ? (
          <Container>
            <h1>Rider List</h1>
            {loading ? (
              <Loader active
                size='large'>Loading</Loader>
            ) : (
                <>
                  <Segment
                    textAlign='center'
                    basic
                    size='huge'
                    content="You have not selected a period"
                  />
                  <br />
                  <br />
                  <br />
                  <br />
                  <Statistic.Group widths="1" size="huge">
                    <Statistic>
                      <Statistic.Label><font color="#643cc6">Top 3 Riders</font></Statistic.Label>
                    </Statistic>
                    <br />
                    <br />
                    <br />
                  </Statistic.Group>
                  {topriders && (
                    <Statistic.Group widths={topriders.length} size="small">
                      {topriders.length >= 1 && (
                        <Statistic>
                          <Statistic.Value>{topriders[0].name}</Statistic.Value>
                          <Statistic.Value text>Rider ID: {" "}
                            <font color="#643cc6">{topriders[0].rid}</font>
                          </Statistic.Value>
                          <Statistic.Label>
                            <font color="#643cc6">{topriders[0].count}</font> {" "}Orders Delivered
                          <br />
                            <Icon name='motorcycle' />
                            Average delivery time of{" "}
                            <font color="#643cc6">{parseFloat(topriders[0].avg).toFixed(2)}</font>{" "}mins
                          </Statistic.Label>
                        </Statistic>
                      )}

                      {topriders.length >= 2 && (
                        <Statistic>
                          <Statistic.Value>{topriders[1].name}</Statistic.Value>
                          <Statistic.Value text>Rider ID: {" "}
                            <font color="#643cc6">{topriders[1].rid}</font>
                          </Statistic.Value>
                          <Statistic.Label>
                            <font color="#643cc6">{topriders[1].count}</font> {" "}Orders Delivered
                          <br />
                            <Icon name='motorcycle' />
                            Average delivery time of{" "}
                            <font color="#643cc6">{parseFloat(topriders[1].avg).toFixed(2)}</font>{" "}mins
                          </Statistic.Label>
                        </Statistic>
                      )}

                      {topriders.length >= 3 && (
                        <Statistic>
                          <Statistic.Value>{topriders[2].name}</Statistic.Value>
                          <Statistic.Value text>Rider ID: {" "}
                            <font color="#643cc6">{topriders[2].rid}</font>
                          </Statistic.Value>
                          <Statistic.Label>
                            <font color="#643cc6">{topriders[2].count}</font> {" "}Orders Delivered
                          <br />
                            <Icon name='motorcycle' />
                            Average delivery time of{" "}
                            <font color="#643cc6">{((parseFloat(topriders[2].avg)) / 60).toFixed(2)}</font>{" "}mins
                          </Statistic.Label>
                        </Statistic>
                      )}
                    </Statistic.Group>
                  )}
                </>
              )}

          </Container>
        ) : viewRiders && period.length === 2 ? (
          <Container>
            <h1>Rider List</h1>
            <Segment
              basic
              textAlign='center'
              size='small'>
              <h1>Start of{" "}
                <font color="#3445c3">{format(period[0], "MMM yyyy")}</font> to End of{" "}
                <font color="#3445c3">{format(period[1], "MMM yyyy")}</font></h1></Segment>
            <Card.Group>
              {riderSummary.map((value, index) => {
                return (
                  <RiderSummaryCard
                    key={index}
                    id={value.riderinfo.id}
                    totalsalary={value.riderinfo.totalsalary}
                    hours={value.riderinfo.hours}
                    noorder={value.riderinfo.noorder}
                    avgdelivertime={(parseFloat(value.riderinfo.avgdelivertime) / 60).toFixed(2)}
                    norating={value.riderinfo.norating}
                    avgrating={value.riderinfo.avgrating}
                  />
                )
              })}
            </Card.Group>
          </Container>
        ) : (
                        <Container>
                          <h1>Overview</h1>
                          {loading ? (
                            <Loader active
                              size='large'>Loading</Loader>
                          ) : (
                              <>
                                <Segment
                                  textAlign='center'
                                  basic
                                  size='huge'
                                  content="You have not selected a period"
                                />
                                <Statistic.Group
                                  widths="2"
                                  size="large"
                                  style={{ margin: "3em 0 3em 0" }}
                                >
                                  <Statistic>
                                    <Statistic.Label>Total Customers</Statistic.Label>
                                    <Statistic.Value>
                                      <Icon name="user" />
                                      {overviewSummary.totalcustomers}
                                    </Statistic.Value>
                                  </Statistic>

                                  <Statistic>
                                    <Statistic.Label>Total Orders</Statistic.Label>
                                    <Statistic.Value>
                                      <Icon name="food" />
                                      {overviewSummary.totalorders}
                                    </Statistic.Value>
                                  </Statistic>
                                </Statistic.Group>

                                <Statistic.Group
                                  widths="2"
                                  size="large"
                                  style={{ margin: "1em 0 1em 0" }}
                                >
                                  <Statistic>
                                    <Statistic.Label>Total Completed Orders</Statistic.Label>
                                    <Statistic.Value>
                                      <Icon name="food" />
                                      {overviewSummary.totalcompletedorders}
                                    </Statistic.Value>
                                  </Statistic>

                                  <Statistic>
                                    <Statistic.Label>Total Cost of Completed Orders</Statistic.Label>
                                    <Statistic.Value>
                                      <Icon name="dollar" />
                                      {overviewSummary.totalcost}
                                    </Statistic.Value>
                                  </Statistic>
                                </Statistic.Group>
                              </>
                            )}
                        </Container>
                      )
        }
      </Container >
    </main>
  );
}

export default ManagerSummaryPage;
