import React, { Component } from 'react';
import './App.css';

import SearchableMenu from './components/SearchableMenu'
import {genNodeMenu} from './models/Node'
import data from './menu_api.json'

class App extends Component {

  render() {
    let nodes = genNodeMenu(data)

    return (
      <div className="App">
        <div className="App-header">
          <h2>SearchableMenu Component implementation:</h2>
        </div>
        <SearchableMenu nodes={nodes}/>
      </div>
    );
  }
}

export default App;
