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
          <div className='field-value'> { value ? value : '' } </div>
      </div>
    );
  }
  function displayList(label, values){
    return(
      <div>
        {values && values.length > 0 && 
          displayField(label, values.reduce((acc, c) => {return ((acc === '' ? '' : acc + ', '))}, ''))
        }
      </div>
    );
  }

  function displayDistance(dist) {
    if(dist) {
      return dist/5 + ' cases / ' + dist*3/10 + ' m / ' + dist + ' ft'
    }
    return '';

  }

  export { getRange, displayField, displayDistance, displayList }