import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { FileText, Calendar, AlertCircle } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { ListDocumentosProps } from "./ListDocumentos.types"
import { auth } from '@clerk/nextjs/server'

export async function ListDocumentos(props: ListDocumentosProps) {
    const { chofer } = props
    const { userId } = await auth()

    if (!userId) {
        return redirect("/")
    }

    const documentos = await db.documentoChofer.findMany({
        where: {
            idChofer: chofer.id
        },
        include: {
            tipoDocumento: true
        }
    })

    if (documentos.length === 0) {
        return <p>No hay documentos registrados para este conductor</p>
    }

    const checkVencimiento = (fechaVencimiento: Date | null) => {
        if (!fechaVencimiento) return false
        const hoy = new Date()
        const diasRestantes = Math.ceil((fechaVencimiento.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24))
        return diasRestantes <= 30
    }

    return (
        <div>
            <div className='grid items-center justify-between grid-cols-4 p-2 px-4 mt-4 mb-2 rounded-lg gap-x-3 bg-slate-400/20'>
                <p>Tipo</p>
                <p>Número</p>
                <p>Vencimiento</p>
                <p className='text-right'>Estado</p>
            </div>

            {documentos.map((documento) => (
                <div key={documento.id}>
                    <div className='grid items-center justify-between grid-cols-4 px-4 gap-x-3'>
                        <div className="flex items-center gap-x-2">
                            <FileText className="w-4 h-4" />
                            <p>{documento.tipoDocumento?.nombre}</p>
                        </div>
                        <p>{documento.numeroDocumento}</p>
                        <div className="flex items-center gap-x-2">
                            <Calendar className="w-4 h-4" />
                            <p>{documento.fechaVencimiento ? 
                                new Date(documento.fechaVencimiento).toLocaleDateString() : 
                                'No aplica'}
                            </p>
                        </div>
                        <div className="flex items-center justify-end gap-x-2">
                            {checkVencimiento(documento.fechaVencimiento) && (
                                <AlertCircle className="w-4 h-4 text-red-500" />
                            )}
                            <p className={`${documento.estado === 'Vigente' ? 'text-green-500' : 'text-red-500'}`}>
                                {documento.estado}
                            </p>
                        </div>
                    </div>
                    <Separator className='my-3' />
                </div>
            ))}
        </div>
    )
}