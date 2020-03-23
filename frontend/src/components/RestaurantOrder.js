import React, { useState } from "react";
import { Button, Icon, Label, Input, Item } from "semantic-ui-react";
import FoodItemSelector from "./FoodItemSelector";

function RestaurantOrder(props) {
  const [totalPrice, setTotalPrice] = useState("0.00");
  const selectedFoodItems = {};

  /*
  selectedFoodItems = {
    <food name>: selectedFoodItem,
    <food name>: selectedFoodItem,
    ...
  }

  selectedFoodItem = {
    name: string,
    quantity: number,
    price: number
  }
  */
  const updateSelectedFoodItems = selectedFoodItem => {
    if (selectedFoodItems.name === undefined) {
      selectedFoodItems.name = selectedFoodItem;
    } else {
      selectedFoodItems.name.quantity = selectedFoodItem.quantity;
    }
    updateTotalPrice();
  };

  const updateTotalPrice = () => {
    let totalPrice = 0;
    for (let [key, value] of Object.entries(selectedFoodItems)) {
      totalPrice += parseInt(value.quantity) * parseFloat(value.price);
    }

    setTotalPrice(totalPrice.toFixed(2));
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>{props.restaurant}</h1>
        <span>
          <Input labelPosition="left" type="text" fluid>
            <Label basic>$</Label>
            <input disabled style={{ opacity: "1" }} value={totalPrice} />
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

      <Item.Group divided>
        <FoodItemSelector updateSelectedFoodItems={updateSelectedFoodItems} />
        <FoodItemSelector updateSelectedFoodItems={updateSelectedFoodItems} />
        <FoodItemSelector updateSelectedFoodItems={updateSelectedFoodItems} />
        <FoodItemSelector updateSelectedFoodItems={updateSelectedFoodItems} />
        <FoodItemSelector updateSelectedFoodItems={updateSelectedFoodItems} />
      </Item.Group>
    </>
  );
}

export default RestaurantOrder;
