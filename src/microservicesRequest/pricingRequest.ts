import fetch from "node-fetch";
import { dateDifference } from "../common/dateDifference";
import { QueryOneResult } from "../controller/queryArrayResult";
import { FinancialDefinition } from "../model/financialDefinition";
import { MarketData } from "../model/marketData";
import dotenv from "dotenv";

dotenv.config();

export class Price {
    value: number
}

export class PriceResult {
    constructor(public messages?: Array<string>, public price?: Price) { }
}

export const getPrice =
    async (
        findef: FinancialDefinition,
        marketdata: MarketData,
        quantity: number): Promise<QueryOneResult<number>> => {
        const url = process.env.PRICING_SERVICE_URL + buildQueryString(findef, marketdata);
        console.log(url);
        try {
            const res = await fetch(url);

            if (!res.ok)
                return {
                    messages: ["pricing error"]
                };

            const json = await res.json();

            return {
                entity: transform(json) * quantity
            }
        }
        catch (ex) {
            return {
                messages: ["pricing error"]
            };
        }
        
}


const buildQueryString =
    (findef: FinancialDefinition, marketData: MarketData): string => {
        const findDefDate = new Date(findef.maturity);
        const curDate = new Date();
        return `${findef.type}?spot=${marketData.spot}&strike=${findef.strike}&interestRate=${marketData.interestRate}&volatility=${marketData.volatility}&timeToMaturity=${dateDifference(curDate, findDefDate)}`;
}

const transform =
    (json: any) => {
        const { result } = json,
              { price } = result
        console.log(parseFloat(price));
        return parseFloat(price);
}