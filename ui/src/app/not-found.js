import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom'

import CreatureList from './creatures-list/index';
import CreatureFile from './creature-file/index';

class NotFound extends Component {
  render() {
    return (
      <div>
        Cette page n'existe pas.
      </div>
    );
  }
}

export default NotFound;
