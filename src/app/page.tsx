import { auth } from "./auth"
import Main from "@/components/main-content/main"

export default async function Home() {
    const session = await auth()
    return (
        <main>
            <Main sessionInfo={session} />
        </main>
    )
}
