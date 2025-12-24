export function getInitialTheme(): "dark" | "light" {
    if (typeof window === "undefined") return "light"
    const stored = localStorage.getItem("theme")
    if (stored === "dark" || stored === "light") return stored
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    return prefersDark ? "dark" : "light"
}

export function setTheme(theme: "dark" | "light") {
    const root = window.document.documentElement
    root.classList.remove(theme === "dark" ? "light" : "dark")
    root.classList.add(theme)
    localStorage.setItem("theme", theme)
}
