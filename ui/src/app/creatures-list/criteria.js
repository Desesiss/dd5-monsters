import React, { Component } from 'react'

class Search extends Component {

  render() {
    return (
      <div className='paragraph'>
        <div>
          <input
            type='text'
            onChange={e => this.setState({ filter: e.target.value })}
          />
          <button onClick={() => this.props._executeSearch(this.state.filter)}>OK</button>
        </div>
      </div>
    )
  }
}

export default Search