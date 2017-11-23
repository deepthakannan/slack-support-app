import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TeamScheduleAppContainer from "./components/TeamScheduleAppContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Support</h1>
        </header>
        <div className="app-body">
          <TeamScheduleAppContainer></TeamScheduleAppContainer>
        </div>
      </div>
    );
  }
}

export default App;
