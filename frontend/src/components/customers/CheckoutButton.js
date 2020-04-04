import React, { useState } from "react";
import { Button, Icon, Modal, Header } from "semantic-ui-react";

function CheckoutButton(props) {
  const [isModalOpened, setModalOpened] = useState(false);

  return (
    <Modal
      size="tiny"
      open={isModalOpened}
      onClose={() => setModalOpened(false)}
      trigger={
        <Button
          animated="vertical"
          color="teal"
          disabled={Object.keys(props.selectedFoodItems).length === 0}
          onClick={() => setModalOpened(true)}
        >
          <Button.Content hidden>Checkout</Button.Content>
          <Button.Content visible>
            <Icon name="shop" />
          </Button.Content>
        </Button>
      }
    >
      <Modal.Header>{props.restaurant}</Modal.Header>

      <Modal.Content>
        <Modal.Description>
          <Header>Order Summary</Header>
          <strong>Deliver to: {props.deliveryInfo.location}</strong>
        </Modal.Description>
      </Modal.Content>

      <Modal.Content>
        <Modal.Description>
          {Object.entries(props.selectedFoodItems).map(value => {
            let name = value[0];
            let selectedFoodItem = value[1];
            return (
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                {`${selectedFoodItem.quantity}x ${name}`}
                <span>
                  $
                  {(selectedFoodItem.quantity * selectedFoodItem.price).toFixed(
                    2
                  )}
                </span>
              </div>
            );
          })}
        </Modal.Description>
      </Modal.Content>

      <Modal.Content>
        <Modal.Description>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            Subtotal
            <span>${props.subtotal}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            Delivery fee
            <span>${props.deliveryInfo.deliveryFee.toFixed(2)}</span>
          </div>
          <br />
          <strong>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              Total
              <span>${props.total}</span>
            </div>
          </strong>
        </Modal.Description>
      </Modal.Content>

      <Modal.Actions>
        <Button
          color="red"
          content="Cancel"
          onClick={() => setModalOpened(false)}
        />
        <Button
          color="green"
          content="Place Order"
          onClick={() => setModalOpened(false)}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default CheckoutButton;
