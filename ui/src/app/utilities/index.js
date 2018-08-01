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

  export { getRange, displayField }