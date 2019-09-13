import React, { Component } from 'react';
import Login from "./Component/Login"
import Dashboard from "./Component/DashBoard"
import {BrowserRouter as Router, Route} from "react-router-dom"

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div className="App">
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path ="/dashboard" component={Dashboard}/>
        </div>
        </Router>
      </div>
    )
  }
}
export default App;