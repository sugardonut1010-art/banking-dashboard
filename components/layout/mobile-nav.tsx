"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { navigation } from "@/lib/navigation"

export function MobileNav() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-6 w-6" /> {/* slightly larger for touch */}
                </Button>
            </SheetTrigger>

            <SheetContent
                side="left"
                className="w-full max-w-xs md:hidden"
            >
                <div className="mb-6 text-xl font-bold p-4 border-b">
                    MyBank
                </div>

                <nav className="flex flex-col space-y-2 px-4">
                    {navigation.map((item) => {
                        const Icon = item.icon

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium hover:bg-muted"
                            >
                                <Icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>
            </SheetContent>
        </Sheet>
    )
}
