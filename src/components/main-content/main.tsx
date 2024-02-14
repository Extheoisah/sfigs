"use client"
import Navigation from "../navigation/Navigation"
import Body from "../Body/body"
import { useTheme } from "../contextApi/ThemeContext"
import issues from "../All-issues/data"
interface SessionInfo {
    user: {
        name: string | null | undefined
        email: string | null | undefined
        image: string | null | undefined
    }
}

interface MainProps {
    userInfo: SessionInfo | null
}

export default function Main(props: MainProps) {
    const { isDarkMode } = useTheme()

    const sessionInfo: SessionInfo | null = props.userInfo
        ? {
              user: {
                  name: props.userInfo.user.name || "",
                  email: props.userInfo.user.email || "",
                  image: props.userInfo.user.image || ""
              }
          }
        : null

    return (
        <>
            <section
                className={`${
                    isDarkMode ? "dark-mode" : "light-mode"
                } min-h-screen w-screen`}
            >
                <Body data={issues} sessionInfo={sessionInfo} />
            </section>
        </>
    )
}
