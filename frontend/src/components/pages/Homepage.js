import React, { useState } from "react";
import { Menu, Container } from "semantic-ui-react";
import AllRestaurants from "../AllRestaurants";
import RestaurantOrder from "../RestaurantOrder";

function Homepage() {
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [location, setLocation] = useState("");

  return (
    <main className="homepage">
      <Menu size="huge" style={{ opacity: 0 }} />
      <Container>
        {selectedRestaurant === "" ? (
          <AllRestaurants
            location={location}
            setLocation={setLocation}
            setSelectedRestaurant={setSelectedRestaurant}
          />
        ) : (
          <RestaurantOrder
            deliveryInfo={{
              location: location,
              deliveryFee: 3.99
            }}
            restaurant={selectedRestaurant}
            setSelectedRestaurant={setSelectedRestaurant}
          />
        )}
      </Container>
    </main>
  );
}

export default Homepage;
