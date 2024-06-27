import { NextResponse } from "next/server";
import pool from "../db.js";

export async function GET(req) {
    let connection;
    try {
        connection = await pool.getConnection();
        const url = new URL(req.url);
        const search = url.searchParams.get('search');

        const sql = "SELECT * FROM products WHERE name LIKE ?";

        try {
            const [result] = await connection.query(sql, [`%${search}%`]);
            if (result.length === 0) {
                return NextResponse.json({ message: "No results found" }, { status: 404 });
            }
            return NextResponse.json({ result });
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