import React, { useState, useEffect } from "react";
import { Card, Search, Input, Segment } from "semantic-ui-react";
import RestaurantCard from "./RestaurantCard";
import "styles/AllRestaurants.scss";
import Axios from "axios";

function AllRestaurants(props) {
  const [restaurantsData, setRestaurantData] = useState([]);
  const [loading, setLoading] = useState(true);

  const url = `http://localhost:5000/api/restaurants`;
  useEffect(() => {
    Axios.get(url)
      .then((response) => {
        console.log("response", response.data);
        setRestaurantData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error retrieving past orders:", error);
      });
  }, []);

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
            onChange={(event, data) => {
              props.setLocation(data.value);
            }}
          />
        </span>
        <span>
          <Search placeholder="Search category..." />
        </span>
      </div>

      {props.location &&
        (loading ? (
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
        ))}
    </>
  );
}

export default AllRestaurants;
