import React, { useState, useEffect } from "react";
import { Button, Modal, Feed } from "semantic-ui-react";
import { format } from "date-fns";
import Axios from "axios";

const data = [
  {
    name: "Alex",
    reviewDatetime: 1588486582,
    review: "Great food",
  },
  {
    name: "Tom",
    reviewDatetime: 1588486582,
    review: "Great food",
  },
  {
    name: "Jeremy",
    reviewDatetime: 1588486582,
    review: "Great food",
  },
  {
    name: "Xavier",
    reviewDatetime: 1588486582,
    review: "Great food",
  },
  {
    name: "Ash",
    reviewDatetime: 1588486582,
    review: "Great food",
  },
  {
    name: "James",
    reviewDatetime: 1588486582,
    review: "Great food",
  },
  {
    name: "Jamie",
    reviewDatetime: 1588486582,
    review: "Great food",
  },
  {
    name: "Yves",
    reviewDatetime: 1588486582,
    review: "Great food",
  },
  {
    name: "Jamie",
    reviewDatetime: 1588486582,
    review: "Great food",
  },
  {
    name: "Jamie",
    reviewDatetime: 1588486582,
    review: "Great food",
  },
  {
    name: "Jamie",
    reviewDatetime: 1588486582,
    review: "Great food",
  },
  {
    name: "Jamie",
    reviewDatetime: 1588486582,
    review: "Great food",
  },
  {
    name: "Jamie",
    reviewDatetime: 1588486582,
    review: "Great food",
  },
  {
    name: "Jamie",
    reviewDatetime: 1588486582,
    review: "Great food",
  },
  {
    name: "Jamie",
    reviewDatetime: 1588486582,
    review: "Great food",
  },
  {
    name: "Jamie",
    reviewDatetime: 1588486582,
    review: "Great food",
  },
];

const profileImages = [
  "elliot.jpg",
  "helen.jpg",
  "jenny.jpg",
  "joe.jpg",
  "justen.jpg",
  "laura.jpg",
];

function ReviewsButton(props) {
  const [isModalOpened, setModalOpened] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews()
  }, [])

  const getReviews = () => {
    const url = `http://localhost:5000/api/restaurants/'${props.rname}'/reviews`
    Axios.get(url)
      .then((response) => {
        console.log(`Get reviews for ${props.rname}`, response.data)
        setReviews(response.data)
      })
      .catch((error) => {
        console.log(`Error retrieving reviews for ${props.rname}, error`);
      })
  }


  return (
    <Modal
      open={isModalOpened}
      size="small"
      onClose={() => setModalOpened(false)}
      trigger={
        <Button
          color="teal"
          onClick={() => setModalOpened(true)}
          content="Reviews"
          compact
        />
      }
    >
      <Modal.Header>{props.rname} Reviews</Modal.Header>

      <Modal.Content>
        <Feed>
          {reviews.map((value, index) => {
            let image =
              profileImages[Math.floor(Math.random() * profileImages.length)];
            return (
              <Feed.Event key={index}>
                <Feed.Label>
                  <img
                    src={`https://react.semantic-ui.com/images/avatar/small/${image}`}
                  />
                </Feed.Label>
                <Feed.Content>
                  <Feed.Summary>
                    <Feed.User>{value.name}</Feed.User> reviewed on
                    <Feed.Date>
                      {format(
                        value.reviewdatetime * 1000,
                        "MM/dd/yyyy hh:mm aa"
                      )}
                    </Feed.Date>
                  </Feed.Summary>
                  <Feed.Extra text>{value.review}</Feed.Extra>
                </Feed.Content>
              </Feed.Event>
            );
          })}
        </Feed>
      </Modal.Content>

      <Modal.Actions>
        <Button
          primary
          content="Done"
          onClick={() => {
            setModalOpened(false);
          }}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default ReviewsButton;
