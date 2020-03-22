import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import NavigationContainer from "./components/navigation/NavigationContainer";
import {
  HOME_PATH,
  HISTORY_PATH,
  PROFILE_PATH,
  RIDER_ACTIVITY_PATH,
  RIDER_SUMMARY_PATH,
  STAFF_MENU_PATH,
  STAFF_SUMMARY_PATH,
  MANAGER_SUMMARY_PATH
} from "./utils/Constants";
import Homepage from "./components/pages/Homepage";
import HistoryPage from "./components/pages/HistoryPage";
import ProfilePage from "./components/pages/ProfilePage";
import RiderActivityPage from "./components/pages/RiderActivityPage";
import RiderSummaryPage from "./components/pages/RiderSummaryPage";
import StaffSummaryPage from "./components/pages/StaffSummaryPage";
import StaffMenuPage from "./components/pages/StaffMenuPage";
import ManagerSummaryPage from "./components/pages/ManagerSummaryPage";

function App() {
  return (
    <div className="App">
      <Router>
        <NavigationContainer>
          <Switch>
            <Route path={HOME_PATH} exact component={Homepage} />
            <Route path={HISTORY_PATH} exact component={HistoryPage} />
            <Route path={PROFILE_PATH} exact component={ProfilePage} />
            <Route
              path={RIDER_ACTIVITY_PATH}
              exact
              component={RiderActivityPage}
            />
            <Route
              path={RIDER_SUMMARY_PATH}
              exact
              component={RiderSummaryPage}
            />
            <Route
              path={STAFF_SUMMARY_PATH}
              exact
              component={StaffSummaryPage}
            />
            <Route path={STAFF_MENU_PATH} exact component={StaffMenuPage} />
            <Route
              path={MANAGER_SUMMARY_PATH}
              exact
              component={ManagerSummaryPage}
            />
            <Route>
              <Redirect to={HOME_PATH} />
            </Route>
          </Switch>
        </NavigationContainer>
      </Router>
    </div>
  );
}

export default App;
