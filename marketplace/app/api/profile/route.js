import { NextResponse } from "next/server";
import pool from "../db.js";

export async function POST(req) {
    let connection;
    try {
        connection = await pool.getConnection();
        const body = await req.json();
        const id = body[0];
        const { name, email, phone, country, city, street } = body[1];

        const user = "SELECT * FROM users WHERE userId = ?";
        const updateUser = "UPDATE users SET name = ?, email = ?, phone = ?, country = ?, city = ?, street = ? WHERE userId = ?";

        try {
            const [userResult] = await connection.query(user, [id]);
            if (userResult.length === 0) {
                return NextResponse.json({ message: "User not found" }, { status: 404 });
            }
            const [updateResult] = await connection.query(updateUser, [name, email, phone, country, city, street, id]);
            return NextResponse.json({ message: "User updated successfully", success: true });
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