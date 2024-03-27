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

//Maybe use date type for month
type Subscription = {
    id: string,
    name: string,
    price: number,
    startDate: string,
    endDate?: string,
    userId: string,
    createdAt?: string,
    updatedAt?: string
}

type MonthlySubscription = {
    month: string,
    subscriptions: {name: string, price: number}[],
    total: number
}

type SubscriptionList = {
    subscriptions: Subscription[],
    monthlyList: MonthlySubscription[]
}


