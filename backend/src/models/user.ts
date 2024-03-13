import { pool as db } from "../database/db";
import { TUser } from "../utils/types";

export default class User {
    constructor(public user:TUser, public id?: string){}

    async create() {
        try {
            const newUser = await db.query("INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3, $4) RETURNING *",[this.user.id, this.user.username, this.user.email,this.user.password]);
            return {result: newUser.rows[0], error: null}
        } catch (error) {
            return {result: null, error};
        }
    }

    async update() {
        try {
            const updateUser = await db.query("UPDATE user SET username=$1, password=$2, modified_at=$3", [this.user.username, this.user.password, new Date().toISOString()]);
            return {result: updateUser.rows[0], error: null}
        } catch (error) {
           return {result: null, error}
        }
    }

    static async fetchAll(): Promise<{result: TUser[] | null, error: any}> {
        try {
            const users = await db.query("SELECT * FROM users");
            return {result: users.rows, error: null}
        } catch (error) {
            return {result: null, error}
        }
    }

    static async fetchById(id: string): Promise<{result: TUser | null, error: any}>{
        try{
            const user = await db.query("SELECT * FROM user where id = $1", [id]);
            return {result: user.rows[0], error: null};
        } catch(error) {
            return {result: null, error}
        }
    }

    static async deleteById(id:string) {
        try {
            const deleteUser = await db.query("DELETE FROM users WHERE id = $1",[id]);
            return {result: !!deleteUser.rowCount, error: null};
        } catch (error) {
            return {result: null, error}
        } 
    }

    static async findOne(email: string):Promise<{result: TUser | null, error: any}>{
        try {
            const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
            return {result: user.rows[0], error: null};
        } catch (error) {
           return {result: null, error}
        }
    }
}
