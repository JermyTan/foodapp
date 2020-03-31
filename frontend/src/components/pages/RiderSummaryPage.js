import React, { useState } from "react";
import { Menu, Container } from "semantic-ui-react";
import { MonthRangeInput } from "semantic-ui-calendar-react";

function RiderSummaryPage() {
  const [selectedMonths, setSelectedMonths] = useState("");

  return (
    <main className="rider-summary-page">
      <Menu size="huge" style={{ opacity: 0 }}></Menu>
      <Container>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <h1 style={{ marginInlineEnd: "1rem" }}>Performance summary for</h1>
          <MonthRangeInput
            clearable
            placeholder="Select month(s)"
            popupPosition="bottom center"
            onChange={(event, data) => {
              setSelectedMonths(data.value);
              console.log(data.value);
            }}
            dateFormat="MM/YYYY"
            value={selectedMonths}
            closable
            maxDate={new Date()}
          />
        </div>
      </Container>
    </main>
  );
}

export default RiderSummaryPage;
