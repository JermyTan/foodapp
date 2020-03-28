import React from "react";
import { Card, Search } from "semantic-ui-react";
import RestaurantCard from "./RestaurantCard";

function AllRestaurants(props) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Restaurants</h1>
        <span>
          <Search />
        </span>
      </div>

      <Card.Group>
        <RestaurantCard setSelectedRestaurant={props.setSelectedRestaurant} />
        <RestaurantCard setSelectedRestaurant={props.setSelectedRestaurant} />
        <RestaurantCard setSelectedRestaurant={props.setSelectedRestaurant} />
        <RestaurantCard setSelectedRestaurant={props.setSelectedRestaurant} />
        <RestaurantCard setSelectedRestaurant={props.setSelectedRestaurant} />
      </Card.Group>
    </>
  );
}

export default AllRestaurants;
