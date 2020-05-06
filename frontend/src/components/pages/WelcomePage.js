import React, { useContext } from "react";
import { Menu, Container, Icon } from "semantic-ui-react";
import UserContext from "utils/UserContext";

function WelcomePage() {
  const { name } = useContext(UserContext);

  return (
    <main className="welcome-page">
      <Menu size="huge" style={{ opacity: 0 }} />
      <Container textAlign="center">
        <h1>Welcome {name} to</h1>
        <Icon size="massive" name="truck" />
        <h1>Food Truck</h1>
      </Container>
      <br />
      <br />
      <br />
    </main>
  );
}

export default WelcomePage;
