import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';

import CreatureResults from './results'
import CreatureCriteria from './criteria'

const CREA_SEARCH_QUERY = gql`
  query CreatureFilterQuery($filter: String!, $first: Int!, $offset: Int!) {
    getCreatures(filter: $filter, first: $first, offset: $offset) {
      count
      rows {
        id
        frName
        enName
        pvMin
        pvMax
        caMin
        caMax
      }
    }
  }
`
const numPerPage = 10;


class CreatureList extends React.Component {
  constructor(props) {
    super(props);
    this.updateFilter = this.updateFilter.bind(this);
    this.updatePagination = this.updatePagination.bind(this);
    this.state = {
      filter:'',
      offset: 0
    };
  }

  updateFilter(newF){
    this.setState({
      filter: newF,
      offset: 0
    });
  }
  updatePagination(newOffset){
    this.setState({
      offset: newOffset
    });
  }

  render() {

    return (
      <Query
        query={CREA_SEARCH_QUERY}
        variables={{ filter: this.state.filter, first: numPerPage, offset: this.state.offset }}
      >
        {({ loading, error, data, refetch }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;

          return (
            <div>
              <Button component={Link} to='/create' variant="contained" color="primary">Créer</Button>
              <div className='paragraph'>
                <CreatureCriteria 
                  filter={''} 
                  _executeSearch={this.updateFilter}
                />
                <CreatureResults 
                  {...this.props} 
                  numPerPage={numPerPage}
                  results={data.getCreatures}
                  _nextPage={this.updatePagination}
                  page={Math.ceil((numPerPage+this.state.offset) / numPerPage) - 1}
                />
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default CreatureList;
