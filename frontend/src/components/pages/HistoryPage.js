import React from "react";
import { Menu, Container, Card } from "semantic-ui-react";
import OrderCard from "components/customers/CustomerOrderCard";

const data = [];

function HistoryPage() {
  return (
    <main className="history-page">
      <Menu size="huge" style={{ opacity: 0 }}></Menu>
      <Container>
        <h1>Past Orders</h1>

        <Card.Group>
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
          <OrderCard />
        </Card.Group>
      </Container>
    </main>
  );
}

export default HistoryPage;
