import { EntityResult, STANDARD_ERROR } from "../common/commonValue";
import { GqlContext } from "../gql/GqlContext";
import { getPrice } from "../microservicesRequest/pricingRequest";
import { FinancialDefinition } from "../model/financialDefinition";
import { MarketData } from "../model/marketData";
import { User } from "../model/user";



export const getPriceQuery = async (
    obj: any,
    args: {
        findDefId: number,
        marketDataId: number,
        quantity: number,
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

        const result = await getPrice(findef, marketData, args.quantity);

        if (result.entity) {
            return {
                messages: [`${result.entity}`]
            }
        }

        return {
            messages: result.messages ? result.messages : [STANDARD_ERROR],
        };
    } catch (ex) {
        throw ex;
    }
}