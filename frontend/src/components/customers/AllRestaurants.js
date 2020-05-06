import React, { useState, useEffect, useContext } from "react";
import { Card, Search, Input, Segment } from "semantic-ui-react";
import RestaurantCard from "./RestaurantCard";
import "styles/AllRestaurants.scss";
import Axios from "axios";
import UserContext from "utils/UserContext";

function AllRestaurants(props) {
  const [restaurantsData, setRestaurantData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deliveryLocations, setDeliveryLocations] = useState([]);
  const { uid } = useContext(UserContext);

  useEffect(() => {
    const url = `http://localhost:5000/api/restaurants`;
    Axios.get(url)
      .then((response) => {
        console.log("response", response.data);
        setRestaurantData(response.data);
        setLoading(false);
        getDeliveryLocations();
      })
      .catch((error) => {
        console.log("Error retrieving restaurants:", error);
      });
  }, []);

  const getDeliveryLocations = () => {
    const url = `http://localhost:5000/api/customers/${uid}/locations`;
    Axios.get(url)
      .then((response) => {
        console.log("Fetch recent delivery locations", response.data);
        setDeliveryLocations(response.data);
      })
      .catch((error) => {
        console.log("Unable to fetch recent delivery locations", error);
      });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <h1>Restaurants</h1>
        <span>
          <Input
            className="rounded-input"
            placeholder="Enter location..."
            iconPosition="left"
            icon="location arrow"
            value={props.location}
            list="orderLocations"
            onChange={(event, data) => {
              props.setLocation(data.value);
            }}
          />
          <datalist id="orderLocations">
            {deliveryLocations.map((value) => {
              return <option value={value.location} />;
            })}
          </datalist>
        </span>
        <span>
          <Search placeholder="Search category..." />
        </span>
      </div>

      {props.location ? (
        loading ? (
          <Segment
            size="massive"
            basic
            placeholder
            loading={loading}
            textAlign="center"
          />
        ) : (
          <Card.Group>
            {restaurantsData.map((value, index) => {
              return (
                <RestaurantCard
                  key={index}
                  restaurant={value}
                  setSelectedRestaurant={props.setSelectedRestaurant}
                />
              );
            })}
          </Card.Group>
        )
      ) : (
        <Segment
          size="massive"
          basic
          placeholder
          textAlign="center"
          content="You have not selected a location"
        />
      )}
    </>
  );
}

export default AllRestaurants;
