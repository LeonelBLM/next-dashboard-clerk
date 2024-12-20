import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { choferId: string } }
) {
  try {
    const { userId } = await auth();
    const data = await req.json();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verificar que existe el chofer
    const chofer = await db.chofer.findUnique({
      where: {
        id: parseInt(params.choferId)
      },
    });

    if (!chofer) {
      return new NextResponse("Chofer not found", { status: 404 });
    }

    // Crear el documento
    const documento = await db.documentoChofer.create({
      data: {
        idChofer: parseInt(params.choferId),
        idTipoDocumento: data.idTipoDocumento,
        numeroDocumento: data.numeroDocumento,
        fechaEmision: new Date(data.fechaEmision),
        fechaVencimiento: new Date(data.fechaVencimiento),
        estado: data.estado,
        observaciones: data.observaciones
      },
    });

    return NextResponse.json(documento);

  } catch (error) {
    console.log("[DOCUMENTO_CHOFER]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// Opcionalmente podemos agregar los métodos GET, PUT y DELETE

export async function GET(
  req: Request,
  { params }: { params: { choferId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const documentos = await db.documentoChofer.findMany({
      where: {
        idChofer: parseInt(params.choferId)
      }
    });

    return NextResponse.json(documentos);

  } catch (error) {
    console.log("[DOCUMENTO_CHOFER]", error); 
    return new NextResponse("Internal Error", { status: 500 });
  }
}