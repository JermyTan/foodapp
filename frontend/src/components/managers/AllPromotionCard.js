import React from "react";
import { Card, Label } from "semantic-ui-react";
import { format, fromUnixTime } from 'date-fns'

function PromotionCard(props) {
    const promo = props.promo

    function checkTime() {
        if ((Date.now() - promo.edatetime) > 0) {
            return 1;
        } else if ((Date.now() - promo.sdatetime) < 0) {
            return 2;
        } else {
            return 0;
        }
    }

    function getPromoStatus() {
        switch (checkTime()) {
            case 1:
                return "Expired"
            case 2:
                return "Upcoming"
            default:
                return "Ongoing"
        }
    }

    return (
        <Card fluid raised color={'purple'}>
            <Card.Content>
                <Card.Header
                    style={{ display: "flex", justifyContent: "space-between" }}>
                    Promotion ID: {promo.pid}
                </Card.Header>
            </Card.Content>
            <Card.Content>
                <Card.Description>
                    <div style={{ fontWeight: 'bold' }}>
                        {format(promo.sdatetime, 'dd/MM/yyyy hh:mm aa ')} -
                        {format(promo.edatetime, ' dd/MM/yyyy hh:mm aa')}
                    </div>
                    <span>
                        {<Label
                            color={checkTime() === 1 ? 'red' : (checkTime() === 2 ? 'grey' : 'green')}
                            style={{ marginLeft: "1000px" }}>
                            {getPromoStatus()}
                        </Label>}
                    </span>
                    <br />
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        Promotion details: {promo.discount * 100}% discount
                    </div>
                </Card.Description>
            </Card.Content>

        </Card>
    );
}

export default PromotionCard;