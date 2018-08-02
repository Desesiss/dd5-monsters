import React from "react";
import { Query } from "react-apollo";

import gql from "graphql-tag";

import CreatureFileData from './file';

const CREA_GET_QUERY = gql`
  query GetCreature($enName: String!) {
    getCreature(enName: $enName) {
      frName
      enName
      pvMin
      pvMax
      caMin
      caMax
      alignment {name }
      senses {name }
      size {name }
      type {name }
    }
  }
`
class CreatureFile extends React.Component {

  render() {
    const enName = this.props.match.params.enName ;
    
    return (
        enName !== '' &&
        <Query
        query={CREA_GET_QUERY}
        variables= {{ enName }}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;
            if (data.getCreature && data.getCreature.length === 1)
            {
              return <CreatureFileData data={data.getCreature[0]}/>
            }
            else {
              return <div>Aucune créature trouvée.</div>
            }
        }}
      </Query>
    );
  }
}

export default CreatureFile;
