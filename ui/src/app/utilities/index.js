function getRange(min, max) {
    if(min === max){
      return min;
    } else {
      return min + ' - ' + max;
    }
  }

  export { getRange }