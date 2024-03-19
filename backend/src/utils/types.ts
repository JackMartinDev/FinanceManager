import { UUID } from "crypto"

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


export type TStock = {
    date: string,
    close: number
}
