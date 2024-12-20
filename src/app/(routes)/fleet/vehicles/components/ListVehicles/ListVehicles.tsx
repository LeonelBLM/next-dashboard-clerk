import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { Vehiculo, EstadoVehiculo } from "@prisma/client"

type VehicleWithState = Vehiculo & {
    estado: EstadoVehiculo | null;
}

export default async function ListVehicles() {
    const { userId } = await auth();
  
    if (!userId) {
        return redirect("/")
    }

    const vehicles = await db.vehiculo.findMany({
        include: {
            estado: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });

    return (
        <DataTable 
            columns={columns} 
            data={vehicles as VehicleWithState[]}
        />
    )
}