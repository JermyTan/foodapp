import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
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
  MANAGER_SUMMARY_PATH,
  MANAGER_PROMOTION_PATH,
  ROOT_PATH,
} from "./utils/Constants";
import Homepage from "./components/pages/Homepage";
import HistoryPage from "./components/pages/HistoryPage";
import ProfilePage from "./components/pages/ProfilePage";
import RiderActivityPage from "./components/pages/RiderActivityPage";
import RiderSummaryPage from "./components/pages/RiderSummaryPage";
import StaffSummaryPage from "./components/pages/StaffSummaryPage";
import StaffMenuPage from "./components/pages/StaffMenuPage";
import ManagerSummaryPage from "./components/pages/ManagerSummaryPage";
import ManagerPromotionPage from "./components/pages/ManagerPromotionPage";
import UserContext from "utils/UserContext";
import LoginPage from "components/pages/LoginPage";

function App() {
  const [uid, setUid] = useState();
  const [role, setRole] = useState();

  const signOut = () => {
    localStorage.clear();
    loadFromLocalStorage();
  };

  const login = (uid, role) => {
    localStorage.setItem("uid", uid);
    localStorage.setItem("role", role);
    loadFromLocalStorage();
  };

  const loadFromLocalStorage = () => {
    setUid(parseInt(localStorage.getItem("uid")));
    setRole(parseInt(localStorage.getItem("role")));
  };

  useEffect(loadFromLocalStorage, []);

  return (
    <div className="App">
      <Router>
        {uid && role ? (
          <UserContext.Provider
            value={{
              uid: uid,
              role: role,
            }}
          >
            <NavigationContainer signOut={signOut}>
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
                <Route
                  path={MANAGER_PROMOTION_PATH}
                  exact
                  component={ManagerPromotionPage}
                />
                <Route>
                  <Redirect to={HOME_PATH} />
                </Route>
              </Switch>
            </NavigationContainer>
          </UserContext.Provider>
        ) : (
          <Switch>
            <Route
              path={ROOT_PATH}
              exact
              render={(props) => <LoginPage {...props} login={login} />}
            />
            <Route>
              <Redirect to={ROOT_PATH} />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
