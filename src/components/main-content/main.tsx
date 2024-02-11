"use client"
import Navigation from "../navigation/Navigation"
import Body from "../Body/body"
import { useTheme } from "../contextApi/ThemeContext"
import issues from "../All-issues/data"

export default function Main({ sessionInfo }) {
    const { isDarkMode } = useTheme()
    return (
        <>
            <section
                className={`${
                    isDarkMode ? "dark-mode" : "light-mode"
                } min-h-screen w-screen`}
            >
                <Body data={issues} userInfo={sessionInfo} />
            </section>
        </>
    )
}
