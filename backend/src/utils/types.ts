import { UUID } from "crypto"

export type TUser = {
    id: UUID
    username: string,
    password: string,
    createdAt: string,
    updatedAt: string
}
