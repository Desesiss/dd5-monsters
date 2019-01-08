//import { neo4jgraphql } from "neo4j-graphql-js";
// TODO : rewrite or delete
export const typeDefs = `
type Creature {
  caMin: Int
  caMax: Int
  enName: String
  pvMin: Int
  frName: String 
  pvMax: Int,
  alignment: Alignment @relation(name:"IS_ALIGNED", direction:OUT),
  senses: [Sense] @relation(name:"HAS_SENSE", direction:OUT),
  size: Size @relation(name:"IS_SIZE", direction:OUT),
  type: Type @relation(name:"IS_TYPE", direction:OUT)
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
    creatures(
      filter: String,
      first: Int!,
      offset: Int!,
    ): [Creature] @cypher(
      statement: 
        "MATCH (c:Creature) WHERE toLower(c.frName) CONTAINS toLower($filter) OR toLower(c.enName) CONTAINS toLower($filter) RETURN c"
    ),
    getCreature(
      enName: String!
    ): [Creature] @cypher(
      statement: 
        "MATCH (c:Creature) WHERE toLower(c.enName) = toLower($enName) RETURN c"
    ),
}

`;

export const resolvers = {
  Query: {
    creatures: neo4jgraphql,
    getCreature: neo4jgraphql
  }
};
