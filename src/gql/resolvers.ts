import { IResolvers } from "apollo-server-express";
import { gqlGetInstrumentById, gqlGetInstrumentByName, gqlGetInstruments } from "../gqlFunction/instrument.gql";
import { GqlContext } from "./GqlContext";


const resolvers: IResolvers = {
    InstrumentResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) {
                return "EntityResult";
            }
            return "Instrument";
        }
    },
    InstrumentArrayResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) {
                return "EntityResult";
            }
            return "InstrumentArray";
        }
    },
    UserResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) {
                return "EntityResult";
            }
            return "User";
        }
    },
    FinancialDefinitionResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) {
                return "EntityResult";
            }
            return "FinancialDefinition";
        }
    },
    FinancialDefinitionArrayResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) {
                return "EntityResult";
            }
            return "FinancialDefinitionArray";
        }
    },
    MarketDataResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) {
                return "EntityResult";
            }
            return "MarketData";
        }
    },
    MarketDataArrayResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) {
                return "EntityResult";
            }
            return "MarketDataArray";
        }
    },
    TradeResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) {
                return "EntityResult";
            }
            return "TradeResult";
        }
    },
    TradeArrayResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) {
                return "EntityResult";
            }
            return "TradeArrayResult";
        }
    },
    Query: {
        getInstrumentById: gqlGetInstrumentById,
        getInstrumentByName:gqlGetInstrumentByName,
        getInstruments: gqlGetInstruments
    }
}

export default resolvers;