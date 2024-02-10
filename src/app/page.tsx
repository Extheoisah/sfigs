import Image from "next/image"
import { auth } from "./auth"
import Navigation from "@/components/navigation/Navigation"
import Main from "@/components/main-content/main"

export default async function Home() {
    const session = await auth()
    return (
        <main className="">
            <>
                <Navigation />
                <Main />
            </>
        </main>
    )
}
