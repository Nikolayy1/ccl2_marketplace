import { NextResponse } from "next/server";
import pool from "../../db.js";

export async function GET(req) {
    let connection;
    try {
        connection = await pool.getConnection();
        const url = new URL(req.url);
        const userId = url.searchParams.get('userId');

        const productsQuery = "SELECT * FROM products WHERE userId = ?";

        try {
            const [productsResult] = await connection.query(productsQuery, [userId]);
            return NextResponse.json(productsResult);
        }
        catch (error) {
            return NextResponse.json({ message: "Error: " + error.message }, { status: 500 });
        }
        finally {
            connection.release();
        }
    }
    catch (error) {
        return NextResponse.json({ message: "Error: " + error.message }, { status: 500 });
    }
    finally {
        if (connection) {
            connection.release();
        }
    }
};
