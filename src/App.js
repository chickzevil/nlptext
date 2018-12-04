import React, { Component } from 'react';
import Navbar from './components/navbar';
import Home from './components/home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Home />
      </div>
    );
  }
}

export default App;
