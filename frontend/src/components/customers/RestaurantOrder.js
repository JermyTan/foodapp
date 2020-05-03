import React, { useState, useEffect } from "react";
import { Button, Icon, Label, Input, Item } from "semantic-ui-react";
import FoodItemSelector from "./FoodItemSelector";
import CheckoutButton from "./CheckoutButton";
import Axios from "axios";

const data = [
  {
    name: "Curry Chicken with Rice",
    price: 6.3,
    category: "Asian",
    limit: 5
  },
  {
    name: "Dry Mee Siam",
    price: 5.6,
    category: "Malay",
    limit: 3
  },
  {
    name: "Ice Milo",
    price: 1.3,
    category: "Drinks",
    limit: 10
  },
  {
    name: "Fried Bee Hoon",
    price: 4.3,
    category: "Asian",
    limit: 8
  },
  {
    name: "Lu Rou Fan",
    price: 7.99,
    category: "Asian",
    limit: 5
  },
  {
    name: "Peanut Butter Thick Toast",
    price: 2.1,
    category: "Asian",
    limit: 10
  }
];
function RestaurantOrder(props) {
  const [total, setTotal] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [selectedFoodItems, setSelectedFoodItems] = useState({});
  const [data, setRestaurantData] = useState([]);
  const rname = props.restaurant
  //TODO: set to 10am to 10pm today
  const start = 0 //10am today
  const end = 123445120003 //10pm today


  useEffect(() => {
    const url =
      `http://localhost:5000/api/restaurants/'${rname}'?start=${start}&end=${end}`
    Axios.get(url)
      .then(response => {
        console.log("Retrieve restaurant and food items:", response.data)
        let processedData = []
        response.data.forEach(item => {
          item.price = parseFloat(item.price)
          item.qtylefttoday = parseInt(item.qtylefttoday)
          processedData.push(item)
        });
        setRestaurantData(processedData)
      })
      .catch(error => {
        console.log(rname)
        console.log("Error retrieving restaurant items:", error);
      })
  }, [])


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

      <Item.Group divided>
        {data.map((value, index) => {
          return (
            <FoodItemSelector
              key={index}
              name={value.fname}
              price={value.price}
              category={value.categories}
              limit={value.limit}
              qtyleft={value.qtylefttoday}
              updateSelectedFoodItems={updateSelectedFoodItems}
              imgurl={value.imgurl}
            />
          );
        })}
      </Item.Group>
    </>
  );
}

export default RestaurantOrder;
