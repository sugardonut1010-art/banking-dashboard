/** @type {import('tailwindcss').Config} */
import { type Config } from "tailwindcss"

const config: Config = {
    darkMode: "class", // <-- enable class-based dark mode
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}

export default config
