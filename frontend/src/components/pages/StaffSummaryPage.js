import React from "react";
import { Menu, Container } from "semantic-ui-react";

function StaffSummaryPage() {
  return (
    <main className="staff-summary-page">
      <Menu size="huge" style={{ opacity: 0 }}></Menu>
      <br />
      <br />
      <Container>
        <h1>This is the staff summary page</h1>
      </Container>
    </main>
  );
}

export default StaffSummaryPage;
