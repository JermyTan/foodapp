import React, { useState } from "react";
import PropTypes from "prop-types";
import { Sidebar, Menu, Header, Icon } from "semantic-ui-react";
import HomeTab from "./HomeTab";
import HistoryTab from "./HistoryTab";
import ProfileTab from "./ProfileTab";
import RiderTab from "./RiderTab";
import StaffTab from "./StaffTab";
import ManagerTab from "./ManagerTab";

function NavigationContainer({ children }) {
  const [sidebarOpened, setSidebarOpened] = useState(false);

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
        <HomeTab onTabClick={onTabClick} />
        <HistoryTab onTabClick={onTabClick} />
        <ProfileTab onTabClick={onTabClick} />
        <RiderTab onTabClick={onTabClick} />
        <StaffTab onTabClick={onTabClick} />
        <ManagerTab onTabClick={onTabClick} />
      </Sidebar>

      <Sidebar.Pusher dimmed={sidebarOpened}>
        <Menu borderless size="huge" fixed="top">
          <Menu.Item onClick={() => setSidebarOpened(true)} icon="sidebar" />
          {
            //<UserMenu activeTab={activeTab} onTabClick={onTabClick} />
          }
        </Menu>
        <div style={{ height: "100vh", overflow: "auto" }}>{children}</div>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
}

NavigationContainer.propTypes = {
  children: PropTypes.node
};

export default NavigationContainer;
