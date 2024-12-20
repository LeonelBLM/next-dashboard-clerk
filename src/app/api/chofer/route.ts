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

        // Convertir la fecha de string a Date
        const fechaNacimiento = new Date(data.fechaNacimiento);

        // Crear el registro del chofer
        const chofer = await db.chofer.create({
            data: {
                nombre: data.nombre,
                apellido: data.apellido,
                fechaNacimiento,
                direccion: data.direccion,
                telefono: data.telefono,
                idEstado: data.idEstado
            },
        });

        return NextResponse.json(chofer);
    } catch (error) {
        console.log("[CHOFER_CREATE]", error);
        return new NextResponse("Error Interno del Servidor", { status: 500 });
    }
}

export async function GET() {
    try {
        const choferes = await db.chofer.findMany({
            include: {
                estado: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(choferes);
    } catch (error) {
        console.log("[CHOFER_GET]", error);
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

        const chofer = await db.chofer.update({
            where: {
                id: data.id
            },
            data: {
                nombre: data.nombre,
                apellido: data.apellido,
                fechaNacimiento: new Date(data.fechaNacimiento),
                direccion: data.direccion,
                telefono: data.telefono,
                idEstado: data.idEstado
            }
        });

        return NextResponse.json(chofer);
    } catch (error) {
        console.log("[CHOFER_UPDATE]", error);
        return new NextResponse("Error Interno del Servidor", { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { userId } = await auth();
        const { searchParams } = new URL(req.url);
        const choferId = searchParams.get("id");

        if (!userId) {
            return new NextResponse("No autorizado", { status: 401 });
        }

        if (!choferId) {
            return new NextResponse("ID de chofer no proporcionado", { status: 400 });
        }

        const chofer = await db.chofer.delete({
            where: {
                id: parseInt(choferId)
            }
        });

        return NextResponse.json(chofer);
    } catch (error) {
        console.log("[CHOFER_DELETE]", error);
        return new NextResponse("Error Interno del Servidor", { status: 500 });
    }
}