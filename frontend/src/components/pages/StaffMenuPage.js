import React from "react";
import { Menu, Container } from "semantic-ui-react";

function StaffMenuPage() {
  return (
    <main className="staff-menu-page">
      <Menu size="huge" style={{ opacity: 0 }}></Menu>
      <br />
      <br />
      <Container>
        <h1>This is the staff menu page</h1>
      </Container>
    </main>
  );
}

export default StaffMenuPage;
