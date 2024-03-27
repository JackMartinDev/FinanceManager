export type TUser = {
    id: string,
    username: string,
    email: string,
    password: string,
    createdAt?: string,
    updatedAt?: string
}

export type THolding = {
    id: string,
    code: string,
    name: string,
    volume: number,
    buyPrice: number,
    color: string,
    userId: string,
    createdAt?: string,
    updatedAt?: string
}

export type TSubscription = {
    id: string,
    name: string,
    price: number,
    startDate: string,
    endDate?: string,
    userId: string,
    createdAt?: string,
    updatedAt?: string
}

export type TMonthlySubscription = {
    month: string,
    subscriptions: {name: string, price: number}[],
    total: number
}

export type TSubscriptionList = {
    subscriptions: TSubscription[],
    monthlyList: TMonthlySubscription[]
}


export type TStock = {
    date: string,
    close: number
}
