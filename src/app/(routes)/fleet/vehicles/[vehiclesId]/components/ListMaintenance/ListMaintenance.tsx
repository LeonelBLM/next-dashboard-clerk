import { redirect } from 'next/navigation'

import { db } from '@/lib/db';

import { Mail, Phone } from 'lucide-react';

import { Separator } from '@/components/ui/separator';

import { ListMaintenanceProps } from "./ListMaintenance.types";
import { auth } from '@clerk/nextjs/server';

export async function ListMaintenance(props: ListMaintenanceProps) {
    const { vehiculo } = props
    const { userId } = await auth()

    if (!userId) {
        return redirect("/")
    }

    const mantenimientos = await db.mantenimiento.findMany({
        where: {
            vehiculo: {
                id: vehiculo.id
            }
        }
    })

    if (mantenimientos.length === 0) {
        return <p>Actualmente no dispones de ningún mantenimiento</p>
    }

    return (
        <div >
            <div className='grid items-center justify-between grid-cols-3 p-2 px-4 mt-4 mb-2 rounded-lg gap-x-3 bg-slate-400/20'>
                <p>Name</p>
                <p>Role</p>
                <p className='text-right'>Mantenimientos</p>
            </div>

            {mantenimientos.map((mantenimiento) => (
                <div key={mantenimiento.id}>
                    <div className='grid items-center justify-between grid-cols-3 px-4 gap-x-3'>
                        <p>{mantenimiento.vehiculoId}</p>
                        <p>{mantenimiento.fecha.toString()}</p>
                        <div className='flex items-center justify-end gap-x-6'>
                        <p>{mantenimiento.descripcion}</p>
                        <p>{mantenimiento.costo.toString()}</p>
                        </div>
                    </div>
                    <Separator className='my-3' />
                </div>
            ))}
        </div>
    )
}