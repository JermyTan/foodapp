import React from "react";
import { Button, Icon } from "semantic-ui-react";

function RestaurantOrder(props) {
  return (
    <>
      <h1>{props.restaurant}</h1>
      <Button
        fluid
        animated="fade"
        onClick={() => props.setSelectedRestaurant("")}
        color="red"
      >
        <Button.Content visible>
          <Icon name="close" />
        </Button.Content>
        <Button.Content hidden content="Cancel order" />
      </Button>
      <h1>To be implemented</h1>
    </>
  );
}

export default RestaurantOrder;
