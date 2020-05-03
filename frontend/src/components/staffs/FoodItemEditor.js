import React from "react";
import { Item, Label, Input, Button } from "semantic-ui-react";
import NumberInput from "semantic-ui-react-numberinput";
import "styles/FoodItem.scss";

function FoodItemEditor(props) {
  return (
    <Item>
      <Item.Image src={require("images/curry-chicken.jpg")} />

      <Item.Content>
        <Item.Header
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Input
            value={props.name}
            size="mini"
            onChange={(event, data) => {
              let newName = data.value;
              props.updateFoodItem("name", newName, props.index);
            }}
          />
          <Input
            type="number"
            label={<Label basic>$</Label>}
            labelPosition="left"
            value={props.price === 0 ? "" : props.price}
            size="mini"
            onChange={(event, data) => {
              let newPrice = Number(Number(data.value).toFixed(2));
              props.updateFoodItem("price", newPrice, props.index);
            }}
          />
        </Item.Header>

        <Item.Extra>
          <Input
            as={Label}
            value={props.category}
            size="mini"
            transparent
            onChange={(event, data) => {
              let newCategory = data.value;
              props.updateFoodItem("category", newCategory, props.index);
            }}
          />
        </Item.Extra>
        <Item.Extra>
          <NumberInput
            minValue={0}
            value={props.limit.toString()}
            onChange={(value) => {
              let newLimit = parseInt(value);
              props.updateFoodItem("limit", newLimit, props.index);
            }}
            className="number-input"
          />
          {props.deleteFoodItem && (
            <Button
              floated="right"
              icon="close"
              color="red"
              onClick={() => {
                props.deleteFoodItem(props.index);
              }}
            />
          )}
        </Item.Extra>
      </Item.Content>
    </Item>
  );
}

export default FoodItemEditor;
