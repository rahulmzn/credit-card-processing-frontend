import React, {Component} from "react";
import AddCard from "./Components/add-card";
import {BrowserRouter as Router, Route} from "react-router-dom";

class App extends Component {
  render() {
    return (
        <Router>
          <Route exact path="/" component={AddCard} />
          {}
        </Router>
    );
  }
}

export default App;
