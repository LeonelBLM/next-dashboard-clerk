"use client"

import { useRouter } from "next/navigation";

import axios from "axios";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";

import { FooterVehicleProps } from "./FooterVehicle.types";
import { useToast } from "@/hooks/use-toast"

export function FooterVehicle(props: FooterVehicleProps) {
    const { vehiculoId } = props
    const router = useRouter()
    const { toast } = useToast()


    const onDeleteCompany = async () => {
        try {
            axios.delete(`/api/vehicle/${vehiculoId}`)
            toast({
                title: "Vehiculo eliminado",
            })
            router.push("/fleet/vehicles")
        } catch (error) {
            toast({
                title: "Something went wrong",
                variant: "destructive"
            })
        }
    }

    return (
        <div className="flex justify-end mt-5">
            <Button variant="destructive" onClick={onDeleteCompany}>
                <Trash className="w-4 h-4 mr-2" />
                Elimnar Vehiculo
            </Button>
        </div>
    )
}