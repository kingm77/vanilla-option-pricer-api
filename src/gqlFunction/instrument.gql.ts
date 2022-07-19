import { getInstrumentById, getInstrumentByName, getInstruments } from "../controller/instrumentRepo";
import { QueryArrayResult, QueryOneResult } from "../controller/queryArrayResult";
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

export const gqlGetInstrumentByName = async (
    obj: any,
    args: { name: string },
    ctx: GqlContext,
    info: any
): Promise<Instrument | EntityResult> => {
    let instrument: QueryOneResult<Instrument>;
    try {
        instrument = await getInstrumentByName(args.name);

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

export const gqlGetInstruments = async (
    obj: any,
    args:null,
    ctx: GqlContext,
    info: any
): Promise<{instruments: Array<Instrument>} | EntityResult> => {
    let instruments: QueryArrayResult<Instrument>;
    try {
        instruments = await getInstruments();

        if (instruments.entities) {
            console.log("houha", instruments.entities)
            return {instruments: instruments.entities};
        }
        return {
            messages: instruments.messages ? instruments.messages : [STANDARD_ERROR],
        };
    } catch (ex: any) {
        console.log(ex.message);
        throw ex;
    }
}



