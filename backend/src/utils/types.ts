import { UUID } from "crypto"

type User = {
    id: UUID
    username: string,
    password: string,
    createdAt: string,
    updatedAt: string
}
