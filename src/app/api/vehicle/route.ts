// /api/vehicle/route.ts
import { db } from '@/lib/db';
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return new NextResponse("No autorizado", { status: 401 });
        }

        const data = await req.json();
        console.log("Datos recibidos en API:", data); // Para depuración

        // Verificar que el estado existe
        const estadoExistente = await db.estadoVehiculo.findUnique({
            where: { 
                id: parseInt(data.idEstado) 
            },
        });

        if (!estadoExistente) {
            console.log("Estado no encontrado:", data.idEstado); // Para depuración
            return new NextResponse("Estado no encontrado en la base de datos", { status: 400 });
        }

        // Crear el vehículo
        const vehiculo = await db.vehiculo.create({
            data: {
                placa: data.placa,
                marca: data.marca,
                modelo: data.modelo,
                anio: parseInt(data.anio),
                tipoVehiculo: data.tipoVehiculo,
                idEstado: parseInt(data.idEstado)
            },
        });

        console.log("Vehículo creado:", vehiculo); // Para depuración
        return NextResponse.json(vehiculo);

    } catch (error) {
        console.error("[VEHICULO_CREATE_ERROR]", error);
        if (error instanceof Error) {
            return new NextResponse(error.message, { status: 500 });
        }
        return new NextResponse("Error interno del servidor", { status: 500 });
    }
}

// Tipos para TypeScript
type CreateVehicleData = {
    placa: string;
    marca: string;
    modelo: string;
    anio: string | number;
    tipoVehiculo: string;
    idEstado: string | number;
}