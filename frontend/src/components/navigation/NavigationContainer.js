import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Sidebar, Menu, Header, Icon } from "semantic-ui-react";
import HomeTab from "./HomeTab";
import HistoryTab from "./HistoryTab";
import ProfileTab from "./ProfileTab";
import RiderTab from "./RiderTab";
import StaffTab from "./StaffTab";
import ManagerTab from "./ManagerTab";
import UserContext from "utils/UserContext";
import { CUSTOMER, STAFF, RIDER, MANAGER } from "utils/Constants";

function NavigationContainer({ signOut, children }) {
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const { role } = useContext(UserContext);

  const onTabClick = () => {
    setSidebarOpened(false);
  };

  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="push"
        onHide={() => setSidebarOpened(false)}
        vertical
        visible={sidebarOpened}
      >
        <Header
          size="large"
          icon
          textAlign="center"
          style={{ marginTop: "1rem" }}
        >
          <Icon name="truck" />
          Food Truck
        </Header>
        {role === CUSTOMER && <HomeTab onTabClick={onTabClick} />}
        {role === CUSTOMER && <HistoryTab onTabClick={onTabClick} />}
        <ProfileTab onTabClick={onTabClick} />
        {role === RIDER && <RiderTab onTabClick={onTabClick} />}
        {role === STAFF && <StaffTab onTabClick={onTabClick} />}
        {role === MANAGER && <ManagerTab onTabClick={onTabClick} />}
        <Menu.Item content="Sign Out" link onClick={signOut} />
      </Sidebar>

      <Sidebar.Pusher dimmed={sidebarOpened}>
        <Menu borderless size="huge" fixed="top">
          <Menu.Item onClick={() => setSidebarOpened(true)} icon="sidebar" />
        </Menu>
        <div style={{ height: "100vh", overflow: "auto" }}>{children}</div>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}

NavigationContainer.propTypes = {
  children: PropTypes.node,
};

export default NavigationContainer;
