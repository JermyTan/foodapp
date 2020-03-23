import React from "react";
import { Form, Header, Button } from "semantic-ui-react";

function EditableAccountForm() {
  return (
    <Form>
      <Header>Account Information</Header>
      <Form.Input label="Name" icon="user" iconPosition="left" />
      <Form.Input label="Email" icon="mail" iconPosition="left" type="email" />
      <Form.Input
        label="Password"
        icon="lock"
        iconPosition="left"
        type="password"
      />
      <Button.Group fluid widths="2">
        <Button content="Edit" secondary />
        <Button content="Confirm" primary />
      </Button.Group>
    </Form>
  );
}

export default EditableAccountForm;
