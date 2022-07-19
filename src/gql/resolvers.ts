import { IResolvers } from "apollo-server-express";
import { createfinDefMutation } from "../mutation/financialDefinition.mutation";
import { createMarketDataMutation } from "../mutation/marketData.mutation";
import { changePasswordMutation, editMutation, loginMutation, logoutMutation, registerMutation } from "../mutation/user.mutation";
import { queryGetInstrumentById, queryGetInstrumentByName, queryGetInstruments } from "../query/instrument.query";
import { meMutation } from "../query/user.query";
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
        getInstrumentById: queryGetInstrumentById,
        getInstrumentByName:queryGetInstrumentByName,
        getInstruments: queryGetInstruments,
        me: meMutation
    },
    Mutation: {
        register: registerMutation,
        login: loginMutation,
        logout: logoutMutation,
        changePassword: changePasswordMutation,
        edit: editMutation,
        createFinancialDefinition: createfinDefMutation,
        createMarketData: createMarketDataMutation
    }
}

export default resolvers;