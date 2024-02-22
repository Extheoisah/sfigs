"use-client"
import style from "./index.module.css"
import style2 from "../main-content/general.module.css"
import { useTheme } from "../contextApi/ThemeContext"
import Image from "next/image"
import * as Dialog from "@radix-ui/react-dialog"
import { DiscIcon, EraserIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"
import { Data, IssueDetails, FilterTypes } from "../types/types"

interface AllIssuesProps {
    setSearchParams: React.Dispatch<React.SetStateAction<any>>
    issueList: Data[]
    issues: Data[]
    visibleIssues: Array<any>
    setIssueList: React.Dispatch<React.SetStateAction<any>>
    setCurrentPage: React.Dispatch<React.SetStateAction<any>>
    searchParams: {
        language: string
        organisation: string
        type: string
        recent: string
    }
}

interface VisibleIssues {
    id: number
    header: string
    company: { smallIcon: string; name: string }
    behaviour_text: string
    expected_behaviour_text: string
    labels: string[]
    issue_details: IssueDetails[]
}

export default function AllIssues(props: AllIssuesProps) {
    const { isDarkMode } = useTheme()
    const [expandText, setExpandText] = useState<{ [key: number]: boolean }>({})
    const [showClearBtn, setShowClearBtn] = useState<boolean>(false)

    const handleReadMorebtnClick = (index: number) => {
        setExpandText((prev) => ({
            ...prev,
            [index]: !prev[index]
        }))
    }

    const clearFilterSearch = () => {
        props.setSearchParams((prev: FilterTypes) => ({
            ...prev,
            language: "",
            recent: "",
            organisation: "",
            type: ""
        }))
    }

    const showClear_btn = () => {
        if (
            props.searchParams.language !== "" ||
            props.searchParams.organisation !== "" ||
            props.searchParams.recent !== "" ||
            props.searchParams.type !== ""
        ) {
            setShowClearBtn(true)
        } else {
            setShowClearBtn(false)
        }
    }

    useEffect(() => {
        showClear_btn()
    }, [props.searchParams])

    return (
        <div
            className={`${style.issues_container} ${
                isDarkMode ? style.issues_dark : style.issues_light
            }`}
        >
            {showClearBtn && (
                <button
                    className={`${isDarkMode ? style.button_dark : style.button_light} flex fixed lg:right-48 right-9 bottom-8 rounded-xl px-2 py-2 justify-between items-center`}
                    onClick={clearFilterSearch}
                >
                    Clear
                    <span className="mx-2">
                        <EraserIcon />
                    </span>
                </button>
            )}
            {props.visibleIssues.map((item: VisibleIssues, index: number) => (
                <a
                    key={item.id}
                    className={`${style.issues_item} my-6 w-full block`}
                >
                    <h1
                        className={`md:text-xl lg:text-2xl ${
                            isDarkMode ? style.header_dark : style.header_light
                        }`}
                    >
                        {item.header}
                    </h1>
                    <div className="flex my-2">
                        <Image
                            src={item.company.smallIcon}
                            width={20}
                            height={20}
                            alt="image"
                        />
                        <span className="mx-2">
                            <p>{item.company.name}</p>
                        </span>
                    </div>

                    <div
                        className={`${style.truncate_container} my-2 lg:max-w-screen-lg md:max-w-screen-md max-w-xs  overflow-hidden`}
                    >
                        <div className={`${"flex items-center"}`}>
                            <p
                                className={`${"truncate md:whitespace-nowrap md:overflow-ellipsis md:overflow-hidden"} mt-2`}
                            >
                                {item.behaviour_text}
                            </p>
                            <span className="flex items-center flex-wrap">
                                <button
                                    className="whitespace-nowrap mt-2"
                                    onClick={() =>
                                        handleReadMorebtnClick(index)
                                    }
                                >
                                    {expandText[index]
                                        ? "show less"
                                        : "Read more"}
                                </button>
                            </span>

                            <Dialog.Root
                                open={expandText[index]}
                                onOpenChange={() =>
                                    handleReadMorebtnClick(index)
                                }
                            >
                                <Dialog.Portal>
                                    <Dialog.Overlay
                                        className={`${style2.DialogOverlay}`}
                                    />
                                    <Dialog.Content
                                        className={`${style2.DialogContent2}  ${
                                            isDarkMode
                                                ? style2.dialog_dark
                                                : style2.dialog_light
                                        }`}
                                    >
                                        <div
                                            className={
                                                isDarkMode
                                                    ? style2.modal_text_dark
                                                    : style2.modal_text_light
                                            }
                                        >
                                            <div className="mb-6">
                                                <h1>Issue Description:</h1>
                                                <p className="leading-loose">
                                                    {item.behaviour_text}
                                                </p>
                                            </div>

                                            <div>
                                                <h1>Expected Behaviour:</h1>
                                                <p className="leading-loose">
                                                    {
                                                        item.expected_behaviour_text
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    </Dialog.Content>
                                </Dialog.Portal>
                            </Dialog.Root>
                        </div>
                        {item.labels.map((label, i) => (
                            <button
                                key={i}
                                className={`${
                                    isDarkMode
                                        ? style.issues_button_dark
                                        : style.issues_button_light
                                } mx-2 mt-2`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center mt-4">
                        {item.issue_details.map((label, i) => (
                            <div key={i} className="flex flex-wrap">
                                <span className="flex lg:text-lg text-sm items-center">
                                    <Image
                                        src={label.icon}
                                        width={20}
                                        height={20}
                                        alt="programming-language"
                                    />
                                    <span className="mx-2">
                                        {label.language}
                                    </span>
                                </span>

                                <span className="flex lg:text-lg text-sm items-center mx-2">
                                    <DiscIcon className="mx-1" />
                                    {label.number}
                                </span>

                                <span className="flex lg:text-lg text-sm items-center mx-2">
                                    <Image
                                        src={label.chat.chat_icons}
                                        alt="chat"
                                        width={20}
                                        height={20}
                                        className="mx-1"
                                    />
                                    {label.chat.chat_number}
                                </span>

                                <span className="lg:text-lg text-sm mx-2">
                                    {label.last_updated}
                                </span>
                            </div>
                        ))}
                    </div>
                </a>
            ))}
        </div>
    )
}
