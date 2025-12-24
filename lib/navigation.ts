import {
    LayoutDashboard,
    Wallet,
    ArrowLeftRight,
    FileText,
    Settings,
} from "lucide-react"

export const navigation = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        mobile: true,
    },
    {
        name: "Accounts",
        href: "/dashboard/accounts",
        icon: Wallet,
        mobile: true,
    },
    {
        name: "Transfer",
        href: "/dashboard/transfer",
        icon: ArrowLeftRight,
        mobile: true,
        primary: true, // 👈 emphasized action
    },
    {
        name: "Transactions",
        href: "/dashboard/transactions",
        icon: FileText,
        mobile: true,
    },
    {
        name: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
        mobile: true,
    },
]
