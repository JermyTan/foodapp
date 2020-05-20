import React, { useState } from "react";
import { Item, Label, Input, Button, Modal } from "semantic-ui-react";
import NumberInput from "semantic-ui-react-numberinput";
import "styles/FoodItem.scss";

function FoodItemEditor(props) {
  const [isModalOpened, setModalOpened] = useState(false);

  return (
    <Item>
      <Item.Image src={props.imgurl} />

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
          <Input
            label={<Label basic>Image url</Label>}
            labelPosition="left"
            value={props.imgurl}
            size="mini"
            onChange={(event, data) => {
              let newImgurl = data.value;
              props.updateFoodItem("imgurl", newImgurl, props.index);
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
            <Modal
              open={isModalOpened}
              onClose={() => setModalOpened(false)}
              trigger={
                <Button color="red"
                  floated="right"
                  color="red"
                  icon="close"
                  onClick={() => setModalOpened(true)} />
              }
            >
              <Modal.Header>Confirm delete menu item?</Modal.Header>
              <Modal.Content>
                Confirm delete {props.name} from the menu?
                This cannot be undone.
                </Modal.Content>
              <Modal.Actions>
                <Button
                  color="red"
                  content="Cancel"
                  onClick={() => setModalOpened(false)}
                />
                <Button
                  color="green"
                  content="Confirm"
                  onClick={() => {
                    props.deleteFoodItem(props.name);
                    setModalOpened(false);
                  }}
                />
              </Modal.Actions>


            </Modal>
            // <Button
            //   floated="right"
            //   icon="close"
            //   color="red"
            //   onClick={() => {
            //     props.deleteFoodItem(props.name);
            //   }}
            // />
          )}
        </Item.Extra>
      </Item.Content>
    </Item>
  );
}

export default FoodItemEditor;
