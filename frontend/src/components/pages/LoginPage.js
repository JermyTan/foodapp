import React, { useState } from "react";
import {
  Container,
  Grid,
  Segment,
  Icon,
  Form,
  Header,
} from "semantic-ui-react";
import axios from "axios";
import { CUSTOMER, STAFF, RIDER, MANAGER } from "utils/Constants";

function LoginPage(props) {
  const [signingUp, setSigningUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState(CUSTOMER);
  const [riderType, setRiderType] = useState(0);
  const [restaurant, setRestaurant] = useState("");

  const onLogin = () => {
    axios
      .get(`http://localhost:5000/api/users/login?email=${email}`)
      .then((response) => {
        if (response.status === 200) {
          let { id, role } = response.data;
          props.login(id, role);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSignUp = () => {
    var postRequest;

    switch (newRole) {
      case CUSTOMER:
        postRequest = axios.post("http://localhost:5000/api/customers", {
          name: name,
          email: newEmail,
        });
        break;
      case STAFF:
        postRequest = axios.post("http://localhost:5000/api/staffs", {
          name: name,
          email: newEmail,
          rname: restaurant,
        });
        break;
      case RIDER:
        postRequest = axios.post("http://localhost:5000/api/riders", {
          name: name,
          email: newEmail,
          isFT: riderType.toString(),
        });
        break;
      case MANAGER:
        postRequest = axios.post("http://localhost:5000/api/managers", {
          name: name,
          email: newEmail,
        });
        break;
      default:
        console.log("Unknown role");
        return;
    }

    postRequest
      .then((response) => {
        if (response.status === 200) {
          toggleRegister();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const isInvalid = () => {
    return (
      signingUp &&
      (!name || !newEmail || !password || (newRole === STAFF && !restaurant))
    );
  };

  const toggleRegister = () => {
    setSigningUp(!signingUp);
    setName("");
    setEmail("");
    setNewEmail("");
    setPassword("");
    setRiderType(0);
    setNewRole(CUSTOMER);
    setRestaurant("");
  };

  return (
    <main className="login-page" style={{ height: "100vh", overflow: "auto" }}>
      <Container>
        <Grid
          style={{ height: "100vh" }}
          textAlign="center"
          verticalAlign="middle"
        >
          <Grid.Column>
            <Segment raised placeholder size="massive">
              <Grid columns={2} relaxed="very" stackable>
                <Grid.Column verticalAlign="middle">
                  <Form>
                    <Header>{signingUp ? "Sign up" : "Sign in"}</Header>
                    {signingUp && (
                      <Form.Input
                        icon="user"
                        iconPosition="left"
                        placeholder="Name"
                        onChange={(event, data) => setName(data.value)}
                        value={name}
                      />
                    )}
                    <Form.Input
                      icon="mail"
                      iconPosition="left"
                      placeholder="Email"
                      onChange={(event, data) => {
                        signingUp
                          ? setNewEmail(data.value)
                          : setEmail(data.value);
                      }}
                      value={signingUp ? newEmail : email}
                      type="email"
                    />
                    <Form.Input
                      icon="lock"
                      iconPosition="left"
                      placeholder="Password"
                      type="password"
                      onChange={(event, data) => setPassword(data.value)}
                      value={password}
                    />
                    {signingUp && (
                      <Form.Group inline widths={4}>
                        <Form.Radio
                          label="Customer"
                          value={CUSTOMER}
                          checked={newRole === CUSTOMER}
                          onChange={(event, data) => setNewRole(data.value)}
                        />
                        <Form.Radio
                          label="Staff"
                          value={STAFF}
                          checked={newRole === STAFF}
                          onChange={(event, data) => setNewRole(data.value)}
                        />
                        <Form.Radio
                          label="Rider"
                          value={RIDER}
                          checked={newRole === RIDER}
                          onChange={(event, data) => setNewRole(data.value)}
                        />
                        <Form.Radio
                          label="Manager"
                          value={MANAGER}
                          checked={newRole === MANAGER}
                          onChange={(event, data) => setNewRole(data.value)}
                        />
                      </Form.Group>
                    )}
                    {signingUp && newRole === RIDER && (
                      <Form.Group inline widths={2}>
                        <Form.Radio
                          label="Part-Time"
                          value={0}
                          checked={riderType === 0}
                          onChange={(event, data) => setRiderType(data.value)}
                        />
                        <Form.Radio
                          label="Full-Time"
                          value={1}
                          checked={riderType === 1}
                          onChange={(event, data) => setRiderType(data.value)}
                        />
                      </Form.Group>
                    )}
                    {signingUp && newRole === STAFF && (
                      <Form.Input
                        icon="food"
                        iconPosition="left"
                        placeholder="Restaurant"
                        value={restaurant}
                        onChange={(event, data) => setRestaurant(data.value)}
                      />
                    )}
                    <Form.Button
                      content={signingUp ? "Sign up" : "Login"}
                      primary
                      fluid
                      disabled={isInvalid()}
                      onClick={signingUp ? onSignUp : onLogin}
                    />
                    <Form.Button
                      content={signingUp ? "Back" : "Register"}
                      secondary
                      fluid
                      onClick={toggleRegister}
                    />
                  </Form>
                </Grid.Column>
                <Grid.Column verticalAlign="middle">
                  <Icon name="truck" size="massive" />
                  <h1 style={{ fontSize: "3rem" }}>Food Truck</h1>
                </Grid.Column>
              </Grid>
            </Segment>
          </Grid.Column>
        </Grid>
      </Container>
      <br />
      <br />
      <br />
    </main>
  );
}

export default LoginPage;
