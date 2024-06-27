import { NextResponse } from "next/server";
import pool from "../../db.js";

export async function GET(req) {
    let connection;
    try {
        connection = await pool.getConnection();
        const url = new URL(req.url);
        const productId = url.searchParams.get('productId');

        const userQuery = "SELECT userId FROM products WHERE productId = ?";
        const userDataQuery = "SELECT * FROM users WHERE userId = ?";

        try {
            const [userId] = await connection.query(userQuery, [productId]);
            const [userData] = await connection.query(userDataQuery, [userId[0].userId]);
            console.log(userId, userData);
            return NextResponse.json(userData);
        }
        catch (error) {
            return NextResponse.json({ message: "Error: " + error.message }, { status: 500 });
        }
        finally {
            if (connection) {
                connection.release();

            }
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
