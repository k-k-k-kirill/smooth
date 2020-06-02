import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Actions
import actions from "./store/actions/actions";

//Components
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

//Views
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import Signup from "./views/Signup/Signup";
import Upcoming from "./views/Upcoming/Upcoming";
import Projects from "./views/Projects/Projects";
import Templates from "./views/Templates/Templates";
import TimeTracking from "./views/TimeTracking/TimeTracking";
import NotFound from "./views/404/404";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: actions.auth.TOKEN_REFRESH_REQUEST });
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <PrivateRoute path="/upcoming" component={Upcoming} />
          <PrivateRoute path="/projects" component={Projects} />
          <PrivateRoute path="/templates" component={Templates} />
          <PrivateRoute path="/time" component={TimeTracking} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
