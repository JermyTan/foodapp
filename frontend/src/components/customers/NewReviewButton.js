import React, { useState } from "react";
import { Button, Label, Modal, Form } from "semantic-ui-react";

function NewReviewButton(props) {
  const [isModalOpened, setModalOpened] = useState(false);
  const [review, setReview] = useState("");

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
            setModalOpened(false);
          }}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default NewReviewButton;
