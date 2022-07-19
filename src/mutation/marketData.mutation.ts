import { GqlContext } from "../gql/GqlContext"
import { EntityResult, STANDARD_ERROR } from "../common/commonValue";
import { User } from "../model/user";
import { createMarketData } from "../controller/marketData.controller";

export const createMarketDataMutation = async (
    obj: any,
    args: {volatility: number, spot: number, interestRate: number},
    ctx: GqlContext,
    info: any
): Promise<EntityResult> => {
    try {
        if (!ctx.req.session || !ctx.req.session!.userId)
            return {
                messages: ["You must be logged in before you create market data."]
            };

        const user = await User.findOne(ctx.req.session.userId);

        if (!user)
            return {
                messages: ["User Not Found"]
            };

        let result = await createMarketData(
            args.volatility,
            args.spot,
            args.interestRate,
            user
        );

        return {
            messages: result.messages ? result.messages : [STANDARD_ERROR],
        };
    } catch (ex) {
        throw ex;
    }
}