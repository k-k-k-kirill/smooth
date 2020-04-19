import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//Views
import Home from './views/Home/Home'
import Login from './views/Login/Login'
import Signup from './views/Signup/Signup'

function App() {
  return (
    <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </Switch>
        </Router>
    </div>
  );
}

export default App;
