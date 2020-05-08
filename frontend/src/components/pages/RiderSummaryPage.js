import React, { useState, useContext } from "react";
import { Menu, Container, Statistic, Icon } from "semantic-ui-react";
import { MonthRangeInput } from "semantic-ui-calendar-react";
import { parse, isBefore, format } from "date-fns";
import "styles/AllRestaurants.scss";
import SummaryData from "components/riders/SummaryData";
import UserContext from "utils/UserContext";

function RiderSummaryPage() {
  const [selectedMonths, setSelectedMonths] = useState("");
  const [riderSummary, setRiderSummary] = useState([]);
  const { uid } = useContext(UserContext);

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
  SummaryData(setRiderSummary, period, uid);
  console.log("rider summary is: " + riderSummary);

  return (
    <main className="rider-summary-page">
      <Menu size="huge" style={{ opacity: 0 }}></Menu>
      <Container>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <h1 style={{ marginInlineEnd: "1rem" }}>Performance summary for</h1>
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
                <Statistic.Label>Total earnings</Statistic.Label>
                <Statistic.Value>
                  <Icon name="dollar" />
                  8342
                  {/* setRiderSummary.total_sal */}
                </Statistic.Value>
              </Statistic>

              <Statistic>
                <Statistic.Label>Average earnings per month</Statistic.Label>
                <Statistic.Value>
                  <Icon name="dollar" />
                  2424
                </Statistic.Value>
              </Statistic>

              <Statistic>
                <Statistic.Label>Average earnings per week</Statistic.Label>
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
                <Statistic.Label>Total hours</Statistic.Label>
                <Statistic.Value>
                  <Icon name="time" />
                  1032
                  {/* riderSummary.total_hr */}
                </Statistic.Value>
              </Statistic>

              <Statistic>
                <Statistic.Label>Average hours per month</Statistic.Label>
                <Statistic.Value>
                  <Icon name="time" />
                  345
                </Statistic.Value>
              </Statistic>

              <Statistic>
                <Statistic.Label>Average hours per week</Statistic.Label>
                <Statistic.Value>
                  <Icon name="time" />
                  83
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
                  <Icon name="truck" />
                  3432
                  {/* riderSummary.num_order */}
                </Statistic.Value>
              </Statistic>

              <Statistic>
                <Statistic.Label>Average orders per month</Statistic.Label>
                <Statistic.Value>
                  <Icon name="truck" />
                  34
                </Statistic.Value>
              </Statistic>

              <Statistic>
                <Statistic.Label>Average orders per week</Statistic.Label>
                <Statistic.Value>
                  <Icon name="truck" />8
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
          </>
        )}
      </Container>
      <br />
      <br />
      <br />
    </main>
  );
}

export default RiderSummaryPage;
