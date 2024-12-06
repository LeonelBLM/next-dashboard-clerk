import { db } from '@/lib/db';
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        const data = await req.json();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        // Desestructura para separar los campos que no queremos pasar directamente
        const { estado_id, tipo_id, anio, ...restData } = data;

        // Verifica que el estado exista
        const estadoExistente = await db.estadoVehiculo.findUnique({
            where: { id: estado_id },
        });

        if (!estadoExistente) {
            return new NextResponse("Estado no válido", { status: 400 });
        }

        // Verifica que el tipo exista
        const tipoExistente = await db.tipoVehiculo.findUnique({
            where: { id: tipo_id },
        });

        if (!tipoExistente) {
            return new NextResponse("Tipo de vehículo no válido", { status: 400 });
        }

        // Crea el vehículo
        const vehiculo = await db.vehiculo.create({
            data: {
                ...restData,
                anio: parseInt(anio),
                tipoId: tipoExistente.id,
                estadoId: estadoExistente.id
            },
        });

        return NextResponse.json(vehiculo);
    } catch (error) {
        console.error("[VEHICULO]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}