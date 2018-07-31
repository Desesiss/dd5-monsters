import React, { Component } from 'react';
import CreatureList from './creatures-list/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        {/*<img src={process.env.PUBLIC_URL + '/img/grandstack.png'} className="App-logo" alt="logo" />*/}
          <h1 className="App-title">Créatures de D&D 5</h1>
        </header>
        
        <CreatureList />
      </div>
    );
  }
}

export default App;
