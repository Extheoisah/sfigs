"use client"
import React, { createContext, useContext, useState, useEffect } from "react"

interface ThemeContextProps {
    isDarkMode: boolean
    toggleDarkMode: () => void
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState(false)

    const toggleDarkMode = () => {
        setIsDarkMode((prevMode) => !prevMode)
    }

    useEffect(() => {
        const prefersDarkMode = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches
        setIsDarkMode(prefersDarkMode)
    }, [])

    useEffect(() => {
        localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode))
    }, [isDarkMode])

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = (): ThemeContextProps => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider")
    }
    return context
}
