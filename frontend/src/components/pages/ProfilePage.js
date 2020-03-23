import React from "react";
import { Menu, Container, Segment, Grid } from "semantic-ui-react";
import EditableAccountForm from "../EditableAccountForm";

function ProfilePage() {
  return (
    <main className="profile-page">
      <Menu size="huge" style={{ opacity: 0 }}></Menu>
      <Container>
        <h1>Profile</h1>
        <Segment raised size="massive">
          <Grid columns={2} relaxed stackable>
            <Grid.Column
              verticalAlign="middle"
              style={{ display: "flex", alignItems: "center" }}
            >
              <EditableAccountForm />
            </Grid.Column>
          </Grid>
        </Segment>
      </Container>
    </main>
  );
}

export default ProfilePage;
