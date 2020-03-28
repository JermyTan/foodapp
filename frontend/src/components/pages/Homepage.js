import React, { useState } from "react";
import { Menu, Container } from "semantic-ui-react";
import AllRestaurants from "../AllRestaurants";
import RestaurantOrder from "../RestaurantOrder";

const deliveryInfo = {
  location: "Woodlands",
  deliveryFee: 3.99
};

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
            deliveryInfo={deliveryInfo}
            restaurant={selectedRestaurant}
            setSelectedRestaurant={setSelectedRestaurant}
          />
        )}
      </Container>
    </main>
  );
}

export default Homepage;
