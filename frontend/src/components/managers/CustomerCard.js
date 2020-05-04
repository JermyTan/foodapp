import React from "react";
import React, { useState } from "react";
import { Card, Label, Button } from "semantic-ui-react";
import { format } from "date-fns";

function CustomerCard(props) {
    const [isExpanded, setExpanded] = useState(false);
    return (
        <Card fluid raised color={"purple"}>
            <Card.Content>
                <Card.Header
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    Customer ID: {props.id}
                    <br />
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
                        Order id: {order.oid}
                        <br />
            Delivery address: {props.order.location}
                    </Card.Description>
                )}
            </Card.Content>
        </Card>
    );
}

export default CustomerCard;
