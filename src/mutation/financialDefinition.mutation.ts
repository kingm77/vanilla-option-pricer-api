import { GqlContext } from "../gql/GqlContext";
import { EntityResult, STANDARD_ERROR } from "../common/commonValue";
import { createFinancialDefinition } from "../controller/financialDefinition.controller";
import { User } from "../model/user";
import { getInstrumentByName } from "../controller/instrument.controller";
import { OptionType } from "../model/financialDefinition";

export const createfinDefMutation = async (
    obj: any,
    args: { instrumentName: string, strike: number, maturity: string, type: string },
    ctx: GqlContext,
    info: any
): Promise<EntityResult> => {
    try {
        if (!ctx.req.session || !ctx.req.session!.userId) 
            return {
                messages: ["You must be logged in before you create financial definition."]
            };

        const user = await User.findOne(ctx.req.session.userId);

        if (!user)
            return {
                messages: ["User Not Found"]
            };

        const instrument = await (await getInstrumentByName(args.instrumentName)).entity;

        if (!instrument)
            return {
                messages: ["Instrument Not Found"]
            };

        let opt: OptionType = OptionType.CALL;
        if (args.type == OptionType.CALL)
            opt = OptionType.CALL
        else if (args.type == OptionType.PUT)
            opt = OptionType.PUT
        else
            return {
                messages: ["Type Not Found"]
            };

        let result = await createFinancialDefinition(
            user,
            instrument,
            args.strike,
            new Date(args.maturity),
            opt
        );

        return {
            messages: result.messages ? result.messages : [STANDARD_ERROR],
        };
    } catch (ex) {
        throw ex;
    }
}