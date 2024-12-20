import { FileText, UserCircle } from "lucide-react";
import { ChoferInformationProps } from "./ChoferInformation.types";
import { ChoferForm } from "../ChoferForm";
import { ListDocumentos } from "../ListDocumentos";
import { NewDocumento } from "../NewDocumento";

export function ChoferInformation(props: ChoferInformationProps) {
    const { chofer } = props;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-10 gap-y-4">
            <div className="p-4 rounded-lg shadow-md bg-background hover:shadow-lg">
                <div>
                    <div className="flex items-center gap-x-2 mb-4">
                        <UserCircle className="w-8 h-8" />
                        <h3 className="text-lg font-medium">
                            {chofer.nombre} {chofer.apellido}
                        </h3>
                    </div>

                    <ChoferForm chofer={chofer} />
                </div>
            </div>
            
            <div className="p-4 rounded-lg shadow-md bg-background hover:shadow-lg h-min">
                <div className="flex items-center justify-between gap-x-2">
                    <div className="flex items-center gap-x-2">
                        <FileText className="w-5 h-5" />
                        <span>Documentos</span>
                    </div>
                    <div>
                        <NewDocumento choferId={chofer.id} />
                    </div>
                </div>
                
                <ListDocumentos chofer={chofer} />
            </div>
        </div>
    );
}