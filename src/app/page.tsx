import { auth } from "./auth"
import Main from "@/components/main-content/main"

export default async function Home() {
    const session = await auth()
    interface Session {
        user: {
            name: string | null | undefined
            email: string | null | undefined
            image: string | null | undefined
        }
    }

    return (
        <main>
            <Main userInfo={session as Session} />
        </main>
    )
}
