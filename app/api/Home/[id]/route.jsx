import { NextResponse } from "next/server";
import connectMongo, { Link } from "../../../api/lib/database";

export async function GET({ params }) {
    try {
        await connectMongo();

        const { id } = await params; // ✅ URL থেকে id

        if (!id) {
            return NextResponse.json(
                { success: false, message: "ID not provided" },
                { status: 400 }
            );
        }

        const home = await Link.findById(id);

        if (!home) {
            return NextResponse.json(
                { success: false, message: "Home not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, home });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        await connectMongo();

        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { success: false, message: "ID not provided" },
                { status: 400 }
            );
        }

        const deletedHome = await Link.findByIdAndDelete(id);

        if (!deletedHome) {
            return NextResponse.json(
                { success: false, message: "Home not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Home deleted successfully",
            data: deletedHome
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
