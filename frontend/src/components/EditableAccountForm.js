import React, { useState, useEffect } from "react";
import { Form, Header, Button, Message } from "semantic-ui-react";

const data = {
  name: "Jeremy",
  email: "helloword@gmail.com",
  password: "helloword"
};

function EditableAccountForm() {
  const [isEditing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [didUpdateSuccessfully, setUpdateSuccessfully] = useState(false);

  const resetState = () => {
    setName(data.name);
    setEmail(data.email);
    setPassword(data.password);
  };

  useEffect(() => {
    resetState();
  }, []);

  return (
    <>
      <Form>
        <Header>Account Information</Header>
        <Form.Input
          label="Name"
          icon="user"
          iconPosition="left"
          value={name}
          onChange={(event, data) => setName(data.value)}
          disabled={!isEditing}
        />
        <Form.Input
          label="Email"
          icon="mail"
          iconPosition="left"
          type="email"
          value={email}
          onChange={(event, data) => setEmail(data.value)}
          disabled={!isEditing}
        />
        <Form.Input
          label="Password"
          icon="lock"
          iconPosition="left"
          type={isEditing ? "text" : "password"}
          value={password}
          onChange={(event, data) => setPassword(data.value)}
          disabled={!isEditing}
        />
        <Button.Group widths="2">
          <Button
            content={isEditing ? "Cancel" : "Edit"}
            secondary
            onClick={() => {
              !isEditing && setUpdateSuccessfully(false);
              isEditing && resetState();
              setEditing(!isEditing);
            }}
          />
          <Button
            content="Confirm"
            primary
            disabled={!isEditing}
            onClick={() => {
              setEditing(false);
              setUpdateSuccessfully(true);
            }}
          />
        </Button.Group>
      </Form>
      {didUpdateSuccessfully && (
        <Message success content="Successfully updated" />
      )}
    </>
  );
}

export default EditableAccountForm;
