import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { redirect } from 'next/navigation'

import { Header } from "./components/Header/Header"
import { ChoferInformation } from "./components/ChoferInformation"
import { FooterChofer } from "./components/FooterChofer"

interface ChoferPageParams {
    params: {
        choferId: string
    }
}

export default async function ChoferIdPage({ params }: ChoferPageParams) {
    const { userId } = await auth()

    if (!userId) {
        return redirect("/")
    }

    const chofer = await db.chofer.findUnique({
        where: {
            id: parseInt(params.choferId)
        },
        include: {
            estado: true,
            documentos: {
                include: {
                    tipoDocumento: true
                }
            }
        }
    })

    if (!chofer) {
        return redirect("/choferes")
    }

    return (
        <div className="space-y-6">
            <Header />
            <ChoferInformation chofer={chofer} />
            <FooterChofer choferId={chofer.id} />
        </div>
    )
}