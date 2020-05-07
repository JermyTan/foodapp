import React, { useState, useEffect, useContext } from "react";
import { Menu, Container, Card, Button } from "semantic-ui-react";
import { MonthRangeInput } from "semantic-ui-calendar-react";
import AllPromotionCard from "components/managers/AllPromotionCard";
import CreateRPromotionButton from "components/staffs/CreateRPromotionButton";
import { parse, isBefore, format } from "date-fns";
import Axios from "axios";
import UserContext from "utils/UserContext";

function StaffPromoPage() {
  const [selectedMonths, setSelectedMonths] = useState("");
  const [promotionsData, setPromotionData] = useState([]);
  const { uid } = useContext(UserContext);
  const [restaurantName, setRestaurantName] = useState("");

  useEffect(() => {
    Axios.get(`http://localhost:5000/api/staffs/${uid}`)
      .then((response) => {
        console.log("Fetch restaurant name:", response.data.rname);
        let { rname } = response.data.rname;
        setRestaurantName(rname);
      })
      .catch((error) => {
        console.log("Error retrieving restaurant name of staff " + uid, error)
      })
  }, [])


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

  // const url = `http://localhost:5000/api/promotions`
  // useEffect(() => {
  //     Axios.get(url)
  //         .then(response => {
  //             console.log("response", response.data)
  //             setPromotionData(response.data)
  //         })
  //         .catch(error => {
  //             console.log("Error retrieving promotions:", error);
  //         })
  // }, [url])

  const period = getPeriod(selectedMonths);

  return (
    <main className="staff-promotion-page">
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
              <CreateRPromotionButton
                rname={restaurantName}

              />
            </Button.Group>
          </span>
        </div>
        {period.length > 0 ? (
          <Container>
            <Card.Group>
              {promotionsData.filter(date => date.promo.sdatetime * 1000 >= new Date(period[0].toString()).getTime() &&
                date.promo.sdatetime * 1000 <= new Date(period[1].toString()).getTime())
                .map((value, index) => {
                  return (
                    <AllPromotionCard
                      key={index}
                      pid={value.promo.pid}
                      edatetime={value.promo.edatetime * 1000}
                      sdatetime={value.promo.sdatetime * 1000}
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
                      edatetime={value.promo.edatetime * 1000}
                      sdatetime={value.promo.sdatetime * 1000}
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

export default StaffPromoPage;