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
                        <Icon name="dollar" />
                        <strong>Total Salary = {props.totalsalary}</strong>
                        <br />
                        <Icon name="clock outline" />
                        <strong>{props.hours} hours worked </strong>
                        <br />
                        <Icon name="motorcycle" />
                        <strong>{props.noorder} orders delivered</strong>
                        <br />
                        <Icon name="clock" />
                        <strong>Average delivery time of {props.avgdelivertime} mins</strong>
                        <br />
                        <Icon name="star outline" />
                        <strong>{props.norating} ratings received </strong>
                        <br />
                        <strong>{" "}Average rating: {props.avgrating} <Icon name="star" /></strong>
                    </Card.Description>
                )}

            </Card.Content>

        </Card >
    );
}

export default RiderSummaryCard;