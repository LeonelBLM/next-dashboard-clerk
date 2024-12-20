import { db } from '@/lib/db'
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const data = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const documento = await db.documentoChofer.create({
            data: {
                ...data,
            },
        });

        return NextResponse.json(documento);
    } catch (error) {
        console.log("[DOCUMENTO]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}