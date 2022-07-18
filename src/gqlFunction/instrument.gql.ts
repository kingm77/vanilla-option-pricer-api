import { getInstrumentById } from "../controller/instrumentRepo";
import { QueryOneResult } from "../controller/queryArrayResult";
import { GqlContext } from "../gql/GqlContext";
import { Instrument } from "../model/instrument";
import { EntityResult, STANDARD_ERROR } from "./commonValue";


export const gqlGetInstrumentById = async (
    obj: any,
    args: { id: string },
    ctx: GqlContext,
    info: any
): Promise<Instrument | EntityResult> => {
    let instrument: QueryOneResult<Instrument>;
    try {
        instrument = await getInstrumentById(args.id);

        if (instrument.entity) {
            return instrument.entity;
        }
        return {
            messages: instrument.messages ? instrument.messages : [STANDARD_ERROR],
        };
    } catch (ex: any) {
        console.log(ex.message);
        throw ex;
    }
}