import { VehiculoInformationProps } from "./VehicleInformation.types";
import { User } from "lucide-react";
import { VehiculoForm } from "../VehicleForm";
import { NewContact } from "../NewContact";
import { ListMaintenance } from "../ListMaintenance";


export function VehicleInformation(props: VehiculoInformationProps) {
    const { vehiculo } = props

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 gap-y-4">
            <div className="p-4 rounded-lg shadow-md bg-background hover:shadow-lg">
                <div>
                    <VehiculoForm vehiculo={vehiculo} />
                </div>
            </div>
            <div className="p-4 rounded-lg shadow-md bg-background hover:shadow-lg h-min">
                <div className="flex items-center justify-between gap-x-2">
                    <div className="flex items-center gap-x-2">
                        <User className="w-5 h-5" />
                        Contacts
                    </div>
                    <div>
                        <NewContact />
                    </div>
                </div>
                <ListMaintenance vehiculo={vehiculo} />
            </div>
        </div>
    )
}