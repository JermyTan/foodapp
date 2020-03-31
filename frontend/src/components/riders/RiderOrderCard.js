import React, { useState } from "react";
import { Card, Step, Button } from "semantic-ui-react";
import { getUnixTime, formatISO9075 } from "date-fns";

function RiderOrderCard(props) {
  const [startDatetimeToRestaurant, setStartDatetimeToRestaurant] = useState(
    props.order.startDatetimeToRestaurant
  );
  const [endDatetimeToRestaurant, setEndDatetimeToRestaurant] = useState(
    props.order.endDatetimeToRestaurant
  );
  const [startDatetimeToCustomer, setStartDatetimeToCustomer] = useState(
    props.order.startDatetimeToCustomer
  );
  const [endDatetimeToCustomer, setEndDatetimeToCustomer] = useState(
    props.order.endDatetimeToCustomer
  );

  const receiveOrderCompleted = startDatetimeToRestaurant != null;
  const goToRestaurantCompleted = endDatetimeToRestaurant != null;
  const receivedFoodCompleted = startDatetimeToCustomer != null;
  const deliverToCustomerCompleted = endDatetimeToCustomer != null;

  console.log(props.order);
  return (
    <Card fluid raised>
      <Step.Group ordered widths="4">
        <Step completed={receiveOrderCompleted}>
          <Step.Content style={{ display: "flex", flexDirection: "column" }}>
            <Step.Title>Receive order</Step.Title>

            <Button
              style={{ marginTop: "0.5em", marginRight: "0" }}
              compact
              content="Accept"
              color="green"
              onClick={() => {
                let currentDatetime = new Date();
                setStartDatetimeToRestaurant(getUnixTime(currentDatetime));
              }}
              disabled={receiveOrderCompleted}
            />
            {receiveOrderCompleted}

            {receiveOrderCompleted && (
              <Step.Description>
                Completed on: {formatISO9075(startDatetimeToRestaurant * 1000)}
              </Step.Description>
            )}
          </Step.Content>
        </Step>

        <Step completed={goToRestaurantCompleted}>
          <Step.Content style={{ display: "flex", flexDirection: "column" }}>
            <Step.Title>Go to restaurant</Step.Title>
            <Step.Description>
              Collect customer's food from restaurant
            </Step.Description>

            {receiveOrderCompleted && (
              <Button
                style={{ marginTop: "0.5em", marginRight: "0" }}
                compact
                content="Done"
                color="green"
                onClick={() => {
                  let currentDatetime = new Date();
                  setEndDatetimeToRestaurant(getUnixTime(currentDatetime));
                }}
                disabled={goToRestaurantCompleted}
              />
            )}
            {goToRestaurantCompleted && (
              <Step.Description>
                Completed on: {formatISO9075(endDatetimeToRestaurant * 1000)}
              </Step.Description>
            )}
          </Step.Content>
        </Step>

        <Step completed={receivedFoodCompleted}>
          <Step.Content style={{ display: "flex", flexDirection: "column" }}>
            <Step.Title>Receive food</Step.Title>
            <Step.Description>
              Food ready to be delivered to customer
            </Step.Description>

            {goToRestaurantCompleted && (
              <Button
                style={{ marginTop: "0.5em", marginRight: "0" }}
                compact
                content="Done"
                color="green"
                onClick={() => {
                  let currentDatetime = new Date();
                  setStartDatetimeToCustomer(getUnixTime(currentDatetime));
                }}
                disabled={receivedFoodCompleted}
              />
            )}

            {receivedFoodCompleted && (
              <Step.Description>
                Completed on: {formatISO9075(startDatetimeToCustomer * 1000)}
              </Step.Description>
            )}
          </Step.Content>
        </Step>

        <Step completed={deliverToCustomerCompleted}>
          <Step.Content style={{ display: "flex", flexDirection: "column" }}>
            <Step.Title>Deliver to customer</Step.Title>
            <Step.Description>Go to the customer's location</Step.Description>

            {receivedFoodCompleted && (
              <Button
                style={{ marginTop: "0.5em", marginRight: "0" }}
                compact
                content="Done"
                color="green"
                onClick={() => {
                  let currentDatetime = new Date();
                  setEndDatetimeToCustomer(getUnixTime(currentDatetime));
                }}
                disabled={deliverToCustomerCompleted}
              />
            )}

            {deliverToCustomerCompleted && (
              <Step.Description>
                Completed on: {formatISO9075(endDatetimeToCustomer * 1000)}
              </Step.Description>
            )}
          </Step.Content>
        </Step>
      </Step.Group>
    </Card>
  );
}

export default RiderOrderCard;
