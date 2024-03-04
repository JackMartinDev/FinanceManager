export const formatAUD = (amount: number) => {
    return new Intl.NumberFormat('en-AU', {style: "currency", currency: "AUD"}).format(amount);
}

export const formatYEN = (amount: number) => {
    return new Intl.NumberFormat('ja-JP', {style: "currency", currency: "JPY"}).format(amount);
}

export const formatUSD = (amount: number) => {
    return new Intl.NumberFormat('en-US', {style: "currency", currency: "USD"}).format(amount);
}
