import React, { useContext } from "react";
import { Menu, Container, Segment, Grid } from "semantic-ui-react";
import EditableAccountForm from "components/customers/EditableAccountForm";
import RegisteredCardForm from "components/customers/RegisteredCardForm";
import UserContext from "utils/UserContext";
import { CUSTOMER } from "utils/Constants";

function ProfilePage() {
  const { role } = useContext(UserContext);

  return (
    <main className="profile-page">
      <Menu size="huge" style={{ opacity: 0 }}></Menu>
      <Container>
        <h1>Profile</h1>
        <Segment raised>
          <Grid columns={role === CUSTOMER ? 2 : 1} stackable>
            <Grid.Column
              verticalAlign="middle"
              style={{ display: "flex", alignItems: "center" }}
            >
              <EditableAccountForm />
            </Grid.Column>
            {role === CUSTOMER && (
              <Grid.Column
                verticalAlign="middle"
                style={{ display: "flex", alignItems: "center" }}
              >
                <RegisteredCardForm />
              </Grid.Column>
            )}
          </Grid>
        </Segment>
      </Container>
      <br />
      <br />
      <br />
    </main>
  );
}

export default ProfilePage;
