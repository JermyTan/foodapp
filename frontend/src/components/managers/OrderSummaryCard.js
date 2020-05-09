import React from "react";
import { Card, Icon } from "semantic-ui-react";

function OrderSummaryCard(props) {
    return (
        <Card fluid raised color={"teal"}>
            <Card.Content>
                <Card.Header>
                    <Icon name="location arrow" />
                    Delivery Location: {props.location}
                </Card.Header>
                <Card.Description>
                    <Icon name="file alternate" />
                    <strong>Order Count: {props.count}</strong>
                </Card.Description>
            </Card.Content>
        </Card >
    );
}

export default OrderSummaryCard;
