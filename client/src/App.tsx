import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

//Views
import Home from './views/Home/Home'

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Switch>
            <Route to="/" component={Home} />
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
