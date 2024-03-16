
type UserHolding = {
    id: string,
    code: string,
    name: string,
    volume: number,
    buyPrice: number,
    color: string
}

type StockData = {
    date: string,
    open: number,
    high: number,
    low: number,
    close: number,
    adjustedClose: number,
    volume: number
}[];

type StockInfo = {
    id: string,
    code: string,
    name: string,
    volume: number,
    buyPrice: number,
    color: string,
    data?: StockData
}

type HoldingsData = StockInfo[];
