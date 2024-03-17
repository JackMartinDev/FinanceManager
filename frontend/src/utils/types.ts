
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
    close: number,
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
