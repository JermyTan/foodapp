import React, { useState, useEffect } from "react";
import { Menu, Container, Card } from "semantic-ui-react";
import OrderCard from "components/customers/CustomerOrderCard";
import Axios from "axios";

const data = [
  {
    oid: 12312,
    fprice: 8.6,
    location: "18 College Ave E",
    dfee: 3.99,
    rname: "Toast Box (West Coast Plaza)",
    odatetime: 1588486582,
    status: 2,
    items: [
      {
        fname: "Curry Chicken with Rice",
        qty: 1,
        price: 6.3,
      },
      {
        fname: "Ice Milo",
        qty: 2,
        price: 1.3,
      },
      {
        fname: "Teh",
        qty: 1,
        price: 1,
      },
    ],
  },
  {
    oid: 12312,
    fprice: 8.6,
    location: "18 College Ave E",
    dfee: 3.99,
    rname: "Toast Box (West Coast Plaza)",
    odatetime: 1588486582,
    status: 1,
    items: [
      {
        fname: "Curry Chicken with Rice",
        qty: 1,
        price: 6.3,
      },
      {
        fname: "Ice Milo",
        qty: 2,
        price: 1.3,
      },
      {
        fname: "Teh",
        qty: 1,
        price: 1,
      },
    ],
  },
  {
    oid: 12312,
    fprice: 8.6,
    location: "18 College Ave E",
    dfee: 3.99,
    rname: "Toast Box (West Coast Plaza)",
    odatetime: 1588486582,
    status: 0,
    items: [
      {
        fname: "Curry Chicken with Rice",
        qty: 1,
        price: 6.3,
      },
      {
        fname: "Ice Milo",
        qty: 2,
        price: 1.3,
      },
      {
        fname: "Teh",
        qty: 1,
        price: 1,
      },
    ],
  },
  {
    oid: 12312,
    fprice: 8.6,
    location: "18 College Ave E",
    dfee: 3.99,
    rname: "Toast Box (West Coast Plaza)",
    odatetime: 1588486582,
    status: 3,
    items: [
      {
        fname: "Curry Chicken with Rice",
        qty: 1,
        price: 6.3,
      },
      {
        fname: "Ice Milo",
        qty: 2,
        price: 1.3,
      },
      {
        fname: "Teh",
        qty: 1,
        price: 1,
      },
    ],
  },
];

function HistoryPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    //need props for user id
    let id = 1;
    let url = `http://localhost:5000/api/customers/${id}/orders`;
    Axios.get(url)
      .then((response) => {
        console.log("response", response.data);
        // TODO: switch to load from api when db is populated
        setOrders(data);
      })
      .catch((error) => {
        console.log("Error retrieving past orders:", error);
      });
  }, []);

  return (
    <main className="history-page">
      <Menu size="huge" style={{ opacity: 0 }}></Menu>
      <Container>
        <h1>Past Orders</h1>

        <Card.Group>
          {orders.map((value, index) => {
            console.log(orders);
            return <OrderCard key={index} order={value} />;
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
