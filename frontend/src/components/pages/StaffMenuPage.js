import React from "react";
import { Menu, Container } from "semantic-ui-react";
import Restaurant from "./restaurant/Restaurant"

function StaffMenuPage() {


  return (
    <main className="staff-menu-page">
      <Menu size="huge" style={{ opacity: 0 }}></Menu>
      <br />
      <br />
      <Container>
        <Restaurant />
      </Container>
    </main>
  );
}

export default StaffMenuPage;
