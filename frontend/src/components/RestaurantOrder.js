import React from "react";
import { Button, Icon, Label, Input } from "semantic-ui-react";

function RestaurantOrder(props) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>{props.restaurant}</h1>
        <span>
          <Input labelPosition="left" type="text" fluid>
            <Label basic>$</Label>
            <input disabled style={{ opacity: "1" }} />
          </Input>

          <Button.Group widths="2" style={{ minWidth: "20vw" }}>
            <Button animated="vertical" color="teal">
              <Button.Content hidden>Checkout</Button.Content>
              <Button.Content visible>
                <Icon name="shop" />
              </Button.Content>
            </Button>

            <Button
              animated="fade"
              onClick={() => props.setSelectedRestaurant("")}
              color="red"
            >
              <Button.Content visible>
                <Icon name="close" />
              </Button.Content>
              <Button.Content hidden content="Cancel" />
            </Button>
          </Button.Group>
        </span>
      </div>

      <h1>To be implemented</h1>
    </>
  );
}

export default RestaurantOrder;
