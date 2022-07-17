import { QueryArrayResult, QueryOneResult } from "./queryArrayResult";
import { Instrument } from "../model/instrument";

export const getInstrumentById = async (
    id: string
): Promise<QueryOneResult<Instrument>> => {
    const instrument = await Instrument.findOne({ id });
    if (!instrument) {
        return {
        messages: ["Instrument not found."],
        };
    }

    return {
        entity: instrument,
    };
};

export const getInstrumentByName = async (
    name: string
): Promise<QueryOneResult<Instrument>> => {
    const instrument = await Instrument.findOne({where:{name}});
    console.log(instrument)
    if (!instrument) {
        return {
        messages: ["Instrument not found."],
        };
    }

    return {
        entity: instrument,
    };
};

export const getInstruments = async (): Promise<QueryArrayResult<Instrument>> => {
    const instruments = await Instrument.find()
    console.log(instruments)
    if (!instruments) {
        return {
        messages: ["No Instrument was found."],
        };
    }

    return {
        entities: instruments,
    };
};