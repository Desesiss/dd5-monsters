import { neo4jgraphql } from "neo4j-graphql-js";

export const typeDefs = `
type Creature {
  caMin: Float
  caMax: Float
  enName: String
  pvMin: Float
  frName: String 
  pvMax: Float
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
