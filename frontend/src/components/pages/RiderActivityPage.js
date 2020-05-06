import React, { useState, useEffect, useContext } from "react";
import { Menu, Container, Segment, Card } from "semantic-ui-react";
import RiderOrderCard from "components/riders/RiderOrderCard";
import Axios from "axios";
import UserContext from "utils/UserContext";

const order1 = {
  oid: 43242342,
  startDatetimeToRestaurant: null,
  endDatetimeToRestaurant: null,
  startDatetimeToCustomer: null,
  endDatetimeToCustomer: null,
  odatetime: 1588579582,
};

const order2 = {
  oid: 43242344,
  startDatetimeToRestaurant: null,
  endDatetimeToRestaurant: null,
  startDatetimeToCustomer: null,
  endDatetimeToCustomer: null,
  odatetime: 1588579582,
};

const order3 = {
  oid: 43242341,
  startDatetimeToRestaurant: null,
  endDatetimeToRestaurant: null,
  startDatetimeToCustomer: null,
  endDatetimeToCustomer: null,
  odatetime: 1588579582,
};

//const totalOrders = [order1, order2, order3];

function RiderActivityPage() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState({});
  const { uid } = useContext(UserContext);

  const refreshOrders = () => {
    const url = `http://localhost:5000/api/riders/${uid}/orders`;
    Axios.get(url)
      .then((response) => {
        console.log(`Fetch all orders for rider ${uid}`, response.data);
        // load rider's current order if any or any lobang
        // totalOrders.forEach(order => (orders[order.oid] = order));
        // setOrders(orders);
        let orders = {};
        response.data.forEach((order) => (orders[order.oid] = order));
        setOrders(orders);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching orders for rider", error);
      });
  };

  useEffect(() => {
    refreshOrders();
  }, []);

  return (
    <main className="rider-activity-page">
      <Menu size="huge" style={{ opacity: 0 }}></Menu>
      <Container>
        <h1>Activity</h1>
        {Object.keys(orders).length > 0 ? (
          <Card.Group>
            {Object.entries(orders).map((pair) => {
              let order = pair[1];
              return (
                <RiderOrderCard refreshOrders={refreshOrders} order={order} />
              );
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
      <br />
      <br />
      <br />
    </main>
  );
}

export default RiderActivityPage;
