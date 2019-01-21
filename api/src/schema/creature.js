import { gql } from 'apollo-server-express';

export default gql`
type Creature {
  id : ID,
  frName: String, 
  enName: String,
  caMin: Int,
  caMax: Int,
  pvMin: Int,
  pvMax: Int,
  attitude_code: String,
  morality_code: String,
  size_code: String
}

type Alignment {
  name: String
}
type Sense {
  name: String
}
type Size {
  name: String
}
type Type {
  name: String
}

type Query {
    getCreatures(
      filter: String,
      first: Int!,
      offset: Int!,
    ): [Creature],

    getCreature(
      id: Int!
    ): [Creature]
}

type Mutation {
    createCreature(
      caMin: Int,
      caMax: Int,
      enName: String!,
      pvMin: Int,
      frName: String!,
      pvMax: Int,
      morality_code: String,
      attitude_code: String,
      size_code: String): Int
}

`;