import { UUID } from "crypto"

export type TUser = {
    id: string,
    username: string,
    email: string,
    password: string,
    createdAt?: string,
    updatedAt?: string
}
