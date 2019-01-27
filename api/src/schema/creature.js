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
  alignment: String,
  size: String,
  type: String,
  senses: [String]
  skills: [String]
  languages: [String]
  speed: Int
  strength: Int
  dexterity: Int
  constitution: Int 
  intelligence: Int 
  wisdom: Int 
  charisma: Int 
  challengeRating: String 
  savingThrows: [String]
  vulnerabilities: [String]
  immunities: [String]
  resistances: [String]
  conditions: [String]
  specialTraits: [Reference]
  actions: [Reference]
  reactions: [Reference]
  legendaryActions: [Reference]
  description: String
}
type Reference {
  label: String,
  description: String
}

type Query {
    getCreatures(
      filter: String,
      first: Int!,
      offset: Int!,
    ): [Creature],

    getCreature(
      id: Int!
    ): Creature
}

type Mutation {
    createCreature(
      caMin: Int,
      caMax: Int,
      enName: String!,
      pvMin: Int,
      frName: String!,
      pvMax: Int,
      alignment_code: String,
      size_code: String): Int
}

`;