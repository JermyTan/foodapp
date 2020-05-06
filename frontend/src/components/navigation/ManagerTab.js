import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Accordion } from "semantic-ui-react";
import { MANAGER_SUMMARY_PATH, MANAGER_PROMOTION_PATH } from "../../utils/Constants";

function ManagerTab(props) {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <Accordion as={Menu.Item}>
      <Accordion.Title
        onClick={() => setExpanded(!isExpanded)}
        active={isExpanded}
      >
        Manager
      </Accordion.Title>
      <Accordion.Content active={isExpanded}>
        <Menu.Item
          as={Link}
          to={MANAGER_PROMOTION_PATH}
          name={MANAGER_PROMOTION_PATH}
          active={window.location.pathname === MANAGER_PROMOTION_PATH}
          content="Promotions"
          onClick={props.onTabClick}
        />
        <Menu.Item
          as={Link}
          to={MANAGER_SUMMARY_PATH}
          name={MANAGER_SUMMARY_PATH}
          active={window.location.pathname === MANAGER_SUMMARY_PATH}
          content="Summary"
          onClick={props.onTabClick}
        />
      </Accordion.Content>
    </Accordion>
  );
}

export default ManagerTab;
