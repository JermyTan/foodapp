import React, { useState } from "react";
import { Item, Label } from "semantic-ui-react";
import NumberInput from "semantic-ui-react-numberinput";
import "styles/FoodItem.scss";

function FoodItemSelector(props) {
  const [count, setCount] = useState("0");

  return (
    <Item>
      <Item.Image src={props.imgurl} />

      <Item.Content>
        <Item.Header
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {props.name}
          <span>${props.price.toFixed(2)}</span>
        </Item.Header>
        <Item.Extra>
          <Label>{props.category}</Label>
        </Item.Extra>
        <Item.Extra>
          <NumberInput
            minValue={0}
            maxValue={props.limit}
            value={count}
            onChange={(value) => {
              setCount(value);
              props.updateSelectedFoodItems({
                name: props.name,
                quantity: parseInt(value),
                price: props.price,
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
