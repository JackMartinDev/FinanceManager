import { UUID } from "crypto";
import { pool as db } from "../database/db";

export default class User {
    constructor(public user:User, public id?: UUID){}

    async create() {}

    async update() {}

    static async fetchAll(): Promise<User[]> {

    }

    static async fetchById(id: UUID): Promise<User | undefined>{

    }

    static async deleteById(id:UUID) {
        
    }
}
