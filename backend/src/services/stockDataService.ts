import Holding from "../models/holding"
import axios from "axios";
import { TStock } from "../utils/types";
import camelcaseKeys from "camelcase-keys";

const token = process.env.STOCKS_API_KEY;

export const fetchStockDataForUser = async (userId:string ) => {
    const {result, error} = await Holding.fetchByUserId(userId)

    if (error) throw new Error("An error occurred fetching holdings");
    if (!result) throw new Error("No holding found");

    try {
        const holdingsWithStockData = await Promise.all(result.map(async (holding) => {
            const stockData = await fetchStockData(holding.code);
            return {
                holding: camelcaseKeys(holding), 
                stockData: stockData.map(({ date, close }) => ({ date, close }))};
        }));

        return { result: holdingsWithStockData, error: null }
    } catch(error) {
        return {result: null, error}
    }
}


const fetchStockData = async(holdingCode: string):Promise<TStock[]> => {
    const response = await axios.get(`https://eodhd.com/api/eod/${holdingCode}.AU?period=d&api_token=${token}&fmt=json`);
    return response.data
}
