import { getInstrumentById, getInstrumentByName, getInstruments } from "../controller/instrument.controller";
import { QueryArrayResult, QueryOneResult } from "../controller/queryArrayResult";
import { GqlContext } from "../gql/GqlContext";
import { Instrument } from "../model/instrument";
import { EntityResult, STANDARD_ERROR } from "../common/commonValue";

export const queryGetInstrumentById = async (
    obj: any,
    args: { id: string },
    ctx: GqlContext,
    info: any
): Promise<Instrument | EntityResult> => {
    let instrument: QueryOneResult<Instrument>;
    try {
        instrument = await getInstrumentById(args.id);

        if (instrument.entity) return instrument.entity;

        return { success: instrument.success, messages: instrument.messages ? instrument.messages : [STANDARD_ERROR] };
    } catch (ex: any) {
        return {
            success: false,
            messages: [STANDARD_ERROR]
        }
    }
}

export const queryGetInstrumentByName = async (
    obj: any,
    args: { name: string },
    ctx: GqlContext,
    info: any
): Promise<Instrument | EntityResult> => {
    let instrument: QueryOneResult<Instrument>;
    try {
        instrument = await getInstrumentByName(args.name);

        if (instrument.entity) return instrument.entity;
        
        return {
            success: false,
            messages: instrument.messages ? instrument.messages : [STANDARD_ERROR],
        };
    } catch (ex: any) {
        return {
            success: false,
            messages: [STANDARD_ERROR]
        }
    }
}

export const queryGetInstruments = async (
    obj: any,
    args:null,
    ctx: GqlContext,
    info: any
): Promise<{instruments: Array<Instrument>} | EntityResult> => {
    let instruments: QueryArrayResult<Instrument>;
    try {
        instruments = await getInstruments();

        if (instruments.entities) return {instruments: instruments.entities};
        
        return {
            success: false,
            messages: instruments.messages ? instruments.messages : [STANDARD_ERROR],
        };
    } catch (ex: any) {
        return {
            success: false,
            messages: [STANDARD_ERROR]
        }
    }
}
