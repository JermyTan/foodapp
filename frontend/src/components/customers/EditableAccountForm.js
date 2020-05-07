import React, { useState, useEffect, useContext } from "react";
import { Form, Header, Button, Message } from "semantic-ui-react";
import UserContext from "utils/UserContext";
import axios from "axios";

const passwordPlaceholder = "password";

function EditableAccountForm() {
  const { uid, name, email, reload } = useContext(UserContext);
  const [isEditing, setEditing] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [didUpdateSuccessfully, setUpdateSuccessfully] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetState = () => {
    setNewName(name);
    setNewEmail(email);
    setPassword(passwordPlaceholder);
  };

  useEffect(() => {
    resetState();
  }, []);

  const onConfirm = () => {
    setLoading(true);

    axios
      .put(`http://localhost:5000/api/users/${uid}`, {
        name: newName,
        email: newEmail,
      })
      .then((response) => {
        if (response.status === 200) {
          setEditing(false);
          setUpdateSuccessfully(true);
          localStorage.setItem("name", newName);
          localStorage.setItem("email", newEmail);
          reload();
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <>
      <Form>
        <Header>Account Information</Header>
        <Form.Input
          label="Name"
          icon="user"
          iconPosition="left"
          value={newName}
          onChange={(event, data) => {
            setNewName(data.value);
          }}
          disabled={!isEditing}
        />
        <Form.Input
          label="Email"
          icon="mail"
          iconPosition="left"
          type="email"
          value={newEmail}
          onChange={(event, data) => {
            setNewEmail(data.value);
          }}
          disabled={!isEditing}
        />
        <Form.Input
          label="Password"
          icon="lock"
          iconPosition="left"
          type={isEditing ? "text" : "password"}
          value={password}
          onChange={(event, data) => {
            setPassword(data.value);
          }}
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
            loading={loading}
            onClick={onConfirm}
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
