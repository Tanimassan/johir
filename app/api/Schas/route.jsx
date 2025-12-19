import { NextResponse } from "next/server";
import connectMongo, { Link } from "../lib/database";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("query")?.toLowerCase() || "";

        // Connect MongoDB
        await connectMongo();

        // Mongoose: find() already array return kore, toArray() lagbe na
        const results = await Link.find({ name: { $regex: query, $options: "i" } });

        return NextResponse.json({ success: true, data: results });
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message });
    }
}
