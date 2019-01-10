import { gql } from 'apollo-server-express';

export default gql`
type Creature {
  caMin: Int,
  caMax: Int,
  enName: String,
  pvMin: Int,
  frName: String, 
  pvMax: Int,
  alignment: Alignment,
  senses: [Sense],
  size: Size,
  type: Type
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
      enName: String,
      pvMin: Int,
      frName: String,
      pvMax: Int,
      morality_code: String,
      attitude_code: String,
      size_code: String): Int
}

`;