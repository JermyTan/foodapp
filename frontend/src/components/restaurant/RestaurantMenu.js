import React from "react";
import { Card, Image, Button } from "semantic-ui-react";

//data
const food1 = {
  id: 1,
  name: "pizza de",
  price: "10"
};

const food2 = {
  id: 2,
  name: "pizza",
  price: "15"
};

const food3 = {
  id: 3,
  name: "pizza",
  price: "15"
};

const food4 = {
  id: 4,
  name: "pizza",
  price: "15"
};

const food5 = {
  id: 5,
  name: "pizza",
  price: "15"
};

function RestaurantMenu() {
  const data = [food1, food2, food3, food4, food5];
  const foodItems = data.map(food => (
    <Card size="default" key={food.id}>
      <Image
        src="https://www.foodista.com/sites/default/files/default_images/placeholder_rev.png"
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header style={{ float: "left" }}>{food.name}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <Card.Meta>
          <Card.Description style={{ float: "left" }}>
            {`$` + food.price}
          </Card.Description>
        </Card.Meta>
        <Button style={{ float: "right" }} icon="plus"></Button>
      </Card.Content>
    </Card>
  ));

  return (
    <main className="restaurant-page">
      <div className="site-card-wrapper">
        <Card.Group itemsPerRow={4}>{foodItems}</Card.Group>
      </div>
    </main>
  );
}

export default RestaurantMenu;
