import React, { useState } from "react";
import { Menu, Container, Search, Card, Button, Icon } from "semantic-ui-react";
import RestaurantCard from "../RestaurantCard";

function Homepage() {
  const [selectedRestaurant, setSelectedRestaurant] = useState("");

  return (
    <main className="homepage">
      <Menu size="huge" style={{ opacity: 0 }} />
      <Container>
        {selectedRestaurant === "" ? (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1>Restaurants</h1>
              <span>
                <Search />
              </span>
            </div>

            <Card.Group>
              <RestaurantCard setSelectedRestaurant={setSelectedRestaurant} />
              <RestaurantCard setSelectedRestaurant={setSelectedRestaurant} />
              <RestaurantCard setSelectedRestaurant={setSelectedRestaurant} />
              <RestaurantCard setSelectedRestaurant={setSelectedRestaurant} />
              <RestaurantCard setSelectedRestaurant={setSelectedRestaurant} />
            </Card.Group>
          </>
        ) : (
          <>
            <h1>{selectedRestaurant}</h1>
            <Button
              fluid
              animated="fade"
              onClick={() => setSelectedRestaurant("")}
              color="red"
            >
              <Button.Content visible>
                <Icon name="close" />
              </Button.Content>
              <Button.Content hidden content="Cancel order" />
            </Button>
            <h1>To be implemented</h1>
          </>
        )}
      </Container>
    </main>
  );
}

export default Homepage;
