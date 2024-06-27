import { NextResponse } from "next/server";
import pool from "../db.js";

export async function GET(req) {
    let connection;
    try {
        connection = await pool.getConnection();
        const url = new URL(req.url);
        const productId = url.searchParams.get('productId');

        const productsQuery = "SELECT * FROM products WHERE productId = ?";

        try {
            const [productsResult] = await connection.query(productsQuery, [productId]);
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
        const productId = body.productId;

        const deleteProductQuery = "DELETE FROM products WHERE productId = ?";
        const deleteProductFromCartQuery = "DELETE FROM carts WHERE productId = ?";

        try {
            await connection.query(deleteProductQuery, [productId]);
            await connection.query(deleteProductFromCartQuery, [productId]);
            return NextResponse.json({ message: "Product deleted" });
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