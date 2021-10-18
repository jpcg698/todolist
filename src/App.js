import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'
import Routes from "./Routes"
/* import login from  */

function App() {

  return (
    <Router>
      
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
        <Routes/>
    </div>
    </Router>
  );
}

export default App;
