import Image from "next/image"
import { auth } from "./auth"
import Navigation from "@/components/navigation/Navigation"

export default async function Home() {
    const session = await auth()
    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <>
                <Navigation />
            </>
        </main>
    )
}
