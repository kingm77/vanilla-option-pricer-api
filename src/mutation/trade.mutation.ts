import { GqlContext } from "../gql/GqlContext";
import { EntityResult, FIN_DEF_NOT_FOUND, INVALID_QUANTTY, MARKET_DATA_NOT_FOUND, STANDARD_ERROR, USER_NOT_FOUND, USER_NOT_LOGIN } from "../common/commonValue";
import { User } from "../model/user";
import { FinancialDefinition } from "../model/financialDefinition";
import { MarketData } from "../model/marketData";
import { createTrade } from "../controller/trade.controller";
import { v4 } from "uuid";

export const bookTradeMutation = async (
    obj: any,
    args: {
        findDefId: number,
        marketDataId: number,
        quantity: number,
        price: number
    },
    ctx: GqlContext,
    info: any
): Promise<EntityResult> => {
    try {
        if (args.quantity <= 0) return INVALID_QUANTTY;

        if (!ctx.req.session?.userId) return USER_NOT_LOGIN;

        const user = await User.findOne(ctx.req.session.userId);

        if (!user) return USER_NOT_FOUND;

        const findef = await FinancialDefinition.findOne(args.findDefId);

        if (!findef) return FIN_DEF_NOT_FOUND;

        const marketData = await MarketData.findOne(args.marketDataId);

        if (!marketData) return MARKET_DATA_NOT_FOUND

        const result = await createTrade(
            user,
            findef,
            marketData,
            args.quantity,
            args.price,
            v4()
        );

        return {
            success: false,
            messages: result.messages ? result.messages : [STANDARD_ERROR],
        };
    } catch (ex) {
        return {
            success: false,
            messages: [STANDARD_ERROR]
        }
    }
}