import React, { useState, useEffect } from "react";
import { Item, Button, Message } from "semantic-ui-react";
import FoodItemSelector from "components/customers/FoodItemSelector";

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
  const [restaurantFoodItems, setRestaurantFoodItems] = useState({});
  const [saveChanges, setSaveChanges] = useState(false);

  useEffect(() => {
    // retrieve the restaurant name under this staff
    setRestaurantName(rname);
    // retrieve restaurant data
    let foodItems = {};
    data.forEach((value) => {
      foodItems[value.name] = value;
    });
    setRestaurantFoodItems(foodItems);
  }, []);

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
  const updateFoodItems = (foodItem) => {
    restaurantFoodItems[foodItem.name] = foodItem;
    setRestaurantFoodItems(restaurantFoodItems);
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
        {Object.entries(restaurantFoodItems).map((pair, index) => {
          let foodItem = pair[1];
          return (
            <FoodItemSelector
              key={index}
              name={foodItem.name}
              price={foodItem.price}
              category={foodItem.category}
              count={foodItem.limit}
              updateSelectedFoodItems={updateFoodItems}
            />
          );
        })}
      </Item.Group>
    </>
  );
}

export default RestaurantMenu;
