import React, { useState } from "react";
import { Card, Button, Icon } from "semantic-ui-react";
import { format } from "date-fns";

function OrderSummaryCard(props) {
    const [isExpanded, setExpanded] = useState(false);
    return (
        <Card fluid raised color={"teal"}>
            <Card.Content>
                <Card.Header>
                    {/* <Icon name="file alternate" /> */}
                    Order ID: {props.oid}
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
                        <Icon name="calendar alternate outline" />
                        <strong>Order Date: {format(props.odatetime * 1000, "dd/MM/yyyy")}</strong>
                        <br />
                        <Icon name="dollar" />
                        <strong>Order Cost: {props.cost}</strong>
                        <br />
                        <Icon name="location arrow" />
                        <strong>Delivery Location: {props.location}</strong>

                    </Card.Description>
                )}
            </Card.Content>
        </Card >
    );
}

export default OrderSummaryCard;
