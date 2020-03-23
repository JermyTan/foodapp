import React, { useState } from "react";
import { Item, Label } from "semantic-ui-react";
import NumberInput from "semantic-ui-react-numberinput";
import "../styles/FoodItemSelector.scss";

const data = {
  name: "Curry Chicken with Rice",
  price: "6.30",
  category: "Asian",
  limit: 5
};

function FoodItemSelector(props) {
  const [count, setCount] = useState("0");

  return (
    <Item>
      <Item.Image src={require("../images/curry-chicken.jpg")} />

      <Item.Content>
        <Item.Header
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {data.name}
          <span>${data.price}</span>
        </Item.Header>
        <Item.Extra>
          <Label>{data.category}</Label>
        </Item.Extra>
        <Item.Extra>
          <NumberInput
            minValue={0}
            maxValue={data.limit}
            value={count}
            onChange={value => {
              setCount(value);
              props.updateSelectedFoodItems({
                name: data.name,
                quantity: value,
                price: data.price
              });
            }}
            className="number-input"
          />
        </Item.Extra>
      </Item.Content>
    </Item>
  );
}

export default FoodItemSelector;
