import React, { Component } from 'react'
import {getRange,displayField} from '../utilities/index';

class CreatureFileData extends Component {

  render() {
    const {frName, enName, pvMin, pvMax, caMin, caMax} = this.props.data;
    return (
      <div className='data-card'>
        <h1>{frName}</h1>
        <h3>{'('+enName+')'}</h3>
        <div><svg><polyline points="0,0 360,2.5 0,5" ></polyline></svg></div>
        <h5>{'Humanoïde (gobelinoïde) de taille P, neutre mauvais'}</h5>
        <div><svg><polyline points="0,0 360,2.5 0,5" ></polyline></svg></div>
        {displayField('Points de vie', getRange(pvMin, pvMax))}
        {displayField('Classe d\'armure', getRange(caMin, caMax))}
        {displayField('Vitesse', 0 + ' cases / ' + 0 + ' m / ' + 0 + ' ft')}
        <div><svg><polyline points="0,0 360,2.5 0,5" ></polyline></svg></div>
      </div>
    )
  }
}

export default CreatureFileData