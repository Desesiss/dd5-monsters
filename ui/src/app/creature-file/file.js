import React, { Component } from 'react'
import {getRange, displayField, displaySense, displayDistance} from '../utilities/index';



class CreatureFileData extends Component {

  render() {
    const {frName, enName, pvMin, pvMax, caMin, caMax, type, size, alignment, senses, speed} = this.props.data;
    return (
      <div className='data-card'>
        <h1>{frName}</h1>
        <h3>{'('+enName+')'}</h3>
        <div><svg><polyline points="0,0 360,2.5 0,5" ></polyline></svg></div>
        <h5>{(type ? type.name : '') + ' de taille ' + (size ? size.name : '') + ', ' + (alignment ? alignment.name : '')}</h5>
        <div><svg><polyline points="0,0 360,2.5 0,5" ></polyline></svg></div>
        {displayField('Points de vie', getRange(pvMin, pvMax))}
        {displayField('Classe d\'armure', getRange(caMin, caMax))}
        {displayField('Vitesse', displayDistance(speed))}
        <div><svg><polyline points="0,0 360,2.5 0,5" ></polyline></svg></div>
        {senses && senses.length > 0 && 
          displayField('Senses', senses.reduce((acc, c) => {return ((acc === '' ? '' : acc + ', ') + displaySense(c))}, ''))
        }
      </div>
    )
  }
}

export default CreatureFileData