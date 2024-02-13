"use client"
import Image from "next/image"
import style from "../main-content/index.module.css"
import navigationItems from "../nav-data/data"
import * as Dialog from "@radix-ui/react-dialog"
import { useTheme } from "../contextApi/ThemeContext"
import {
    TriangleDownIcon,
    SunIcon,
    MoonIcon,
    Cross2Icon
} from "@radix-ui/react-icons"
import { useState, useRef, useEffect } from "react"

export default function Small_nav(props) {
    const { isDarkMode, toggleDarkMode } = useTheme()
    const [selectedNavItem, setSelectedNavItem] = useState(null)
    const [modalInput, setModalInput] = useState({ search: "" })
    const [open, setOpen] = useState(false)
    const modalRef = useRef<HTMLInputElement>(null)

    const handleClick = (key: any) => {
        setOpen(!open)
        setSelectedNavItem(key)
    }

    const handleModalClose = () => {
        setOpen(false)
        setModalInput((prev) => ({ ...prev, search: "" }))
    }

    const languages = ["Golang", "Javascript", "Typescript", "Rust"]
    const organisations = ["Galoy", "Chainlab", "Aremxy Plug", "Btrust"]
    const types = ["P2p", "Wallet", "Tools", "Education"]
    const recent = [
        "Newest",
        "Oldest",
        "Recently updated",
        "Last recently updated"
    ]

    // retrieve text of links clicked on popup modal
    const handleModalLinksClick = (item) => {
        props.setSearchParams((prev) => ({
            ...prev,
            language: languages.includes(item.text) ? item.text : prev.language,
            organisation: organisations.includes(item.text)
                ? item.text
                : prev.organisation,
            type: types.includes(item.text) ? item.text : prev.type,
            recent: recent.includes(item.text) ? item.text : prev.recent
        }))
    }

    const enter_keyAction = (item) => {
        modalInput.search = item
        let filtered = props.issueList
        setModalInput((prev) => ({ ...prev, search: "" }))
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

            if (searchByLanguage && selectedNavItem === "language") {
                props.setSearchParams((prev) => ({
                    ...prev,
                    language: searchByLanguage.toString()
                }))
            }

            if (searchByOrganisations && selectedNavItem === "organisation") {
                props.setSearchParams((prev) => ({
                    ...prev,
                    organisation: searchByOrganisations.toString()
                }))
            }

            if (searchByTypes && selectedNavItem === "type") {
                props.setSearchParams((prev) => ({
                    ...prev,
                    type: searchByTypes.toString()
                }))
            }

            if (searchByRecent && selectedNavItem === "recent") {
                props.setSearchParams((prev) => ({
                    ...prev,
                    recent: searchByRecent.toString()
                }))
            }
        }
        setOpen(false)
    }

    const handleModalInputChange = (e) => {
        const { name, value } = e.target
        setModalInput((prev) => ({ ...prev, [name]: value }))
    }

    useEffect(() => {
        if (modalRef?.current) {
            modalRef.current.addEventListener("keypress", (e) => {
                if (e.key === "Enter") enter_keyAction(modalInput.search)
            })
        }
    }, [modalInput.search])

    return (
        <nav
            className={`${style.small_nav} text-sm my-2 mt-4 flex items-center flex-col`}
        >
            <div className="flex flex-col w-full mx-2">
                <h1
                    className={`${style.h1} md:text-2xl text-lg font-bold my-2`}
                >
                    Open Source Projects
                </h1>
                <div
                    className={`flex justify-between flex-wrap-reverse items-center`}
                >
                    <div className="flex flex-wrap">
                        <p className={`flex items-center`}>
                            <Image
                                src="/filter.svg"
                                alt="filter"
                                width="20"
                                height="50"
                                color="#fff"
                                className={`${
                                    isDarkMode
                                        ? style.icon_dark
                                        : style.icon_light
                                }`}
                            />
                            Filter by:
                        </p>
                        {Object.entries(navigationItems).map(
                            ([key, { label, content }]) => (
                                <span key={key} className={`flex flex-col`}>
                                    <a
                                        className="flex items-center md:px-4 px-2 relative cursor-pointer lg:text-lg text-sm"
                                        onClick={() => handleClick(key)}
                                    >
                                        {label}
                                        <span>
                                            <TriangleDownIcon />
                                        </span>
                                        {selectedNavItem === key && (
                                            <Dialog.Root
                                                open={open}
                                                onOpenChange={handleModalClose}
                                            >
                                                <Dialog.Portal>
                                                    <Dialog.Overlay
                                                        className={`${
                                                            style.DialogOverlay
                                                        } ${
                                                            isDarkMode
                                                                ? style.dialog_dark
                                                                : style.dialog_light
                                                        }`}
                                                    />
                                                    <Dialog.Content
                                                        className={`${style.DialogContent}`}
                                                    >
                                                        <fieldset className="w-full mt-4">
                                                            <label
                                                                htmlFor="search"
                                                                aria-hidden
                                                                hidden
                                                            ></label>
                                                            <input
                                                                ref={modalRef}
                                                                name="search"
                                                                type="text"
                                                                id="search"
                                                                autoFocus
                                                                placeholder={
                                                                    key
                                                                }
                                                                onChange={
                                                                    handleModalInputChange
                                                                }
                                                                value={
                                                                    modalInput.search
                                                                }
                                                                className={`${style.modal_input} rounded-md px-4 py-2 w-full`}
                                                            />
                                                        </fieldset>
                                                        {content.map(
                                                            (el: any) => (
                                                                <>
                                                                    <ul className="w-full">
                                                                        <li
                                                                            className={`${
                                                                                isDarkMode
                                                                                    ? style.modal_links_dark
                                                                                    : style.modal_links_light
                                                                            } mt-2 flex items-center px-4 py-2`}
                                                                            onClick={() =>
                                                                                handleModalLinksClick(
                                                                                    el
                                                                                )
                                                                            }
                                                                        >
                                                                            {
                                                                                el.text
                                                                            }
                                                                            {el.image &&
                                                                                el.image !==
                                                                                    "" && (
                                                                                    <span className="mx-2">
                                                                                        <Image
                                                                                            src={
                                                                                                el.image
                                                                                            }
                                                                                            alt="language"
                                                                                            width={
                                                                                                20
                                                                                            }
                                                                                            height={
                                                                                                20
                                                                                            }
                                                                                        />
                                                                                    </span>
                                                                                )}
                                                                        </li>
                                                                    </ul>
                                                                </>
                                                            )
                                                        )}
                                                        <Dialog.Close asChild>
                                                            <button
                                                                className={`${style.IconButton}`}
                                                                aria-label="Close"
                                                            >
                                                                <Cross2Icon />
                                                            </button>
                                                        </Dialog.Close>
                                                    </Dialog.Content>
                                                </Dialog.Portal>
                                            </Dialog.Root>
                                        )}
                                    </a>
                                </span>
                            )
                        )}
                    </div>
                    <div className="md:mt-0 mt-4 mx-2">
                        <button
                            className={`${style.toggle_btn} ${
                                isDarkMode
                                    ? style.button_dark
                                    : style.button_light
                            } rounded-xl px-2 py-2 flex justify-between items-center`}
                            onClick={toggleDarkMode}
                        >
                            {isDarkMode ? "Dark mode" : "Light mode"}
                            <span className="mx-2">
                                {isDarkMode ? (
                                    <MoonIcon color="#161616" />
                                ) : (
                                    <SunIcon color="#FFA500" />
                                )}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
