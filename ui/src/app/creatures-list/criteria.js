import React, { Component } from 'react'
import Button from '../components/button';

class Search extends Component {
  constructor(props) {
    super(props);

    this._executeSearch = this._executeSearch.bind(this);

    this.state = {
      filter: ''
    };
  }

  _executeSearch(){
    if(this.state.filter !== this.props.filter) {
      this.props._executeSearch(this.state.filter);
    }
  }

  render() {
    return (
      <div className='paragraph'>
        <div className='dd-aligned'>
          <input
            type='text'
            onChange={e => this.setState({ filter: e.target.value })}
            value={this.state.filter}
          />
          <i className='material-icons' onClick={this._executeSearch}>search</i>
        </div>
      </div>
    )
  }
}

export default Search