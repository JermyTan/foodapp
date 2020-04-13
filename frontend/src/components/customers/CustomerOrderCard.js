import React, { useState } from "react";
import { Card, Button, Label } from "semantic-ui-react";
import { format } from 'date-fns'

function CustomerOrderCard(props) {
  const [isExpanded, setExpanded] = useState(false);
  const order = props.order
  function getStatus() {
    switch (order.status) {
      case 1:
        return "Delivering"
      case 2:
        return "Delivered"
      case 3:
        return "Cancelled"
      default:
        return "Processing"
    }
  }

  return (
    <Card fluid raised color={order.status === 2 ? 'green' : 'yellow'}>
      <Card.Content>
        <Card.Header
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {order.rname}
          <span>${order.fprice + order.dfee}</span>
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Description>
          {format(order.odatetime, 'MM/dd/yyyy hh:mm aa')}
          {<Label
            color={order.status === 2 ? 'green' : order.status === 3 ? "grey" : 'yellow'}
            style={{ marginLeft: "30px" }}>
            {getStatus()}
          </Label>}
          <Button
            primary
            floated="right"
            onClick={() => setExpanded(!isExpanded)}
          >
            {isExpanded ? "View less" : "View more"}
          </Button>
        </Card.Description>
        {isExpanded && (
          <Card.Description>
            Order id: {order.oid}
            <br />
            Delivery address: {props.order.location}
          </Card.Description>
        )}
      </Card.Content>
      {
        isExpanded && (
          <>
            <Card.Content>
              <Card.Description>
                {order.items.map((value, index) => {
                  return <div
                    key={index}
                    style={{ display: "flex", justifyContent: "space-between" }}>
                    {`${value.qty}x ${value.fname}`}
                    <span>${value.qty * value.price}</span>
                  </div>
                })}
              </Card.Description>
            </Card.Content>
            <Card.Content>
              <Card.Description>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  Subtotal
                <span>${order.fprice}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  Delivery fee
                <span>${order.dfee}</span>
                </div>
                <br />
                <strong>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    Total
                  <span>${order.fprice + order.dfee}</span>
                  </div>
                </strong>
              </Card.Description>
            </Card.Content>
          </>
        )
      }
    </Card >
  );
}

export default CustomerOrderCard;
