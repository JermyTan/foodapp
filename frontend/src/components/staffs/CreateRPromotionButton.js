import React, { useState, useEffect } from "react";
import { Button, Form, Modal, Message } from "semantic-ui-react";
import Axios from "axios";

function CreatePromotionButton(props) {
  const [isModalOpened, setModalOpened] = useState(false);
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [discount, setDiscount] = useState("");
  const [foodItem, setFoodItem] = useState("");
  const [itemsList, setItemsList] = useState([]);
  const [didCreateSuccessfully, setCreateSuccessfully] = useState(false);
  const [createError, setCreateError] = useState(false);

  var finalDiscount = discount / 100;
  var epochStartDate = new Date(startdate.toString()).getTime();
  var epochEndDate = new Date(enddate.toString()).getTime();

  const getRestaurantItems = () => {
    console.log("props", props)
    const url = `http://localhost:5000/api/restaurants/'${props.rname}'/menu`;
    Axios.get(url)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }


  return (
    <Modal
      size="small"
      open={isModalOpened}
      onOpen={getRestaurantItems}
      onClose={() => setModalOpened(false)}
      trigger={
        <Button
          color="teal"
          onClick={() => setModalOpened(true)}
        >
          <Button.Content>Create New promotion</Button.Content>
        </Button>
      }
    >
      <Modal.Header>Create New Promotion</Modal.Header>

      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Input
              label="Food item promotion:"
              list="orderLocations"
              value={foodItem}
              list={itemsList}
              onChange={(event, data) => {
                setFoodItem(data.value);
              }}
            />
            <Form.Input
              label="Start Date (format: MM/dd/yyyy hh:mm aa)"
              value={startdate}
              onChange={(event, data) => {
                setStartdate(data.value);
              }}
            />
            <Form.Input
              label="End Date (format: MM/dd/yyyy hh:mm aa)"
              value={enddate}
              onChange={(event, data) => {
                setEnddate(data.value);
              }}
            />
            <Form.Input
              label="Discount (eg. input 50 for 50% off)"
              value={discount}
              onChange={(event, data) => {
                console.log(data.value);
                setDiscount(data.value);
              }}
            />
          </Form>

          {didCreateSuccessfully && (
            <Message
              success
              header="Promotion created successfully"
              content="You may close the form"
            />
          )}

          {createError && (
            <Message
              error
              header="Invalid input"
              content="Please follow the format for each field"
            />
          )}
        </Modal.Description>
      </Modal.Content>

      <Modal.Actions>
        <Button
          color="red"
          content="Cancel"
          onClick={() => {
            setModalOpened(false);
            setDiscount("");
            setStartdate("");
            setEnddate("");
          }}
        />
        <Button
          color="blue"
          content="Create"
          onClick={() => {
            // SavePromotion(
            //   epochStartDate / 1000,
            //   epochEndDate / 1000,
            //   finalDiscount,
            //   setCreateError,
            //   setCreateSuccessfully
            // );
          }}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default CreatePromotionButton;
