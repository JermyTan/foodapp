import React, { useState, useEffect } from "react";
import { Item, Button, Message } from "semantic-ui-react";
import FoodItemEditor from "./FoodItemEditor";

const data = [
  {
    name: "Curry Chicken with Rice",
    price: 6.3,
    category: "Asian",
    limit: 5,
  },
  {
    name: "Dry Mee Siam",
    price: 5.6,
    category: "Malay",
    limit: 3,
  },
  {
    name: "Ice Milo",
    price: 1.3,
    category: "Drinks",
    limit: 10,
  },
  {
    name: "Fried Bee Hoon",
    price: 4.3,
    category: "Asian",
    limit: 8,
  },
  {
    name: "Lu Rou Fan",
    price: 7.99,
    category: "Asian",
    limit: 5,
  },
  {
    name: "Peanut Butter Thick Toast",
    price: 2.1,
    category: "Asian",
    limit: 10,
  },
];

const rname = "Toast Box";

function RestaurantMenu() {
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantFoodItems, setRestaurantFoodItems] = useState([]);
  const [saveChanges, setSaveChanges] = useState(false);

  useEffect(() => {
    // retrieve the restaurant name under this staff
    setRestaurantName(rname);
    // retrieve restaurant data
    setRestaurantFoodItems(data);
  }, []);

  const updateFoodItem = (key, value, index) => {
    let clone = [...restaurantFoodItems];
    let affectedItem = clone[index];
    let itemClone = {
      name: affectedItem.name,
      price: affectedItem.price,
      category: affectedItem.category,
      limit: affectedItem.limit,
    };
    itemClone[key] = value;
    clone[index] = itemClone;
    setRestaurantFoodItems(clone);
  };

  const deleteFoodItem = (index) => {
    let clone = [...restaurantFoodItems];
    clone.splice(index, 1);
    setRestaurantFoodItems(clone);
  };

  const handleSaveChanges = () => {
    // API call to patch new changes
    // if success
    setSaveChanges(true);
  };

  return (
    <>
      {saveChanges && (
        <Message
          success
          header="Success"
          content="Food items are updated successfully"
          style={{ textAlign: "center" }}
        />
      )}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>{restaurantName}</h1>
        <span>
          <Button color="blue" onClick={handleSaveChanges}>
            Save changes
          </Button>
          <Button color="teal" icon="plus" />
        </span>
      </div>

      <Item.Group divided>
        {restaurantFoodItems.map((value, index) => {
          return (
            <FoodItemEditor
              key={index}
              index={index}
              name={value.name}
              price={value.price}
              category={value.category}
              limit={value.limit}
              updateFoodItem={updateFoodItem}
              deleteFoodItem={deleteFoodItem}
            />
          );
        })}
      </Item.Group>
    </>
  );
}

export default RestaurantMenu;
