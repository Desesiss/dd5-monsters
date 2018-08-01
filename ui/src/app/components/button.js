import React, { Component } from 'react'
import './button.css';

class Button extends Component {

  render() {
    const {onClick, children} = this.props;
    
    return (
      <div className='dd-button' onClick={onClick}>
        {children}
      </div>
    )
  }
}

export default Button;