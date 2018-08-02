import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'

import CreatureList from './creatures-list/index';
import CreatureFile from './creature-file/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Link to={'/'}><h1 className="App-title">Ø</h1></Link>
        </header>
        <div className="page">
          <Switch>
            <Route exact path="/" component={CreatureList} />
            <Route exact path="/file/:enName" component={CreatureFile} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
