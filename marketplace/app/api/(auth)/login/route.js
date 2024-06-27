import { NextResponse } from "next/server";
import pool from "../../db";
import bcrypt from "bcrypt";

export async function POST(req) {
    let connection;
    try {
        const body = await req.json();
        const { email, password } = body;
        const hashedPassword = await bcrypt.hash(password, 10);
        connection = await pool.getConnection();
        try {
            const [user] = await connection.query("SELECT * FROM users WHERE email = ?", [email]);

            if (user.length === 0) {
                return NextResponse.json({ message: "User not found" }, { status: 404 });
            }
            const passwordMatch = await bcrypt.compare(password, user[0].password);

            if (!passwordMatch) {
                return NextResponse.json({ message: "Invalid password" }, { status: 401 });
            }
            return NextResponse.json({ message: "Login successful", success: true, user: user[0] });
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
