import React, { Component } from 'react';
import gql from "graphql-tag";

const CREATE_CREA_MUTATION = gql`
  mutation CreateCreature(caMin: $caMin
    caMax: $caMax
    enName: $enName
    pvMin: $pvMin
    frName: $frName
    pvMax: $pvMax) {
    createCreature(
        caMin: $caMin
        caMax: $caMax
        enName: $enName
        pvMin: $pvMin
        frName: $frName
        pvMax: $pvMax): String
  }
`

class CreateCreature extends Component {
  render() {
    return (
      <div>
        En cours
      </div>
    );
  }
}

export default CreateCreature;