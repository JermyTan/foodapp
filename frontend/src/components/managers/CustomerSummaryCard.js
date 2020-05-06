import React, { useState } from "react";
import { Card, Button, Image, Icon } from "semantic-ui-react";
import { format } from "date-fns";

function CustomerSummaryCard(props) {
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
                    {/* <Icon name="user" /> */}
                    <Image
                        floated='left'
                        size='mini'
                        src={`https://react.semantic-ui.com/images/avatar/large/${props.image}`}
                    />
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
                        <Icon name="mail" />
                        <a href>{props.email}</a>
                        <br />
                        <Icon name="calendar alternate outline" />
                        <strong>Join Date: {format(props.joindate * 1000, "dd/MM/yyyy")}</strong>
                        <br />
                        <Icon name="file alternate" />
                        <strong>Total number of orders: {props.numOrder}</strong>
                        <br />
                        <Icon name="dollar" />
                        <strong>Total cost of orders: {props.totalCost}</strong>
                    </Card.Description>
                )}
            </Card.Content>
        </Card >
    );
}

export default CustomerSummaryCard;
