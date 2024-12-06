import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from 'next/navigation'

import { Header } from "./components/Header/Header"
import { VehicleInformation } from "./components/VehicleInformation"
import { FooterVehicle } from "./components/FooterVehicle"


export default async function VehicleIdPage({ params }: { params: { vehiclesId: string } }) {
    const { userId } = await auth()
    
    if (!userId) {
        return redirect("/")
    }


    const vehiculo = await db.vehiculo.findUnique({
        where: {
            id: params.vehiclesId,
        }
        
    })
    console.log(params.vehiclesId)
    if (!vehiculo) {
        return redirect("/")
    }

    return (
        <div>
            <Header />
            <VehicleInformation vehiculo={vehiculo} />
            <FooterVehicle vehiculoId={vehiculo.id} />
        </div>
    )
}