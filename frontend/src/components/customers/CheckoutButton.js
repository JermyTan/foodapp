import React, { useState, useContext, useEffect } from "react";
import { Button, Icon, Modal, Header, Radio } from "semantic-ui-react";
import Axios from "axios";
import { getUnixTime } from "date-fns";
import UserContext from "utils/UserContext";
import { useHistory } from "react-router-dom";

function CheckoutButton(props) {
  const [isModalOpened, setModalOpened] = useState(false);
  const [isPayByCard, setPayByCard] = useState(0);
  const [cardNum, setCardNum] = useState();
  const { uid } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    Axios.get(`http://localhost:5000/api/customers/${uid}`)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          let { cardnum } = response.data;
          setCardNum(cardnum ?? "");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const makeOrder = () => {
    setLoading(true);
    console.log("selected food items", props.selectedFoodItems);
    let orderTime = getUnixTime(new Date());

    //Get list of riders working at this time
    const riderUrl = `http://localhost:5000/api/riders/order?time=${orderTime}`;
    Axios.get(riderUrl)
      .then((response) => {
        let riderIds = response.data.rid;
        if (riderIds.length == 0) {
          console.log("No riders available at this time!");
          console.log("Assigning to default rider:");
        }
        console.log("Riders available:", riderIds);
        let chosenRider = 127;
        let parsedItems = [];
        let chosenItems = props.selectedFoodItems;
        for (var key in chosenItems) {
          if (chosenItems.hasOwnProperty(key)) {
            let item = chosenItems[key];
            let parsedItem = {};
            parsedItem.fname = `'${item.name}'`;
            parsedItem.qty = `${item.quantity}`;
            parsedItem.itemprice = `${item.price}`;
            parsedItems.push(parsedItem);
          }
        }
        console.log(parsedItems);
        const url = `http://localhost:5000/api/orders`;
        Axios.post(url, {
          location: `'${props.deliveryInfo.location}'`,
          dfee: `'${props.deliveryInfo.deliveryFee}'`,
          odatetime: `${orderTime}`,
          cid: `${uid}`,
          paymethod: `${isPayByCard}`,
          rname: `'${props.restaurant}'`,
          fprice: `${props.subtotal}`,
          rid: `${chosenRider}`,
          foodlist: parsedItems,
        })
          .then((response) => {
            console.log("'Successfully created order", response);
            setLoading(false);
            history.push("/history");
          })
          .catch((error) => {
            setLoading(false);
            console.log("Error occured while making an order", error);
          });
      })
      .catch((error) => {
        console.log("Unable to get riders working at this time:", error);
      });
  };

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
          {Object.entries(props.selectedFoodItems).map((value) => {
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

      <Modal.Content>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {!cardNum ? `No registered card (pay by cash)` : `Pay by card`}
          <span>
            <Radio
              toggle
              disabled={!cardNum}
              onClick={() => setPayByCard(Math.abs(isPayByCard - 1))}
            ></Radio>
          </span>
        </div>
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
          loading={loading}
          onClick={() => {
            makeOrder();
            //setModalOpened(false)
          }}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default CheckoutButton;
