import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { HOME_PATH } from "../../utils/Constants";

function HomeTab(props) {
  return (
    <Menu.Item
      as={Link}
      to={HOME_PATH}
      name={HOME_PATH}
      active={window.location.pathname === HOME_PATH}
      content="Food"
      onClick={props.onTabClick}
    />
  );
}

export default HomeTab;
