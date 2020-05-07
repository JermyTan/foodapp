import React, { useState } from "react";
import { Card, Button, Image, Icon } from "semantic-ui-react";
import { format } from "date-fns";

function RiderSummaryCard(props) {
    const [isExpanded, setExpanded] = useState(false);

    return (
        <Card fluid raised color={"teal"}>
            <Card.Content>
                <Card.Header
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    Rider ID: {props.id}
                </Card.Header>
            </Card.Content>

            <Card.Content>
                <Card.Header>
                    <Icon name="User" />
                    Name: {props.name}
                </Card.Header>
                <Card.Description>
                    <Icon name="mail" />
                    <a href>{props.email}</a>
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
                        <Icon name="dollar" />
                        <strong>Total Salary = {props.salary}</strong>
                        <br />
                        <Icon name="calendar alternate outline" />
                        <strong>Join Date: {format(props.joindate * 1000, "dd/MM/yyyy")}</strong>
                        <br />
                        <Icon name="motorcycle" />
                        <strong>No. of orders delivered: {props.noorder}</strong>
                        <br />
                        <Icon name="dollar" />
                        <strong>Total cost of orders: {props.totalCost}</strong>
                    </Card.Description>
                )}
            </Card.Content>
        </Card >
    );
}

export default RiderSummaryCard;