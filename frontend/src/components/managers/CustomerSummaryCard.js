import React from "react";
import { Card, Image, Icon } from "semantic-ui-react";

function CustomerSummaryCard(props) {
    return (
        <Card fluid raised color={"teal"}>
            <Card.Content>
                <Card.Header
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    Customer ID: {props.cid}
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
                </Card.Header>
                <Card.Description>
                    <Icon name="mail" />
                    <a href>{props.email}</a>
                    <br />
                    {/* <Icon name="calendar alternate outline" />
                        <strong>Join Date: {format(props.joindate * 1000, "dd/MM/yyyy")}</strong>
                        <br /> */}
                    <Icon name="file alternate" />
                    <strong>Number of orders: {props.ordercount}</strong>
                    <br />
                    <strong>Total payment: <Icon name="dollar" />{props.totalpayment}</strong>
                </Card.Description>
            </Card.Content>
        </Card >
    );
}

export default CustomerSummaryCard;
