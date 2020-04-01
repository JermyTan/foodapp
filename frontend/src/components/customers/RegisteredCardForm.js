import React, { useState, useEffect } from "react";
import { Form, Header, Button, Message } from "semantic-ui-react";

const data = {
  cardNum: "343241234241223"
};

function RegisteredCardForm() {
  const [isEditing, setEditing] = useState(false);
  const [cardNum, setCardNum] = useState("");
  const [didUpdateSuccessfully, setUpdateSuccessfully] = useState(false);

  const resetState = () => {
    setCardNum(data.cardNum);
  };

  useEffect(() => {
    resetState();
  }, []);

  return (
    <>
      <Form>
        <Header>Registered Card</Header>
        <Form.Input
          label="Card Number"
          icon="credit card"
          iconPosition="left"
          value={cardNum}
          onChange={(event, data) => setCardNum(data.value)}
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

export default RegisteredCardForm;
