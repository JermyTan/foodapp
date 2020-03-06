import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Accordion } from "semantic-ui-react";
import { RIDER_ACTIVITY_PATH, RIDER_SUMMARY_PATH } from "../../utils/Constants";

function RiderTab(props) {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <Accordion as={Menu.Item}>
      <Accordion.Title
        onClick={() => setExpanded(!isExpanded)}
        active={isExpanded}
      >
        Rider
      </Accordion.Title>
      <Accordion.Content active={isExpanded}>
        <Menu.Item
          as={Link}
          to={RIDER_ACTIVITY_PATH}
          name={RIDER_ACTIVITY_PATH}
          active={window.location.pathname === RIDER_ACTIVITY_PATH}
          content="Activity"
          onClick={props.onTabClick}
        />
        <Menu.Item
          as={Link}
          to={RIDER_SUMMARY_PATH}
          name={RIDER_SUMMARY_PATH}
          active={window.location.pathname === RIDER_SUMMARY_PATH}
          content="Summary"
          onClick={props.onTabClick}
        />
      </Accordion.Content>
    </Accordion>
  );
}

export default RiderTab;
