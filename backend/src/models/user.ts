import { UUID } from "crypto";
import { pool as db } from "../database/db";
import { TUser } from "../utils/types";

export default class User {
    constructor(public user:TUser, public id?: UUID){}

    async create() {
        try {
            const newUser = await db.query("INSERT INTO users (id, username, password) VALUES ($1, $2, $3) RETURNING *",[this.user.id, this.user.username, this.user.password]);
            return newUser
        } catch (error) {
            throw error
        }
    }

    async update() {
        try {
            const updateUser = await db.query("UPDATE user SET username=$1, password=$2", [this.user.username, this.user.password]);
            return updateUser
        } catch (error) {
           throw error 
        }
    }

    static async fetchAll(): Promise<User[]> {
        try {
            const users = await db.query("SELECT * FROM users");
            return users.rows
        } catch (error) {
            throw error
        }
    }

    static async fetchById(id: UUID): Promise<User | undefined>{
        try{
            const user = await db.query("SELECT * FROM user where id = $1", [id]);
            if (user.rowCount === 0) {
                console.log("This client does not exist");
                return
            }
            return user.rows[0];
        } catch(error) {
            throw error
        }
    }

    static async deleteById(id:UUID) {
        try {
            const deleteUser = await db.query("DELETE FROM users WHERE id = $1",[id]);
            return !!deleteUser.rowCount;
        } catch (error) {
            throw error
        } 
    }
}
