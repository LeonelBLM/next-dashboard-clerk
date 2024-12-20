import {
    BarChart4,
    Building2,
    PanelsTopLeft,
    Settings,
    ShieldCheck,
    CircleHelpIcon,
    Calendar,
    Truck,
    Wrench,
    ChartNoAxesCombined,
    BookCheck,
} from 'lucide-react'

export const dataGeneralSidebar =[
    {
        icon: PanelsTopLeft,
        label: "Dashboard",
        href: "/"
    },
    {
        icon: Building2,
        label: "Clientes",
        href: "/companies"
    },
    {
        icon: Calendar,
        label: "Calendar",
        href: "/tasks"
    },
]

export const dataGeneralFlota =[
    {
        icon: Truck,
        label: "Vehiculos",
        href: "/fleet/vehicles"
    },
    {
        icon: Truck,
        label: "Carrocerias",
        href: "/chata"
    },
    {
        icon: Truck,
        label: "Choferes",
        href: "/chofer"
    },
    {
        icon: Wrench,
        label: "Mantenimiento",
        href: "/fleet/maintenance"
    },
    {
        icon: ChartNoAxesCombined,
        label: "Centro de analisis",
        href: "/fleet/analytics"
    },{
        icon: ChartNoAxesCombined,
        label: "Gestion de Rutas",
        href: "/rutas"
    },{
        icon: Truck,
        label: "Tracking",
        href: "/tracking"
    },{
        icon: BookCheck,
        label: "Documentos",
        href: "/dashdocuments"
    },{
        icon: BookCheck,
        label: "Documentos Chofer",
        href: "/documento"
    },  
]

export const dataToolsSidebar = [
    {
        icon: CircleHelpIcon,
        label: "Faqs",
        href: "/faqs"
    },
    {
        icon: BarChart4,
        label: "Analiticas",
        href: "/analytics"
    },
]

export const dataSupportSidebar = [
    {
        icon: Settings,
        label: "Setting",
        href: "/setting"
    },
    {
        icon: ShieldCheck,
        label: "Security",
        href: "/security"
    },
]