import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req, res) => {
    const formData = await req.formData();
    const productId = formData.get("productId");
    const file = formData.get("file");

    if (!file) {
        return NextResponse.json({ error: "No files received." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `product-${productId}.png`;

    try {
        const savePath = path.join(process.cwd(), "app/uploads", filename);
        
        await writeFile(
            path.join(process.cwd(), "app/uploads", filename),
            buffer
        );
        return NextResponse.json({ message: "Success", url: savePath }, { status: 201 });
    } catch (error) {
        console.error("Error occurred:", error);
        return NextResponse.json({ message: "Failed", status: 500 });
    }
};
