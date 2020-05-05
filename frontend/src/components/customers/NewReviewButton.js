import React, { useState } from "react";
import { Button, Label, Modal, Form } from "semantic-ui-react";
import { getUnixTime } from 'date-fns';
import Axios from "axios";

function NewReviewButton(props) {
  const [isModalOpened, setModalOpened] = useState(false);
  const [review, setReview] = useState(props.review);

  const postOrEditReview = (reviewInfo) => {
    const url = `http://localhost:5000/api/customers/review`
    console.log(reviewInfo);
    Axios.post(url, reviewInfo)
      .then((response) => {
        console.log("Successfully added review", response)
      })
      .catch((error) => {
        console.log("Error adding review", error)
      })
  }

  return (
    <Modal
      open={isModalOpened}
      onClose={() => setModalOpened(false)}
      trigger={
        <Button
          as={Label}
          color="teal"
          onClick={() => setModalOpened(true)}
          content="Review"
          style={props.style}
        />
      }
    >
      <Modal.Header>Review for {props.rname}</Modal.Header>

      <Modal.Content>
        <Form>
          <Form.TextArea
            placeholder="Write your review..."
            value={review}
            onChange={(event, data) => {
              setReview(data.value);
            }}
          />
        </Form>
      </Modal.Content>

      <Modal.Actions>
        <Button
          color="red"
          content="Cancel"
          onClick={() => setModalOpened(false)}
        />
        <Button
          color="green"
          content="Submit"
          disabled={!review}
          onClick={() => {
            postOrEditReview({
              review: `'${review}'`,
              oid: props.oid,
              reviewdatetime: getUnixTime(new Date())
            });
            setModalOpened(false);
          }}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default NewReviewButton;
