import { NextResponse } from "next/server";
import pool from "../db.js";

export async function GET(req) {
    let connection;
    try {
        connection = await pool.getConnection();
        const url = new URL(req.url);
        const cartId = url.searchParams.get('cartId');

        const productsQuery = "SELECT * FROM carts WHERE cartId = ?";

        try {
            const [productsResult] = await connection.query(productsQuery, [cartId]);
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

export async function DELETE(req) {
    let connection;
    try {
        connection = await pool.getConnection();
        const body = await req.json();
        const { cartId, productId } = body;

        const deleteQuery = "DELETE FROM carts WHERE cartId = ? AND productId = ?";
        console.log(deleteQuery, cartId, productId);

        try {
            await connection.query(deleteQuery, [cartId, productId]);
            return NextResponse.json({ message: "Product removed from cart" });
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
}

export async function POST(req) {
    let connection;
    try {
        connection = await pool.getConnection();
        const body = await req.json();
        const { cartId, productId, date } = body;

        const checkQuery = "SELECT * FROM carts WHERE cartId = ? AND productId = ?";
        const insertQuery = "INSERT INTO carts (cartId, productId, date) VALUES (?, ?, ?)";

        try {
            const [checkResult] = await connection.query(checkQuery, [cartId, productId]);
            if (checkResult.length > 0) {
                return NextResponse.json({ message: "Product already in cart" });
            }
            await connection.query(insertQuery, [cartId, productId, date]);
            return NextResponse.json({ message: "Product added to cart" });
        }
        catch (error) {
            return NextResponse.json({ message: "Error: " + error.message }, { status: 500 });
        }
        finally {
            await connection.release();
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