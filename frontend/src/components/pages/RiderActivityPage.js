import React, { useState, useEffect } from "react";
import { Menu, Container, Segment, Card } from "semantic-ui-react";
import RiderOrderCard from "components/riders/RiderOrderCard";
import Axios from "axios";
import { set } from "date-fns";

const order1 = {
  oid: 43242342,
  startDatetimeToRestaurant: null,
  endDatetimeToRestaurant: null,
  startDatetimeToCustomer: null,
  endDatetimeToCustomer: null,
  odatetime: 1588579582
};

const order2 = {
  oid: 43242344,
  startDatetimeToRestaurant: null,
  endDatetimeToRestaurant: null,
  startDatetimeToCustomer: null,
  endDatetimeToCustomer: null,
  odatetime: 1588579582
};

const order3 = {
  oid: 43242341,
  startDatetimeToRestaurant: null,
  endDatetimeToRestaurant: null,
  startDatetimeToCustomer: null,
  endDatetimeToCustomer: null,
  odatetime: 1588579582
};

//const totalOrders = [order1, order2, order3];

const getRiderOrders = () => {
  //TODO: get rider
  let id = 51
  const url = `http://localhost:5000/api/riders/${id}/orders`
  Axios.get(url)
    .then((response) => {
      console.log(`Fetch all orders for rider ${id}`, response.data)
      // let parsedOrder = {}
      // response.data.forEach(item => {
      //   parsedOrder[item.oid] = item
      // })
      // console.log("PARSED ORDER", parsedOrder)
      // return parsedOrder;
    })
    .catch((error) => {
      console.log("Error fetching orders for rider", error)
    })
}

function RiderActivityPage() {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState({});

  useEffect(() => {
    let id = 51
    const url = `http://localhost:5000/api/riders/${id}/orders`
    Axios.get(url)
      .then((response) => {
        console.log(`Fetch all orders for rider ${id}`, response.data)
        // load rider's current order if any or any lobang
        // totalOrders.forEach(order => (orders[order.oid] = order));
        // setOrders(orders);
        let orders = {}
        response.data.forEach(order => (orders[order.oid] = order));
        setOrders(orders);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching orders for rider", error)
      })

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
      <br />
      <br />
      <br />
    </main>
  );
}

export default RiderActivityPage;
