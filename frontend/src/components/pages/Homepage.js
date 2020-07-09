import React, { useState } from "react";
import { Menu, Container } from "semantic-ui-react";
import AllRestaurants from "components/customers/AllRestaurants";
import RestaurantOrder from "components/customers/RestaurantOrder";

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
              deliveryFee: 3.99 // TODO: change to restaurant dfee wrt to user's location (will require request to backend)
            }}
            restaurant={selectedRestaurant}
            setSelectedRestaurant={setSelectedRestaurant}
          />
        )}
      </Container>
      <br />
      <br />
      <br />
    </main>
  );
}

export default Homepage;
 