"use client"

import { useRouter } from "next/navigation"
import axios from "axios"
import { Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FooterChoferProps } from "./FooterChofer.types"
import { useToast } from "@/hooks/use-toast"

export function FooterChofer(props: FooterChoferProps) {
    const { choferId } = props
    const router = useRouter()
    const { toast } = useToast()

    const onDeleteChofer = async () => {
        try {
            await axios.delete(`/api/chofer/${choferId}`)
            toast({
                title: "Conductor eliminado exitosamente"
            })
            router.push("/choferes")
        } catch (error) {
            toast({
                title: "Error al eliminar el conductor",
                variant: "destructive"
            })
        }
    }

    return (
        <div className="flex justify-end mt-5">
            <Button 
                variant="destructive" 
                onClick={onDeleteChofer}
                className="flex items-center"
            >
                <Trash className="w-4 h-4 mr-2" />
                Eliminar Conductor
            </Button>
        </div>
    )
}