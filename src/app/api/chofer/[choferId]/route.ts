import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params }: { params: { choferId: string } }
  ) {
    try {
      const { userId } = await auth();
      const { choferId } = params;
      const values = await req.json();
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      // Separar fechaNacimiento del resto de valores
      const { fechaNacimiento, ...restValues } = values;
  
      const chofer = await db.chofer.update({
        where: {
          id: parseInt(choferId)
        },
        data: {
          ...restValues,
          fechaNacimiento: fechaNacimiento ? new Date(fechaNacimiento).toISOString() : undefined,
        },
      });
  
      return NextResponse.json(chofer);
    } catch (error) {
      console.log("[CHOFER ID]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }

export async function DELETE(
  req: Request,
  { params }: { params: { choferId: string } }
) {
  try {
    const { userId } = await auth();
    const { choferId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const deletedChofer = await db.chofer.delete({
      where: {
        id: parseInt(choferId),
      },
    });

    return NextResponse.json(deletedChofer);
  } catch (error) {
    console.log("[DELETE CHOFER ID]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}