import React, { useState } from "react";
import { Card, Button } from "semantic-ui-react";

function OrderCard(props) {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <Card fluid raised>
      <Card.Content>
        <Card.Header
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          Toast Box (West Coast Plaza)
          <span>$ 9.48</span>
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Description>
          21 Jan 2020, 12:11
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
            Order number: 2321243243
            <br />
            Delivery address: 18 College Ave E
          </Card.Description>
        )}
      </Card.Content>
      {isExpanded && (
        <>
          <Card.Content>
            <Card.Description>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {"1x Curry Chicken with Rice"}
                <span>$6.30</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {"2x Ice Milo"}
                <span>$1.30</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {"1x Teh"}
                <span>$1.00</span>
              </div>
            </Card.Description>
          </Card.Content>
          <Card.Content>
            <Card.Description>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                Subtotal
                <span>$8.60</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                Delivery fee
                <span>$1.18</span>
              </div>
              <br />
              <strong>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  Total
                  <span>$9.48</span>
                </div>
              </strong>
            </Card.Description>
          </Card.Content>
        </>
      )}
    </Card>
  );
}

export default OrderCard;
