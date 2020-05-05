import React, { useState } from "react";
import { Card, Button, Label, Rating } from "semantic-ui-react";
import { format } from "date-fns";

function CustomerCard(props) {
    const [isExpanded, setExpanded] = useState(false);
    return (
        <Card fluid raised color={"teal"}>
            <Card.Content>
                <Card.Header
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    Customer ID: {props.id}
                </Card.Header>
            </Card.Content>
            <Card.Content>
                <Card.Header>
                    Name: {props.name}
                    <Button
                        primary
                        floated="right"
                        onClick={() => setExpanded(!isExpanded)}
                    >
                        {isExpanded ? "View less" : "View more"}
                    </Button>
                </Card.Header>
                {isExpanded && (
                    <Card.Description>
                        Email: {props.email}
                        <br />
                        Total number of orders: {props.numOrder}
                        <br />
                        Total cost of orders: {props.totalCost}
                    </Card.Description>
                )}
            </Card.Content>
        </Card>
    );
}

export default CustomerCard;
