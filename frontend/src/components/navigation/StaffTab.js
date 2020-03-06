import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Accordion } from "semantic-ui-react";
import { STAFF_MENU_PATH, STAFF_SUMMARY_PATH } from "../../utils/Constants";

function StaffTab(props) {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <Accordion as={Menu.Item}>
      <Accordion.Title
        onClick={() => setExpanded(!isExpanded)}
        active={isExpanded}
      >
        Staff
      </Accordion.Title>
      <Accordion.Content active={isExpanded}>
        <Menu.Item
          as={Link}
          to={STAFF_MENU_PATH}
          name={STAFF_MENU_PATH}
          active={window.location.pathname === STAFF_MENU_PATH}
          content="Menu"
          onClick={props.onTabClick}
        />
        <Menu.Item
          as={Link}
          to={STAFF_SUMMARY_PATH}
          name={STAFF_SUMMARY_PATH}
          active={window.location.pathname === STAFF_SUMMARY_PATH}
          content="Summary"
          onClick={props.onTabClick}
        />
      </Accordion.Content>
    </Accordion>
  );
}

export default StaffTab;
