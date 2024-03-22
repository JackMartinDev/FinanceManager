type Holding = {
    id: string,
    userId: string,
    code: string,
    name: string,
    volume: number,
    buyPrice: number,
    color: string,
    createdAt: string,
    updatedAt: string
}

type Stock = {
    date: string,
    close: number,
}[]

type StockData = {
    holding: Holding,
    stockData: Stock
};
