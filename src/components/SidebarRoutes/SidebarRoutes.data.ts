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
} from 'lucide-react'

export const dataGeneralSidebar =[
    {
        icon: PanelsTopLeft,
        label: "Dashboard",
        href: "/"
    },
    {
        icon: Building2,
        label: "Companies",
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
        icon: Wrench,
        label: "Mantenimiento",
        href: "/fleet/maintenance"
    },
    {
        icon: ChartNoAxesCombined,
        label: "Centro de analisis",
        href: "/fleet/analytics"
    },{
        icon: Truck,
        label: "Tracking",
        href: "/"
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
        label: "Analytics",
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