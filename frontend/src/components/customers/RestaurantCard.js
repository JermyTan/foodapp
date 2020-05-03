import React from "react";
import { Card, Image, Rating } from "semantic-ui-react";
import "styles/reactive.scss";

// const data = {
//   name: "Toast Box (West Coast Plaza)",
//   categories: ["Asian", "Noodle", "Soup"],
//   rating: 4.5,
//   promotions: ["10% off all users", "$7 off first-time users"]
// };

function RestaurantCard(props) {
  const data = props.restaurant;

  return (
    <Card
      fluid
      raised
      className="reactive-card"
      onClick={() => props.setSelectedRestaurant(data.rname)}
    >
      <Image src={data.imgurl} ui="false" style={{ maxHeight: "25vh" }} />
      <Card.Content>
        <Card.Header
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          {data.rname}
          <span>
            {data.rating} <Rating icon="star" disabled defaultRating="1" />
          </span>
        </Card.Header>

        <Card.Meta>{data.categories.join(", ")}</Card.Meta>

        <br />
        <Card.Description>
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
