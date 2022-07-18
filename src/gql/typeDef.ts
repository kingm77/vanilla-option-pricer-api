import { gql } from "apollo-server-express";

const typeDefs = gql`
  scalar Date

  type EntityResult {
    messages: [String!]
  }

  type User {
    id: ID!
    email: String!
    firstname: String!
    lastname: String!
    password: String!
    confirmed: Boolean!
    financialsDefs: [FinancialDefinition!]
    marketsData: [MarketData!]
  }
  union UserResult = User | EntityResult

  type Instrument {
    id: ID!
    name: String!
    financialsDefs: [FinancialDefinition!]
  }
  union InstrumentResult = Instrument | EntityResult
  type InstrumentArray {
    instruments: [Instrument!]
  }
  union InstrumentArrayResult = InstrumentArray | EntityResult

  type FinancialDefinition {
    id: ID!
    strike: Float!
    maturity: Date!
    type: string!
    trades: [Trade!]
    user: User!
    instrument: Instrument!
  }
  union FinancialDefinitionResult = FinancialDefinition | EntityResult
  type FinancialDefinitionArray {
    financialsDefs: [FinancialDefinition!]
  }
  union FinancialDefinitionArrayResult = FinancialDefinitionArray | EntityResult

  type MarketData {
    id: ID!
    volatility: Float!
    spot: Float!
    interestRate: Float!
    trades: [Trade!]
    user: User!
  }
  union MarketDataResult = MarketData | EntityResult
  type MarketDataArray {
    marketsData: [MarketData!]
  }
  union MarketDataArrayResult = MarketDataArray | EntityResult

  type Trade {
    id: ID!
    quantity: Int!
    price: Float!
    user: User!
    financialDef: FinancialDefinition!
    marketData: MarketData!
  }
  union TradeResult = Trade | EntityResult
  type TradeArray {
    trades: [Trade!]
  }
  union TradeArrayResult = TradeArray | EntityResult

  type Query {
    getInstrumentById(id: ID!): InstrumentResult!
    me: UserResult!
  }

  type Mutation {
    createThread(
      userId: ID!
      categoryId: ID!
      title: String!
      body: String!
    ): EntityResult
    createThreadItem(userId: ID!, threadId: ID!, body: String): EntityResult
    register(email: String!, userName: String!, password: String!): String!
    login(userName: String!, password: String!): String!
    logout(userName: String!): String!
    updateThreadPoint(threadId: ID!, increment: Boolean!): String!
    updateThreadItemPoint(threadItemId: ID!, increment: Boolean!): String!
    changePassword(newPassword: String!): String!
  }
`;

export default typeDefs;
