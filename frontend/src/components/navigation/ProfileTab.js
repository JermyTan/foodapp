import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { PROFILE_PATH } from "../../utils/Constants";

function ProfileTab(props) {
  return (
    <Menu.Item
      as={Link}
      to={PROFILE_PATH}
      name={PROFILE_PATH}
      active={window.location.pathname === PROFILE_PATH}
      content="Profile"
      onClick={props.onTabClick}
    />
  );
}

export default ProfileTab;
