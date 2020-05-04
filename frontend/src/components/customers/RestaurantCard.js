import React from "react";
import { Card, Image, Rating, Button } from "semantic-ui-react";
import "styles/reactive.scss";
import ReviewsButton from "./ReviewsButton";

const data = {
  name: "Toast Box (West Coast Plaza)",
  categories: ["Asian", "Noodle", "Soup"],
  rating: 4.5,
  promotions: ["10% off all users", "$7 off first-time users"],
};

function RestaurantCard(props) {
  const restaurant = props.restaurant;

  return (
    <Card fluid raised className="reactive-card" onClick={() => {}}>
      <Image
        src={restaurant.imgurl}
        ui="false"
        style={{ maxHeight: "25vh" }}
        onClick={() => props.setSelectedRestaurant(restaurant.rname)}
      />
      <Card.Content>
        <Card.Header
          style={{ display: "flex", justifyContent: "space-between" }}
          onClick={() => props.setSelectedRestaurant(restaurant.rname)}
        >
          {restaurant.rname}
          <span>
            {data.rating} <Rating icon="star" disabled defaultRating="1" />
          </span>
        </Card.Header>

        <Card.Meta style={{ display: "flex", justifyContent: "space-between" }}>
          {restaurant.categories.join(", ")}

          <ReviewsButton rname={restaurant.rname} />
        </Card.Meta>

        <br />
        <Card.Description
          onClick={() => props.setSelectedRestaurant(restaurant.rname)}
        >
          $3.99 delivery fee
          {data.promotions.map((value) => {
          return (
            <>
              <br />
              <strong style={{ color: "#0d97ff" }}>{value}</strong>
            </>
          );
        })}
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

export default RestaurantCard;
