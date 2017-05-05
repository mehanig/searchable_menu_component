import React, { Component } from 'react';
import './App.css';

import SearchableMenu from './components/SearchableMenu'
import {genNodeMenu} from './models/Node'
import data from './menu_api.json'

class App extends Component {

  render() {

    // Simulate async loading
    let nodes = genNodeMenu(data)
    let nodesPromise = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve(nodes);
      }, 2000);
    })

    return (
      <div className="App">
        <div className="App-header">
          <h2>SearchableMenu Component implementation:</h2>
        </div>
        <SearchableMenu
          nodes={nodesPromise}
          highlighted={true}
          keyboarded={true}/>
      </div>
    );
  }
}

export default App;
