import React from "react";
import { Menu, Container } from "semantic-ui-react";

function HistoryPage() {
  return (
    <main className="history-page">
      <Menu size="huge" style={{ opacity: 0 }}></Menu>
      <Container>
        <h1>Past Orders</h1>
      </Container>
    </main>
  );
}

export default HistoryPage;
