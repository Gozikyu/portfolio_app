import React, { Component } from 'react';
import Routing from './Components/Routing'
import './App.css';
import "./assets/style.css";
import "./assets/reset.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Routing/>
      </div>
    );
  }
}

export default App;