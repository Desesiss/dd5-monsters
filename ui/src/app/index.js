import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'

import CreatureList from './creatures-list/index';
import CreatureFile from './creature-file/index';
import CreateCreature from './create-creature';
import NotFound from './not-found';

class App extends Component {
  render() {
    return (
      <div>
        <header className="App-header">
          <Link to={'/'}><h1 className="App-title">Ø</h1></Link>
        </header>
        <div className="page">
          <Switch>
            <Route exact path="/" component={CreatureList} />
            <Route exact path="/file/:id" component={CreatureFile} />
            <Route exact path="/create" component={CreateCreature} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
