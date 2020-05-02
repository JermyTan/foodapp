import React, { useState, useEffect } from "react";
import { Menu, Container, Card, Button } from "semantic-ui-react";
import { MonthRangeInput } from "semantic-ui-calendar-react";
import AllPromotionCard from "components/managers/AllPromotionCard";
import CreatePromotionButton from "components/managers/CreatePromotionButton";
import { parse, isBefore, format } from "date-fns";
import Axios from "axios";

function ManagerPromotionPage() {
    const [selectedMonths, setSelectedMonths] = useState("");
    const [promotionsData, setPromotionData] = useState([]);

    const getPeriod = selectedMonths => {
        let period = selectedMonths.split(" - ");
        console.log(period);
        if (period.length < 2 || period[0] === "" || period[1] === "") {
            console.log("period invalid");
            return [];
        }
        let monthA = parse(period[0], "MM/yyyy", new Date());
        let monthB = parse(period[1], "MM/yyyy", new Date());

        if (isBefore(monthB, monthA)) {
            [monthA, monthB] = [monthB, monthA];
        }

        return [monthA, monthB];
    };

    const period = getPeriod(selectedMonths);
    const url = `http://localhost:5000/api/promotions`
    useEffect(() => {
        Axios.get(url)
            .then(response => {
                console.log("response", response.data)
                setPromotionData(response.data)
            })
            .catch(error => {
                console.log("Error retrieving promotions:", error);
            })
    }, [url])

    return (
        <main className="manager-promotion-page">
            <Menu size="huge" style={{ opacity: 0 }}></Menu>
            <Container>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ display: "flex", flexWrap: "wrap" }}>
                        <h2 style={{ marginInlineEnd: "1rem" }}>View Promotions for period</h2>
                        <MonthRangeInput
                            className="rounded-input"
                            clearable
                            placeholder="Select month(s)"
                            popupPosition="bottom center"
                            onChange={(event, data) => {
                                setSelectedMonths(data.value);
                            }}
                            dateFormat="MM/YYYY"
                            value={selectedMonths}
                            closable
                        // maxDate={new Date()}
                        />
                    </span>
                    <span>
                        <Button.Group>
                            <CreatePromotionButton
                            />
                        </Button.Group>
                    </span>
                </div>
                {period.length > 0 ? (
                    <Container>
                        <Card.Group>
                            {promotionsData.filter(date => date.promo.sdatetime >= new Date(period[0].toString()).getTime() &&
                                date.promo.sdatetime <= new Date(period[1].toString()).getTime())
                                .map((value, index) => {
                                    return (
                                        <AllPromotionCard
                                            key={index}
                                            pid={value.promo.pid}
                                            edatetime={value.promo.edatetime}
                                            sdatetime={value.promo.sdatetime}
                                            discount={value.promo.discount}
                                        />
                                    )
                                })}
                        </Card.Group>
                    </Container>
                ) : (
                        <Container>
                            <Card.Group>
                                {promotionsData.map((value, index) => {
                                    return (
                                        <AllPromotionCard
                                            key={index}
                                            // promo={value.promo}
                                            pid={value.promo.pid}
                                            edatetime={value.promo.edatetime}
                                            sdatetime={value.promo.sdatetime}
                                            discount={value.promo.discount}
                                        />
                                    );
                                })}
                            </Card.Group>
                        </Container>
                    )
                }
            </Container >
        </main >
    );
}

export default ManagerPromotionPage;