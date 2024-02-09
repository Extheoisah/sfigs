"use client"
import React, { createContext, useContext, useState, useEffect } from "react"
import { SessionInfo } from "../types/types"
import { auth } from "@/app/auth"

interface SessionContextProps {
    session: SessionInfo
    getSessionDetails: () => void
}

const SessionDetailsContext = createContext<SessionContextProps | undefined>(
    undefined
)
interface SessionProviderProps {
    children: React.ReactNode
    initialData: SessionInfo | null
}

export const SessionProvider: React.FC<SessionProviderProps> = ({
    children,
    initialData
}) => {
    const [session, setSession] = useState<SessionInfo>({
        user: { name: "", email: "", image: "" },
        accessToken: ""
    })

    const getSessionDetails = async () => {
        try {
            const data = initialData || (await auth())
            console.log(data, "in context")

            if (data) {
                setSession({
                    user: {
                        name: data.user.name || "",
                        email: data.user.email || "",
                        image: data.user.image || ""
                    },
                    accessToken: ""
                })
            } else {
                console.error("Error: Session data is null")
            }
        } catch (error) {
            console.error("Error fetching session data:", error)
        }
    }

    useEffect(() => {
        getSessionDetails()
    }, [initialData])

    return (
        <SessionDetailsContext.Provider value={{ session, getSessionDetails }}>
            {children}
        </SessionDetailsContext.Provider>
    )
}

export const useSession = (): SessionContextProps => {
    const context = useContext(SessionDetailsContext)
    if (!context) {
        throw new Error("useSession must be used within a SessionProvider")
    }
    return context
}
