import React, { Component } from 'react';
import './App.css';

import NodeTree from './components/NodeTree'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>NodeTree Component implementation:</h2>
        </div>
        <div className="node-tree">
          <NodeTree/>
        </div>
      </div>
    );
  }
}

export default App;
