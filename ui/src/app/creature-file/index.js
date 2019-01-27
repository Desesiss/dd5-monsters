import React from "react";
import { Query } from "react-apollo";

import gql from "graphql-tag";

import CreatureFileData from './file';

const CREA_GET_QUERY = gql`
  query GetCreature($id: Int!) {
    getCreature(id: $id) {
      id
      frName
      enName
      pvMin
      pvMax
      caMin
      caMax
      alignment
      size
      type
      senses
      skills
      languages
      speed 
      strength 
      dexterity 
      constitution 
      intelligence 
      wisdom 
      charisma 
      challengeRating 
      savingThrows
      vulnerabilities
      immunities
      resistances
      conditions
      specialTraits { label, description }
      actions { label, description }
      reactions { label, description }
      legendaryActions { label, description }
      description
    }
  }
`
class CreatureFile extends React.Component {

  render() {
    const id = this.props.match.params.id ;
    
    return (
        parseInt(id) &&
        <Query
        query={CREA_GET_QUERY}
        variables= {{ id: parseInt(id) }}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error</p>;
            if (data.getCreature)
            {
              return <CreatureFileData data={data.getCreature}/>
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
