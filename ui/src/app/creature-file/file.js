import React, { Component } from 'react'
import {getRange} from '../utilities/index';

class CreatureFileData extends Component {

  render() {
    const {frName, enName, pvMin, pvMax, caMin, caMax} = this.props.data;
    return (
      <div className='data-card'>
        <h1>{frName + ' (' + enName + ')'}</h1>
        <div className='field'>
            <div className='field-label'>PV</div>
            <div className='field-value'>{getRange(pvMin, pvMax)}</div>
        </div>
        <div className='field'>
            <div className='field-label'>CA</div>
            <div className='field-value'>{getRange(caMin, caMax)}</div>
        </div>
      </div>
    )
  }
}

export default CreatureFileData