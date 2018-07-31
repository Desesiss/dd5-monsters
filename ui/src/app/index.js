import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'

import CreatureList from './creatures-list/index';
import CreatureFile from './creature-file/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        {/*<img src={process.env.PUBLIC_URL + '/img/grandstack.png'} className="App-logo" alt="logo" />*/}
          <h1 className="App-title">Créatures de D&D 5</h1>
        </header>

        <Switch>
          <Route exact path="/" component={CreatureList} />
          <Route exact path="/file/:enName" component={CreatureFile} />
        </Switch>

      </div>
    );
  }
}

export default App;
