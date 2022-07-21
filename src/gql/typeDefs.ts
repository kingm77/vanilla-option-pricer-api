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
    trades: [Trade!]
  }
  union UserResult = User | EntityResult

  type Instrument {
    id: ID!
    name: String!
    owner: String
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
    maturity: String!
    type: String!
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
    date: String!
    user: User!
    financialDef: FinancialDefinition!
    marketData: MarketData!
  }
  union TradeResult = Trade | EntityResult
  type TradeArray {
    trades: [Trade!]
  }
  union TradeArrayResult = TradeArray | EntityResult

  type Price {
    value: Float!
  }
  union PriceResult = EntityResult | Price

  type Query {
    getInstrumentById(id: ID!): InstrumentResult!
    getInstrumentByName(name: String!): InstrumentResult!
    getInstruments: InstrumentArrayResult!
    me: UserResult!
    getTradePrice(finDefId: ID!, marketDataId: ID!, quantity: Int!): EntityResult!
    getTradeByCode(code: String!): TradeResult!
    getTrades: TradeArrayResult!
  }

  type Mutation {
    createFinancialDefinition(instrumentName: String!, strike: Float!, maturity: String!, type: String!): EntityResult!
    createMarketData(volatility: Float!, spot: Float!, interestRate: Float!): EntityResult!
    register(email: String!, firstname: String!, lastname: String!, password: String!): String!
    login(email: String!, password: String!): String!
    logout(email: String!): String!
    changePassword(newPassword: String!): String!
    edit(newFirstname: String!, newLastname: String!): String!
    bookTrade(finDefId: ID!, marketDataId: ID!, quantity: Int!, price: Float!): EntityResult!
  }
`;

export default typeDefs;
