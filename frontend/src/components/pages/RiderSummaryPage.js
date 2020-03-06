import React from "react";
import { Menu, Container } from "semantic-ui-react";

function RiderSummaryPage() {
  return (
    <main className="rider-summary-page">
      <Menu size="huge" style={{ opacity: 0 }}></Menu>
      <br />
      <br />
      <Container>
        <h1>This is the rider summary page</h1>
      </Container>
    </main>
  );
}

export default RiderSummaryPage;
