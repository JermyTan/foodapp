import React from "react";
import { Menu, Container } from "semantic-ui-react";

function ProfilePage() {
  return (
    <main className="profile-page">
      <Menu size="huge" style={{ opacity: 0 }}></Menu>
      <br />
      <br />
      <Container>
        <h1>This is the profile page</h1>
      </Container>
    </main>
  );
}

export default ProfilePage;
