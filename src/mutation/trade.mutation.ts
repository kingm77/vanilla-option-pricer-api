import { GqlContext } from "../gql/GqlContext";
import { EntityResult, STANDARD_ERROR } from "../common/commonValue";
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
        if (args.quantity <= 0)
            return {
                messages: ["Invalid Quantity."],
            };

        if (!ctx.req.session?.userId) {
            return {
                messages: ["User not logged in."],
            };
        }

        const user = await User.findOne(ctx.req.session.userId);

        if (!user)
            return {
                messages: ["User not found."],
            }

        const findef = await FinancialDefinition.findOne(args.findDefId);

        if (!findef)
            return {
                messages: ["financial definition not found."],
            }

        const marketData = await MarketData.findOne(args.marketDataId);

        if (!marketData)
            return {
                messages: ["Market data not found."],
            }

        const result = await createTrade(
            user,
            findef,
            marketData,
            args.quantity,
            args.price,
            v4()
        );

        return {
            messages: result.messages ? result.messages : [STANDARD_ERROR],
        };
       


    } catch (ex) {
        throw ex;
    }
}