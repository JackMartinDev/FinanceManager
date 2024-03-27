import { pool as db } from "../database/db";
import { TSubscription } from "../utils/types";

export default class subscription {
    constructor(public subscription: TSubscription, public id?: string) {}

    async create() {
        try {
            const newSubscription = await db.query(
                "INSERT INTO subscriptions (id, name, price, start_date, end_date, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
                [this.subscription.id, this.subscription.name, this.subscription.price, this.subscription.startDate, this.subscription.endDate, this.subscription.userId]
            );
            return { result: newSubscription.rows[0], error: null };
        } catch (error) {
            return { result: null, error };
        }
    }

    async update() {
        try {
            const updateSubscription = await db.query(
                "UPDATE subscriptions SET name=$1, price=$2, start_date=$3, end_date=$4, modified_at=$5 WHERE id=$6",
                [this.subscription.name, this.subscription.price, this.subscription.startDate, this.subscription.endDate, new Date().toISOString(), this.id]
            );
            return { result: updateSubscription.rows[0], error: null };
        } catch (error) {
            return { result: null, error };
        }
    }

    static async fetchAll(): Promise<{ result: TSubscription[] | null, error: any }> {
        try {
            const subscriptions = await db.query("SELECT * FROM subscriptions");
            return { result: subscriptions.rows, error: null };
        } catch (error) {
            return { result: null, error };
        }
    }

    static async fetchById(id: string): Promise<{ result: TSubscription | null, error: any }> {
        try {
            const subscription = await db.query("SELECT * FROM subscriptions WHERE id = $1", [id]);
            return { result: subscription.rows[0], error: null };
        } catch (error) {
            return { result: null, error };
        }
    }

    static async fetchByUserId(userId: string): Promise<{ result: TSubscription[] | null, error: any }> {
        try {
            const subscription = await db.query("SELECT * FROM subscriptions WHERE user_id = $1", [userId]);
            return { result: subscription.rows, error: null };
        } catch (error) {
            return { result: null, error };
        }
    }

    static async deleteById(id: string) {
        try {
            const deleteSubscription = await db.query("DELETE FROM subscriptions WHERE id = $1", [id]);
            return { result: !!deleteSubscription.rowCount, error: null };
        } catch (error) {
            return { result: null, error };
        }
    }
}

