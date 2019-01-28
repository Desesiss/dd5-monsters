import { gql } from 'apollo-server-express';

export default [gql`
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
  types: [String],
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
  specialTraits: [AugmentedValue]
  actions: [AugmentedValue]
  reactions: [AugmentedValue]
  legendaryActions: [AugmentedValue]
  description: String
}
type AugmentedValue {
  label: String,
  description: String
}

type Reference {
  code: ID,
  label: String,
  description: String
}
type References {
  Size: [Reference],
  Morality: [Reference],
  Attitude: [Reference],
  Type: [Reference]
}

type PaginatedCreatures {
  count: Int,
  rows: [Creature]
}

type Query {
    getCreatures(
      filter: String,
      first: Int!,
      offset: Int!,
    ): PaginatedCreatures,

    getCreature(
      id: Int!
    ): Creature

    getReferences(references: [String]): References,
    getAlignment: [Reference],
    getSize: [Reference]
}

type Mutation {
    createCreature(
      caMin: Int,
      caMax: Int,
      enName: String!,
      pvMin: Int,
      frName: String!,
      pvMax: Int,
      type_code: String,
      attitude_code: String,
      morality_code: String,
      size_code: String,
      type_codes: [String]): Int
}`];