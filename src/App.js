import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Routes from './routes';

import Header from './Components/Header/Header';
import Signup from './Components/Signup/Signup';
import Signin from './Components/Signin/Signin';
import Profile from './Components/Profile/Profile';
import Wall from './Components/Wall/Wall';
import { Row, Col } from 'antd';

class App extends Component {
  render() {
    return (
      <div className="App">
          {/* <Routes /> */}
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        {/* <Signup></Signup> */}
        {/* <Signin></Signin> */}
        {/* <Header></Header> */}
        {/* <Profile></Profile> */}
                <Routes/>
      </div>
    );
  }
}

export default App;
