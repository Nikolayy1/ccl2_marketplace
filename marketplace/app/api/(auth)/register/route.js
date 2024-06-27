import { NextResponse } from "next/server";
import pool from "../../db";
import bcrypt from "bcrypt";

export async function POST(req) {
    let connection;
    try {
        connection = await pool.getConnection();
        const body = await req.json();
        const { name, email, password, address, postalCode, city, phone, country } = body;

        const hashedPassword = await bcrypt.hash(password, 10);
        const query = "INSERT INTO users (name, email, password, street, postalCode, city, phone, country, cartId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

        const [registeredUser] = await connection.query(query, [name, email, hashedPassword, address, postalCode, city, phone, country, null]);
        console.log(registeredUser);
        const cartId = registeredUser.insertId;
        const updateCartId = await connection.query("UPDATE users SET cartId = ? WHERE userId = ?", [cartId, registeredUser.insertId]);

        return NextResponse.json({ message: "User registered" });
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
