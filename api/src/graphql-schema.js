import { neo4jgraphql } from "neo4j-graphql-js";

export const typeDefs = `
type Creature {
  id: ID!
  caMin: Float
  caMax: Float
  enName: String
  pvMin: Float
  frName: String
  pvMax: Float
}

type Query {
    creatures(id: ID, frName: String, enName: String, caMin: Float, caMax: Float, pvMin: Float, pvMax: Float, first: Int = 10, offset: Int = 0): [Creature]
}
`;

export const resolvers = {
  Query: {
    creatures: neo4jgraphql
  }
};
