import React from "react";
import { Card, Search, Input } from "semantic-ui-react";
import RestaurantCard from "./RestaurantCard";
import "styles/AllRestaurants.scss";

function AllRestaurants(props) {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between"
        }}
      >
        <h1>Restaurants</h1>
        <span>
          <Input
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

      {props.location && (
        <Card.Group>
          <RestaurantCard setSelectedRestaurant={props.setSelectedRestaurant} />
          <RestaurantCard setSelectedRestaurant={props.setSelectedRestaurant} />
          <RestaurantCard setSelectedRestaurant={props.setSelectedRestaurant} />
          <RestaurantCard setSelectedRestaurant={props.setSelectedRestaurant} />
          <RestaurantCard setSelectedRestaurant={props.setSelectedRestaurant} />
        </Card.Group>
      )}
    </>
  );
}

export default AllRestaurants;
