import { auth } from "./auth"
import Main from "@/components/main-content/main"
import { SessionProvider } from "@/components/SessionProvider/sessionProvider"

export default async function Home() {
    const session = await auth()

    return (
        <SessionProvider initialData={session}>
            <main>
                <Main />
            </main>
        </SessionProvider>
    )
}
