import { pool as db } from "../database/db";
import { THolding } from "../utils/types";

export default class Holding {
    constructor(public holding: THolding, public id?: string) {}

    async create() {
        try {
            const newHolding = await db.query(
                "INSERT INTO holdings (id, code, name, volume, buy_price, color, user_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
                [this.holding.id, this.holding.code, this.holding.name,this.holding.volume, this.holding.buyPrice, this.holding.color, this.holding.userId]
            );
            return { result: newHolding.rows[0], error: null };
        } catch (error) {
            return { result: null, error };
        }
    }

    async update() {
        try {
            const updateHolding = await db.query(
                "UPDATE holdings SET code=$1, volume=$2, name=$3, buy_price=$4, color=$5, modified_at=$6 WHERE id=$7",
                [this.holding.code, this.holding.volume, this.holding.name, this.holding.buyPrice, this.holding.color, new Date().toISOString(), this.holding.id]
            );
            return { result: updateHolding.rows[0], error: null };
        } catch (error) {
            return { result: null, error };
        }
    }

    static async fetchAll(): Promise<{ result: THolding[] | null, error: any }> {
        try {
            const holdings = await db.query("SELECT * FROM holdings");
            return { result: holdings.rows, error: null };
        } catch (error) {
            return { result: null, error };
        }
    }

    static async fetchById(id: string): Promise<{ result: THolding | null, error: any }> {
        try {
            const holding = await db.query("SELECT * FROM holdings WHERE id = $1", [id]);
            return { result: holding.rows[0], error: null };
        } catch (error) {
            return { result: null, error };
        }
    }

    static async fetchByUserId(userId: string): Promise<{ result: THolding[] | null, error: any }> {
        try {
            const holding = await db.query("SELECT * FROM holdings WHERE user_id = $1", [userId]);
            return { result: holding.rows, error: null };
        } catch (error) {
            return { result: null, error };
        }
    }

    static async deleteById(id: string) {
        try {
            const deleteHolding = await db.query("DELETE FROM holdings WHERE id = $1", [id]);
            return { result: !!deleteHolding.rowCount, error: null };
        } catch (error) {
            return { result: null, error };
        }
    }

    static async findByCode(code: string): Promise<{ result: THolding | null, error: any }> {
        try {
            const holding = await db.query("SELECT * FROM holdings WHERE code = $1", [code]);
            return { result: holding.rows[0], error: null };
        } catch (error) {
            return { result: null, error };
        }
    }
}

