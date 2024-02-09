import React, { useRef, useState } from "react"
import style from "./index.module.css"
import Image from "next/image"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import { useTheme } from "../contextApi/ThemeContext"
import { useEffect } from "react"
import { Data } from "../types/types"
import { useSession } from "../SessionProvider/sessionProvider"
interface NavProps {
    setSearchParams: React.Dispatch<React.SetStateAction<any>>
    issueList: Data[]
    issues: Array<any>
    setIssueList: React.Dispatch<React.SetStateAction<any>>
    setCurrentPage: React.Dispatch<React.SetStateAction<any>>
    searchParams: {
        language: string
        organisation: string
        type: string
        recent: string
    }
}

export default function Navigation(props: NavProps) {
    const { session } = useSession()
    const { isDarkMode } = useTheme()
    const inputRef = useRef<HTMLInputElement>(null)

    const [navInput, setNavInput] = useState({ search: "" })

    const handleNavSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setNavInput((prev: any) => ({ ...prev, [name]: value }))
    }

    const enter_keyAction = (item: string) => {
        const languages = ["Golang", "Javascript", "Typescript", "Rust"]
        const organisations = ["Galoy", "Chainlab", "Aremxy Plug", "Btrust"]
        const types = ["P2p", "Wallet", "Tools", "Education"]
        const recent = [
            "Newest",
            "Oldest",
            "Recently updated",
            "Last recently updated"
        ]

        navInput.search = item
        let filtered = props.issueList
        setNavInput((prev) => ({ ...prev, search: "" }))
        if (item !== "" || item !== undefined) {
            const searchByLanguage = languages.filter(
                (searchItem) => searchItem.toLowerCase() === item.toLowerCase()
            )
            const searchByOrganisations = organisations.filter(
                (searchItem) => searchItem.toLowerCase() === item.toLowerCase()
            )
            const searchByTypes = types.filter(
                (searchItem) => searchItem.toLowerCase() === item.toLowerCase()
            )
            const searchByRecent = recent.filter(
                (searchItem) => searchItem.toLowerCase() === item.toLowerCase()
            )

            if (searchByLanguage) {
                props.setSearchParams((prev: Array<string>) => ({
                    ...prev,
                    language: searchByLanguage.toString()
                }))
            }

            if (searchByOrganisations) {
                props.setSearchParams((prev: Array<string>) => ({
                    ...prev,
                    organisation: searchByOrganisations.toString()
                }))
            }

            if (searchByTypes) {
                props.setSearchParams((prev: Array<string>) => ({
                    ...prev,
                    type: searchByTypes.toString()
                }))
            }

            if (searchByRecent) {
                props.setSearchParams((prev: Array<string>) => ({
                    ...prev,
                    recent: searchByRecent.toString()
                }))
            }
        }
    }

    useEffect(() => {
        if (inputRef?.current) {
            inputRef.current.addEventListener("keypress", (e) => {
                if (e.key === "Enter") enter_keyAction(navInput.search)
            })
        }
    }, [navInput.search])

    return (
        <nav
            className={`${style.container} ${
                isDarkMode ? style.nav_dark : style.nav_light
            } lg:mb-2 mb-12`}
        >
            <div className="flex justify-between items-center flex-wrap">
                <div className="logo">
                    <h1 className="font-bold lg:text-2xl md:text-sm">GFI</h1>
                </div>
                <div className="flex justify-around items-center">
                    <span
                        className={`${style.nav_search} lg:mx-4 mx-1 flex items-center`}
                    >
                        <span className="-mr-5 z-20">
                            <MagnifyingGlassIcon color="gray" />
                        </span>
                        <input
                            ref={inputRef}
                            type="text"
                            name="search"
                            id=""
                            placeholder="Search..."
                            className={`${
                                isDarkMode
                                    ? style.nav_search_input_dark
                                    : style.nav_search_input_light
                            } px-12 py-2 rounded-md text-black`}
                            onChange={handleNavSearch}
                            value={navInput.search}
                        />
                    </span>
                    <span className="lg:mx-4 mx-1">
                        <picture className="flex w-full md:w-auto items-end justify-end">
                            <Image
                                src={session.user.image || "/vercel.svg"}
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
