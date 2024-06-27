import { NextResponse } from "next/server";
import pool from "../../db.js";

export async function GET(req) {
    let connection;
    try {
        connection = await pool.getConnection();

        const countQuery = "SELECT COUNT(*) AS count FROM products";
        const randomEntry = "SELECT * FROM products LIMIT ?, 1";

        try {
            const [countResult] = await connection.query(countQuery);
            const count = countResult[0].count;
            const offset = Math.floor(Math.random() * count);

            const [entry] = await connection.query(randomEntry, [offset]);
            return NextResponse.json(entry);
        } catch (error) {
            return NextResponse.json({ message: "Error: " + error.message }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ message: "Error: " + error.message }, { status: 500 });
    } finally {
        if (connection) {
            connection.release();
        }
    }
};
