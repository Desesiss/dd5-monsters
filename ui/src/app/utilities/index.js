import React from 'react'

function getRange(min, max) {
    if(min === max){
      return min;
    } else {
      return min + ' - ' + max;
    }
  }

  function displayField(label, value){
    return(
      <div className='field'>
        <div className='field-label'>{label}</div>
        <div className='field-value'>{value}</div>
      </div>
    );
  }

  function displaySense(sense) {
    if(sense) {
      return sense.name + (sense.distance ? ' (' + displayDistance(sense.distance) + ' )' : '')
    }
    return '';
  }

  function displayDistance(dist) {
    if(dist) {
      return dist/5 + ' cases / ' + dist*3/10 + ' m / ' + dist + ' ft'
    }
    return '';

  }

  export { getRange, displayField, displaySense, displayDistance }