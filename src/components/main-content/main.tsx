"use client"
import Navigation from "../navigation/Navigation"
import Body from "../Body/body"
import { useTheme } from "../contextApi/ThemeContext"

export default function Main({ sessionInfo }) {
    const { isDarkMode } = useTheme()
    return (
        <>
            <section className={`${isDarkMode ? "dark-mode" : "light-mode"} min-h-screen`}>
                <Navigation userInfo={sessionInfo} />
                <Body />
            </section>
        </>
    )
}
