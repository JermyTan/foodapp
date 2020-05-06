import React, { useState, useEffect, useContext } from "react";
import {
  Form,
  Header,
  Button,
  Message,
  Statistic,
  Icon,
  Loader,
} from "semantic-ui-react";
import UserContext from "utils/UserContext";
import axios from "axios";

function RegisteredCardForm() {
  const { uid } = useContext(UserContext);
  const [isEditing, setEditing] = useState(false);
  const [cardNum, setCardNum] = useState("");
  const [newCardNum, setNewCardNum] = useState("");
  const [didUpdateSuccessfully, setUpdateSuccessfully] = useState(false);
  const [inputLoading, setInputLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [rewardPoints, setRewardPoints] = useState("");

  const resetState = () => {
    setNewCardNum(cardNum);
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/customers/${uid}`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          let { cardnum, rpoints } = response.data;
          setCardNum(cardnum ?? "");
          setNewCardNum(cardnum ?? "");
          setRewardPoints(rpoints);
        }
        setInputLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onConfirm = () => {
    let cardnum = newCardNum === "" ? 0 : parseInt(newCardNum);
    if (!(cardnum >= 0)) {
      return;
    }

    setLoading(true);

    axios
      .put(`http://localhost:5000/api/customers/${uid}`, {
        cardnum: cardnum,
      })
      .then((response) => {
        if (response.status === 200) {
          setCardNum(newCardNum);
          setEditing(false);
          setUpdateSuccessfully(true);
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
        <Header>Reward Points</Header>
        <Statistic size="small">
          <Statistic.Value>
            {inputLoading ? <Loader active inline /> : rewardPoints}{" "}
            <Icon name="star" />
          </Statistic.Value>
        </Statistic>
        <Header>Registered Card</Header>
        <Form.Input
          label="Card Number"
          icon="credit card"
          iconPosition="left"
          value={newCardNum}
          onChange={(event, data) => setNewCardNum(data.value)}
          disabled={!isEditing}
          loading={inputLoading}
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

export default RegisteredCardForm;
