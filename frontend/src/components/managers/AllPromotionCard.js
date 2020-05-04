import React from "react";
import { Card, Label } from "semantic-ui-react";
import { format } from "date-fns";

function PromotionCard(props) {
  // const promo = props.promo

  function checkTime() {
    if (Date.now() - props.edatetime > 0) {
      return 1;
    } else if (Date.now() - props.sdatetime < 0) {
      return 2;
    } else {
      return 0;
    }
  }

  function getPromoStatus() {
    switch (checkTime()) {
      case 1:
        return "Expired";
      case 2:
        return "Upcoming";
      default:
        return "Ongoing";
    }
  }

  function getDescription() {
    switch (props.discount) {
      case 1:
        return "Free Delivery";
      default:
        return (props.discount * 100).toPrecision(2) + "% discount";
    }
  }

  return (
    <Card fluid raised color={"purple"}>
      <Card.Content>
        <Card.Header
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          Promotion ID: {props.pid}
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Description>
          <div style={{ fontWeight: "bold" }}>
            Start: {format(props.sdatetime, "dd/MM/yyyy hh:mm aa ")}
            <br />
            End: {format(props.edatetime, " dd/MM/yyyy hh:mm aa")}
          </div>
          <span>
            {
              <Label
                color={
                  checkTime() === 1
                    ? "red"
                    : checkTime() === 2
                      ? "grey"
                      : "green"
                }
                style={{ marginLeft: "1000px" }}
              >
                {getPromoStatus()}
              </Label>
            }
          </span>
          <br />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            Promotion details: {getDescription()}
          </div>
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

export default PromotionCard;
