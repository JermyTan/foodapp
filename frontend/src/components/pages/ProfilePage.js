import React from "react";
import { Menu, Container, Segment, Grid } from "semantic-ui-react";
import EditableAccountForm from "../EditableAccountForm";
import RegisteredCardForm from "../RegisteredCardForm";

function ProfilePage() {
  return (
    <main className="profile-page">
      <Menu size="huge" style={{ opacity: 0 }}></Menu>
      <Container>
        <h1>Profile</h1>
        <Segment raised>
          <Grid columns={2} stackable>
            <Grid.Column
              verticalAlign="middle"
              style={{ display: "flex", alignItems: "center" }}
            >
              <EditableAccountForm />
            </Grid.Column>
            <Grid.Column
              verticalAlign="middle"
              style={{ display: "flex", alignItems: "center" }}
            >
              <RegisteredCardForm />
            </Grid.Column>
          </Grid>
        </Segment>
      </Container>
    </main>
  );
}

export default ProfilePage;
