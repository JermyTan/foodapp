import React, { useState, useEffect, useContext } from "react";
import { Item, Button, Message, Segment, Form, Input, Label, Loader } from "semantic-ui-react";
import FoodItemEditor from "./FoodItemEditor";
import NewItemButton from "./NewItemButton";
import Axios from "axios";
import UserContext from "utils/UserContext";

// const data = [
//   {
//     name: "Curry Chicken with Rice",
//     price: 6.3,
//     category: "Asian",
//     limit: 5,
//   },
//   {
//     name: "Dry Mee Siam",
//     price: 5.6,
//     category: "Malay",
//     limit: 3,
//   },
//   {
//     name: "Ice Milo",
//     price: 1.3,
//     category: "Drinks",
//     limit: 10,
//   },
//   {
//     name: "Fried Bee Hoon",
//     price: 4.3,
//     category: "Asian",
//     limit: 8,
//   },
//   {
//     name: "Lu Rou Fan",
//     price: 7.99,
//     category: "Asian",
//     limit: 5,
//   },
//   {
//     name: "Peanut Butter Thick Toast",
//     price: 2.1,
//     category: "Asian",
//     limit: 10,
//   },
// ];

function RestaurantMenu() {
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantFoodItems, setRestaurantFoodItems] = useState([]);
  const [saveChanges, setSaveChanges] = useState(false);
  const [minAmt, setMinAmt] = useState(0);
  const [loading, setLoading] = useState(true);
  const { uid } = useContext(UserContext);

  useEffect(() => {
    fetchData();
  }, []);

  const updateFoodItem = (key, value, index) => {
    let clone = [...restaurantFoodItems];
    let affectedItem = clone[index];
    let itemClone = {
      name: affectedItem.name,
      price: affectedItem.price,
      category: affectedItem.category,
      limit: affectedItem.limit,
      imgurl: affectedItem.imgurl,
      ogname: affectedItem.ogname
    };
    itemClone[key] = value;
    clone[index] = itemClone;
    setRestaurantFoodItems(clone);
  };

  const fetchData = () => {
    setLoading(true);
    const url = `http://localhost:5000/api/staffs/${uid}`;
    Axios.get(url)
      .then((response) => {
        let rname = response.data.rname;
        setRestaurantName(rname);
        const url2 = `http://localhost:5000/api/restaurants/${rname}/menu`;
        Axios.get(url2)
          .then((response) => {
            let minamt = response.data.minamt;
            let menu = response.data.menu;
            setRestaurantFoodItems(menu);
            setMinAmt(minamt);
            setLoading(false);
          })
          .catch((error) => {
            console.log("Error fetching staff menu data", error);
          });
      })
      .catch((error) => {
        console.log("Error fetching staff restaurant", error);
      });
  };

  // const deleteFoodItem = (index) => {
  const deleteFoodItem = (name) => {
    console.log("Delete this item:", name);
    const url = `http://localhost:5000/api/restaurants/'${restaurantName}'/menu`;
    Axios.delete(url, { data: { fname: `'${name}'` } })
      .then((response) => {
        console.log("Deleted item from menu:", response.data);
        fetchData();
      })
      .catch((error) => {
        console.log("Error occurred deleting item from menu", error);
      });
    //let clone = [...restaurantFoodItems];
    //clone.splice(index, 1);
    //setRestaurantFoodItems(clone);
  };

  const createFoodItem = (foodItem) => {
    const url = `http://localhost:5000/api/restaurants/'${restaurantName}'/menu`;
    console.log(foodItem);
    Axios.post(url, foodItem)
      .then((response) => {
        console.log(response);
        console.log("Item successfully added to the menu");
        fetchData();
      })
      .catch((error) => {
        console.log("An error occured while adding new item to the menu");
        console.log(error.data);
      });
    //setRestaurantFoodItems([foodItem].concat(restaurantFoodItems));
  };

  //parses data in menu
  // const getChanges = () => {
  //   let updatedItems = [];
  //   restaurantFoodItems.forEach((item) => {
  //     let updatedItem = {};
  //     updatedItem.fname = `'${item.name}'`;
  //     updatedItem.cat = `'${item.category}'`;
  //     updatedItem.imgurl = `'${item.imgurl}'`;
  //     updatedItem.flimit = `${item.limit}`;
  //     updatedItem.price = `${item.price}`;
  //     updatedItems.push(updatedItem);
  //   });
  //   return updatedItems;
  // };

  const handleSaveChanges = () => {
    // API call to patch new changes
    let updatedData = {
      updatedMenu: restaurantFoodItems,
      minamt: minAmt,
    };

    const url = `http://localhost:5000/api/restaurants/${restaurantName}/menu`;
    Axios.put(url, updatedData)
      .then((response) => {
        console.log(response.data);
        fetchData();
      })
      .catch((error) => {
        console.log("Error updating menu:", error);
      });

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
        <h1>{loading ? <Loader inline active /> : restaurantName}</h1>
        <span>
          <Button color="blue" onClick={handleSaveChanges}>
            Save changes
          </Button>
          <NewItemButton createFoodItem={createFoodItem} />
        </span>
      </div>

      <Form>
        <Form.Field inline>
          <label>Min order amount</label>
          <Input
            type="number"
            label={<Label basic>$</Label>}
            labelPosition="left"
            value={minAmt}
            size="mini"
            onChange={(event, data) => {
              let newMinAmt = Number(Number(data.value).toFixed(2));
              setMinAmt(newMinAmt);
            }}
            disabled={loading}
            loading={loading}
          />
        </Form.Field>
      </Form>

      {loading ? (
        <Segment
          size="massive"
          basic
          placeholder
          textAlign="center"
          loading={loading}
        />
      ) : (
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
                  imgurl={value.imgurl}
                  updateFoodItem={updateFoodItem}
                  deleteFoodItem={deleteFoodItem}
                />
              );
            })}
          </Item.Group>
        )}
    </>
  );
}

export default RestaurantMenu;
