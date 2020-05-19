import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//Components
import PrivateRoute from './components/PrivateRoute/PrivateRoute'

//Views
import Home from './views/Home/Home'
import Login from './views/Login/Login'
import Signup from './views/Signup/Signup'
import NotFound from './views/404/404'

function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute path="/user" component={Signup} />
            <Route component={NotFound} />
          </Switch>
        </Router>
    </div>
  );
}

export default App;
