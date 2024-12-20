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

        if (!data.ciudad_origen || !data.ciudad_destino || !data.distancia || !data.tiempo_estimado) {
            return new NextResponse("Faltan campos requeridos", { status: 400 });
        }

        const ruta = await db.ruta.create({
            data: {
                ciudadOrigen: data.ciudad_origen,
                ciudadDestino: data.ciudad_destino,
                distancia: data.distancia,
                tiempoEstimado: data.tiempo_estimado,
                condicionesRuta: data.condiciones_ruta || null
            },
        });

        return NextResponse.json(ruta);
    } catch (error) {
        console.log("[RUTA_CREATE]", error);
        return new NextResponse("Error Interno del Servidor", { status: 500 });
    }
}

export async function GET() {
    try {
        const rutas = await db.ruta.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(rutas);
    } catch (error) {
        console.log("[RUTA_GET]", error);
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

        const ruta = await db.ruta.update({
            where: {
                id: data.id
            },
            data: {
                ciudadOrigen: data.ciudad_origen,
                ciudadDestino: data.ciudad_destino,
                distancia: data.distancia,
                tiempoEstimado: data.tiempo_estimado,
                condicionesRuta: data.condiciones_ruta || null
            }
        });

        return NextResponse.json(ruta);
    } catch (error) {
        console.log("[RUTA_UPDATE]", error);
        return new NextResponse("Error Interno del Servidor", { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { userId } = await auth();
        const { searchParams } = new URL(req.url);
        const rutaId = searchParams.get("id");

        if (!userId) {
            return new NextResponse("No autorizado", { status: 401 });
        }

        if (!rutaId) {
            return new NextResponse("ID de ruta no proporcionado", { status: 400 });
        }

        const ruta = await db.ruta.delete({
            where: {
                id: parseInt(rutaId)
            }
        });

        return NextResponse.json(ruta);
    } catch (error) {
        console.log("[RUTA_DELETE]", error);
        return new NextResponse("Error Interno del Servidor", { status: 500 });
    }
}