import React, { useState } from "react";
import { Menu, Container } from "semantic-ui-react";
import AllRestaurants from "../AllRestaurants";
import RestaurantOrder from "../RestaurantOrder";

function Homepage() {
  const [selectedRestaurant, setSelectedRestaurant] = useState("");

  return (
    <main className="homepage">
      <Menu size="huge" style={{ opacity: 0 }} />
      <Container>
        {selectedRestaurant === "" ? (
          <AllRestaurants setSelectedRestaurant={setSelectedRestaurant} />
        ) : (
          <RestaurantOrder
            restaurant={selectedRestaurant}
            setSelectedRestaurant={setSelectedRestaurant}
          />
        )}
      </Container>
    </main>
  );
}

export default Homepage;
