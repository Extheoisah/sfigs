import React from "react"
import style from "./index.module.css"
import Image from "next/image"
import { auth } from "@/app/auth"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"

export default async function Navigation() {
    const session = await auth()
    return (
        <nav className={style.container}>
            <div className="flex justify-between items-center flex-wrap">
                <div className="logo">
                    <h1 className="font-bold lg:text-2xl md:text-sm">GFI</h1>
                </div>
                <div className="flex justify-around items-center">
                    <span className="lg:mx-4 mx-1 flex items-center">
                        <span className="-mr-5 z-20">
                            <MagnifyingGlassIcon color="gray" />
                        </span>
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Search..."
                            className="px-6 py-1"
                        />
                    </span>
                    <span className="lg:mx-4 mx-1">
                        <picture className="flex w-full md:w-auto items-end justify-end">
                            <Image
                                src={session?.user.image || "/vercel.svg"}
                                alt="Vercel Logo"
                                className="rounded-full"
                                width={48}
                                height={48}
                                priority
                            />
                        </picture>
                    </span>
                </div>
            </div>
        </nav>
    )
}
