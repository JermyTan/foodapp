import React from "react";
import { Menu, Container } from "semantic-ui-react";
import RestaurantMenu from "components/staffs/RestaurantMenu";

function StaffMenuPage() {
  return (
    <main className="staff-menu-page">
      <Menu size="huge" style={{ opacity: 0 }}></Menu>
      <Container>
        <RestaurantMenu />
      </Container>
      <br />
      <br />
      <br />
    </main>
  );
}

export default StaffMenuPage;
