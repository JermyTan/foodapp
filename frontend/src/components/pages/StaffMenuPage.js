import React from "react";
import { Menu, Container } from "semantic-ui-react";
import RestaurantMenu from "./restaurant/RestaurantMenu"

function StaffMenuPage() {
  return (
    <main className="staff-menu-page">
      <Menu size="huge" style={{ opacity: 0 }}></Menu>
      <br />
      <br />
      <Container>
        <div style={{ float: "left" }}>
          <RestaurantMenu />
        </div>
        <aside style={{ float: "right" }}>
          <Container className="order-form">
            <p>ORDER</p>
          </Container>
        </aside>
      </Container>

    </main>
  );
}

export default StaffMenuPage;
