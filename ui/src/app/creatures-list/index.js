import React from "react";
import { Query } from "react-apollo";

import gql from "graphql-tag";
import CreatureResults from './results'

class CreatureList extends React.Component {

  render() {
    return (
      <Query
        query={gql`
          {
            creatures(first: 10, offset: 0) {
              frName
              enName
              pvMin
              pvMax
              caMin
              caMax
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;

          return (
            <CreatureResults results={data.creatures}/>
          );
        }}
      </Query>
    );
  }
}

export default CreatureList;
