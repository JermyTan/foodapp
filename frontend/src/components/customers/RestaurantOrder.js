import React, { useState, useEffect } from "react";
import { Button, Icon, Label, Input, Item } from "semantic-ui-react";
import FoodItemSelector from "./FoodItemSelector";
import CheckoutButton from "./CheckoutButton";
import Axios from "axios";
import { startOfToday, addHours, getUnixTime } from 'date-fns'

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

function RestaurantOrder(props) {
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [selectedFoodItems, setSelectedFoodItems] = useState({});
  const [restaurantFoodItems, setRestaurantFoodItems] = useState([]);
  const rname = props.restaurant;
  //TODO: set to 10am to 10pm today
  const start = getUnixTime(addHours(startOfToday(), 10))  //10am today
  const end = getUnixTime(addHours(startOfToday(), 22)) //10pm today
  // console.log("epoch time 10am today", start)
  // console.log("epoch time 10am today", fromUnixTime(start))
  // console.log("epoch time 10pm today", fromUnixTime(end))

  useEffect(() => {
    const url = `http://localhost:5000/api/restaurants/'${rname}'?start=${start}&end=${end}`;
    Axios.get(url)
      .then((response) => {
        let processedData = [];
        response.data.forEach((item) => {
          let processedItem = {};
          processedItem.name = item.fname;
          processedItem.limit = parseInt(item.qtylefttoday);
          processedItem.imgurl = item.imgurl;
          processedItem.price = parseFloat(item.price);
          processedItem.category = item.categories[0];
          processedData.push(processedItem);
        });
        setRestaurantFoodItems(processedData);
        console.log("Retrieved restaurant food items:", processedData);
      })
      .catch((error) => {
        console.log(rname);
        console.log("Error retrieving restaurant items:", error);
      });
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
  const updateSelectedFoodItems = (selectedFoodItem) => {
    if (selectedFoodItems[selectedFoodItem.name] === undefined) {
      selectedFoodItems[selectedFoodItem.name] = selectedFoodItem;
    } else if (selectedFoodItem.quantity <= 0) {
      delete selectedFoodItems[selectedFoodItem.name];
    } else {
      selectedFoodItems[selectedFoodItem.name].quantity =
        selectedFoodItem.quantity;
    }

    setSelectedFoodItems(selectedFoodItems);
    updateTotalPrice();
  };

  const updateTotalPrice = () => {
    let subtotal = 0;
    for (let [key, value] of Object.entries(selectedFoodItems)) {
      subtotal += value.quantity * value.price;
    }

    setSubtotal(subtotal);
    setTotal(subtotal + props.deliveryInfo.deliveryFee);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>{props.restaurant}</h1>
        <span>
          <Input labelPosition="left" type="text" fluid>
            <Label basic>$</Label>
            <input
              disabled
              style={{ opacity: "1" }}
              value={subtotal.toFixed(2)}
            />
          </Input>

          <Button.Group widths="2" style={{ minWidth: "20vw" }}>
            <CheckoutButton
              subtotal={subtotal.toFixed(2)}
              total={total.toFixed(2)}
              restaurant={props.restaurant}
              deliveryInfo={props.deliveryInfo}
              selectedFoodItems={selectedFoodItems}
            />

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

      <h3>Minimum order amount required: </h3>

      <Item.Group divided>
        {restaurantFoodItems.map((foodItem, index) => {
          return (
            <FoodItemSelector
              key={index}
              name={foodItem.name}
              price={foodItem.price}
              category={foodItem.category}
              limit={foodItem.limit}
              count={0}
              updateSelectedFoodItems={updateSelectedFoodItems}
              imgurl={foodItem.imgurl}
            />
          );
        })}
      </Item.Group>
    </>
  );
}

export default RestaurantOrder;
