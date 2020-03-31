import React, { useState, useEffect } from "react";
import { Menu, Container, Segment, Card } from "semantic-ui-react";
import RiderOrderCard from "components/riders/RiderOrderCard";

const order1 = {
  oid: 43242342,
  startDatetimeToRestaurant: null,
  endDatetimeToRestaurant: null,
  startDatetimeToCustomer: null,
  endDatetimeToCustomer: null
};

const order2 = {
  oid: 43242344,
  startDatetimeToRestaurant: null,
  endDatetimeToRestaurant: null,
  startDatetimeToCustomer: null,
  endDatetimeToCustomer: null
};

const order3 = {
  oid: 43242341,
  startDatetimeToRestaurant: null,
  endDatetimeToRestaurant: null,
  startDatetimeToCustomer: null,
  endDatetimeToCustomer: null
};

const totalOrders = [order1, order2, order3];

function RiderActivityPage() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState({});

  useEffect(() => {
    // load rider's current order if any or any lobang
    totalOrders.forEach(order => (orders[order.oid] = order));
    setOrders(orders);
    setLoading(false);
  }, []);

  return (
    <main className="rider-activity-page">
      <Menu size="huge" style={{ opacity: 0 }}></Menu>
      <Container>
        <h1>Activity</h1>
        {Object.keys(orders).length > 0 ? (
          <Card.Group>
            {Object.entries(orders).map(pair => {
              let order = pair[1];
              return <RiderOrderCard order={order} />;
            })}
          </Card.Group>
        ) : (
          <Segment
            raised
            placeholder
            textAlign="center"
            size="big"
            loading={loading}
          >
            You currently do not have any activity
          </Segment>
        )}
      </Container>
    </main>
  );
}

export default RiderActivityPage;
