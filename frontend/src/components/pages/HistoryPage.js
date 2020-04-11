import React, { useState, useEffect } from "react";
import { Menu, Container, Card } from "semantic-ui-react";
import OrderCard from "components/customers/CustomerOrderCard";
import Axios from "axios";

function HistoryPage() {
  const [ordersData, setData] = useState([]);
  //need props for user id
  const id = 1
  const url = `http://localhost:5000/api/customers/${id}/orders`
  useEffect(() => {
    Axios.get(url)
      .then(response => {
        console.log("response", response.data)
        setData(response.data)
      })
      .catch(error => {
        console.log("Error retrieving past orders:", error);
      })
  }, [])


  return (
    <main className="history-page">
      <Menu size="huge" style={{ opacity: 0 }}></Menu>
      <Container>
        <h1>Past Orders</h1>

        <Card.Group>
          {ordersData.map((value, index) => {
            return <OrderCard
              key={index}
              order={value.order} />
          })}
        </Card.Group>
      </Container>
      <br />
      <br />
      <br />
    </main>
  );
}

export default HistoryPage;
