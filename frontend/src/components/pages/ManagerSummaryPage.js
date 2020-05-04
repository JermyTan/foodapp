import React, { useState, useEffect } from "react";
import { Menu, Container, Statistic, Icon, Header, Sidebar } from "semantic-ui-react";
import { MonthRangeInput } from "semantic-ui-calendar-react";
import { parse, isBefore, format } from "date-fns";
import SummaryData from "components/managers/SummaryData";
import Axios from "axios";

function ManagerSummaryPage() {
  const [selectedMonths, setSelectedMonths] = useState("");
  const [customersCount, setCustomersCount] = useState([]);
  const [ordersCount, setOrdersCount] = useState([]);

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
  SummaryData(setCustomersCount, setOrdersCount);
  return (
    <main className="manager-summary-page">
      <Menu size="huge" style={{ opacity: 0 }}></Menu>
      <Container>
        <span style={{ display: "flex", flexWrap: "wrap" }}>
          <h2 style={{ marginInlineEnd: "1rem" }}>Summary for period</h2>
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
          />
        </span>
        {period.length > 0 ? (
          <>
            <h1>
              Period{" "}
              <font color="#3445c3">{format(period[0], "MMM yyyy")}</font> to{" "}
              <font color="#3445c3">{format(period[1], "MMM yyyy")}</font>
            </h1>
          </>
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
                  {customersCount.length}
                </Statistic.Value>
              </Statistic>

              <Statistic>
                <Statistic.Label>Total Orders</Statistic.Label>
                <Statistic.Value>
                  <Icon name="file alternate" />
                  {ordersCount.length}
                </Statistic.Value>
              </Statistic>

              <Statistic>
                <Statistic.Label>Total Order Costs</Statistic.Label>
                <Statistic.Value>
                  <Icon name="dollar" />
                  823
                </Statistic.Value>
              </Statistic>
            </Statistic.Group>
          )}
      </Container >
    </main >
  );
}

export default ManagerSummaryPage;
