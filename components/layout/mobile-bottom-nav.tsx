"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { navigation } from "@/lib/navigation"

export function MobileBottomNav() {
    const pathname = usePathname()

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
            <div className="flex h-16 items-center justify-around">
                {navigation
                    .filter((item) => item.mobile)
                    .map((item) => {
                        const active = pathname === item.href
                        const Icon = item.icon

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex flex-col items-center justify-center gap-1 text-xs transition-colors",
                                    active
                                        ? "text-primary"
                                        : "text-muted-foreground",
                                    item.primary &&
                                    "relative -top-4 rounded-full bg-primary px-4 py-2 text-primary-foreground shadow-lg"
                                )}
                            >
                                <Icon
                                    className={cn(
                                        "h-5 w-5",
                                        item.primary && "h-6 w-6"
                                    )}
                                />
                                {!item.primary && item.name}
                            </Link>
                        )
                    })}
            </div>
        </nav>
    )
}
