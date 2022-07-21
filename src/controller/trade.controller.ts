import { FinancialDefinition } from "../model/financialDefinition";
import { MarketData } from "../model/marketData";
import { Trade } from "../model/trade";
import { User } from "../model/user";
import { QueryOneResult } from "./queryArrayResult";


export const createTrade = async (
    user: User,
    finDef: FinancialDefinition,
    marketData: MarketData,
    quantity: number,
    price: number,
    code: string): Promise<QueryOneResult<Trade>> => {

    const date = new Date().toISOString().substr(0, 10);
    const trad = {
        quantity,
        price,
        date,
        code,
        user,
        financialDef: finDef,
        marketData
    };
    const trade = await Trade.create(trad).save()

    if (!trade)
        return {
            messages: ["Failed to create Trade."],
        };

    return {
        messages: [trade.code],
    };
}