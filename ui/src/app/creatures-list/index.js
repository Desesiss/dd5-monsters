import React from "react";
import { Query } from "react-apollo";

import gql from "graphql-tag";
import CreatureResults from './results'
import CreatureCriteria from './criteria'

const CREA_SEARCH_QUERY = gql`
  query CreatureFilterQuery($filter: String!, $first: Int!, $offset: Int!) {
    creatures(filter: $filter, first: $first, offset: $offset) {
      frName
      enName
      pvMin
      pvMax
      caMin
      caMax
    }
  }
`

class CreatureList extends React.Component {

  render() {
    const {filter, first, offset} = {filter: '', first: 10, offset: 0};
    return (
      <Query
        query={CREA_SEARCH_QUERY}
        variables={{ filter, first, offset }}
      >
        {({ loading, error, data, refetch }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;

          return (
            <div>
              <CreatureCriteria filter={filter} _executeSearch={(newFilter) => refetch({filter: newFilter, first: 10, offset: 0})}/>
              <CreatureResults {...this.props} results={data.creatures} />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default CreatureList;
