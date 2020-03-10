import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { HISTORY_PATH } from "../../utils/Constants";

function HistoryTab(props) {
  return (
    <Menu.Item
      as={Link}
      to={HISTORY_PATH}
      name={HISTORY_PATH}
      active={window.location.pathname === HISTORY_PATH}
      content="History"
      onClick={props.onTabClick}
    />
  );
}

export default HistoryTab;
