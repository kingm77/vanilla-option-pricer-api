import { IResolvers } from "apollo-server-express";
import { gqlGetInstrumentById } from "../gqlFunction/instrument.gql";
import { GqlContext } from "./GqlContext";


export const resolvers: IResolvers = {
    InstrumentResult: {
        __resolveType(obj: any, context: GqlContext, info: any) {
            if (obj.messages) {
                return "EntityResult";
            }
            return "Instrument";
        }
    },
    Query: {
        getInstrumentById: gqlGetInstrumentById,
    }
}

