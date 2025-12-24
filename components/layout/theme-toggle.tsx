"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import { getInitialTheme, setTheme } from "@/lib/theme"

export function ThemeToggle() {
    const [theme, setThemeState] = useState<"light" | "dark">("light")

    useEffect(() => {
        const initial = getInitialTheme()
        setThemeState(initial)
        setTheme(initial)
    }, [])

    function toggle() {
        const next = theme === "light" ? "dark" : "light"
        setThemeState(next)
        setTheme(next)
    }

    return (
        <Button variant="ghost" size="icon" onClick={toggle}>
            {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </Button>
    )
}
