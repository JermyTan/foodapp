import React, { useState } from "react";
import { Button, Modal, Item } from "semantic-ui-react";
import FoodItemEditor from "./FoodItemEditor";

function NewItemButton(props) {
  const [isModalOpened, setModalOpened] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [limit, setLimit] = useState(0);

  const updateFoodItem = (key, value) => {
    switch (key) {
      case "name":
        setName(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "category":
        setCategory(value);
        break;
      case "limit":
        setLimit(value);
        break;
      default:
        console.log("Unknown key in creating new food item");
    }
  };

  const isValid = name && price && category;

  return (
    <Modal
      open={isModalOpened}
      onOpen={() => {
        setName("");
        setPrice(0);
        setCategory("");
        setLimit(0);
      }}
      onClose={() => setModalOpened(false)}
      trigger={
        <Button color="teal" onClick={() => setModalOpened(true)} icon="plus" />
      }
    >
      <Modal.Header>Add new food item</Modal.Header>

      <Modal.Content>
        <Item.Group>
          <FoodItemEditor
            name={name}
            price={price}
            category={category}
            limit={limit}
            updateFoodItem={updateFoodItem}
          />
        </Item.Group>
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
          disabled={!isValid}
          onClick={() => {
            props.createFoodItem({
              name: name,
              price: price,
              category: category,
              limit: limit,
            });
            setModalOpened(false);
          }}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default NewItemButton;
