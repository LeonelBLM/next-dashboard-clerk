import { db } from '@/lib/db'
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const data = await req.json();

        if (!userId) {
            return new NextResponse("No autorizado", { status: 401 });
        }

        // Verificar si ya existe una chata con ese chasis
        const existingChata = await db.chata.findUnique({
            where: {
                chasis: data.chasis
            }
        });

        if (existingChata) {
            return new NextResponse("Ya existe una chata con ese número de chasis", { status: 400 });
        }

        // Crear el registro de la chata
        const chata = await db.chata.create({
            data: {
                chasis: data.chasis,
                tipo_chata: data.tipoChata,
                estado: data.estado,
                capacidad: data.capacidad,
                foto: data.foto
            },
        });

        return NextResponse.json(chata);
    } catch (error) {
        console.log("[CHATA_CREATE]", error);
        return new NextResponse("Error Interno del Servidor", { status: 500 });
    }
}

export async function GET() {
    try {
        const chatas = await db.chata.findMany({
            include: {
                vehiculos: true,
                documentos: true,
                mantenimientos: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(chatas);
    } catch (error) {
        console.log("[CHATA_GET]", error);
        return new NextResponse("Error Interno del Servidor", { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const { userId } = await auth();
        const data = await req.json();

        if (!userId) {
            return new NextResponse("No autorizado", { status: 401 });
        }

        const chata = await db.chata.update({
            where: {
                chasis: data.chasis
            },
            data: {
                tipo_chata: data.tipoChata,
                estado: data.estado,
                capacidad: data.capacidad,
                foto: data.foto
            }
        });

        return NextResponse.json(chata);
    } catch (error) {
        console.log("[CHATA_UPDATE]", error);
        return new NextResponse("Error Interno del Servidor", { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { userId } = await auth();
        const { searchParams } = new URL(req.url);
        const chasis = searchParams.get("chasis");

        if (!userId) {
            return new NextResponse("No autorizado", { status: 401 });
        }

        if (!chasis) {
            return new NextResponse("Número de chasis no proporcionado", { status: 400 });
        }

        const chata = await db.chata.delete({
            where: {
                chasis: chasis
            }
        });

        return NextResponse.json(chata);
    } catch (error) {
        console.log("[CHATA_DELETE]", error);
        return new NextResponse("Error Interno del Servidor", { status: 500 });
    }
}