import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { ROOT_PATH } from "../../utils/Constants";

function WelcomeTab(props) {
  return (
    <Menu.Item
      as={Link}
      to={ROOT_PATH}
      name={ROOT_PATH}
      active={window.location.pathname === ROOT_PATH}
      content="Home"
      onClick={props.onTabClick}
    />
  );
}

export default WelcomeTab;
