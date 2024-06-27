import { NextResponse } from "next/server";
import pool from "../../db";

export async function POST(req) {
    let connection;
    try {
        const formData = await req.formData();

        const name = formData.get("name");
        const price = formData.get("price");
        const description = formData.get("description");
        const userId = formData.get("userId");

        connection = await pool.getConnection();
        const sql = "INSERT INTO products (name, price, description, userId) VALUES (?, ?, ?, ?)";
        const values = [name, price, description, userId];

        try {
            const result = await connection.query(sql, values);
            console.log(result);
            const productId = result[0].insertId;
            return NextResponse.json({ id: productId }, { status: 201 });
        } finally {
            connection.release();
        }
    } catch (error) {
        return NextResponse.json({ message: "Error: " + error.message }, { status: 500 });
    }
    finally {
        if (connection){
            connection.release();
        }
    }
}
