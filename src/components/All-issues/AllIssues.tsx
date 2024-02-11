"use-client"
// import issues from "./data"
import style from "./index.module.css"
import { useTheme } from "../contextApi/ThemeContext"
import Image from "next/image"
import { CircleIcon, DiscIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react"

export default function AllIssues(props) {
    const { isDarkMode } = useTheme()
    const [expandText, setExpandText] = useState<boolean[]>([])

    const handleReadMorebtnClick = (index: number) => {
        setExpandText((prev) => [
            ...prev.slice(0, index),
            !prev[index],
            ...prev.slice(index + 1)
        ])
    }

    // dummy filter feature to be updated with real endpoint
    const filter = () => {
        let filtered = props.issueList

        if (props.searchParams.language !== "") {
            filtered = filtered.filter((item) =>
                item.labels2.some(
                    (el) =>
                        el.language.toLowerCase() ===
                        props.searchParams.language.toLowerCase()
                )
            )
        }

        if (props.searchParams.organisation !== "") {
            filtered = filtered.filter(
                (item) =>
                    item.company.name.toLocaleLowerCase() ===
                    props.searchParams.organisation.toLowerCase()
            )
        }

        if (props.searchParams.type !== "") {
            filtered = filtered.filter((item) =>
                item.labels.some(
                    (el) =>
                        el.toLowerCase() ===
                        props.searchParams.type.toLowerCase()
                )
            )
        }

        props.setIssueList(filtered)
        props.setCurrentPage(1)
    }

    useEffect(() => {
        filter()
        console.log(props.issueList)
    }, [props.searchParams])

    return (
        <div
            className={`${style.issues_container} ${
                isDarkMode ? style.issues_dark : style.issues_light
            }`}
        >
            {props.visibleIssues.map((item, index) => (
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

                    <div className="my-2 lg:max-w-screen-lg md:max-w-screen-md max-w-xs  overflow-hidden">
                        <div
                            className={`${
                                !expandText[index]
                                    ? "flex items-center"
                                    : "block"
                            }`}
                        >
                            <p
                                className={`${
                                    !expandText[index]
                                        ? "truncate md:whitespace-nowrap md:overflow-ellipsis md:overflow-hidden"
                                        : ""
                                } mt-2`}
                            >
                                {item.behaviour_text}
                            </p>
                            <span className="flex items-center">
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
                        </div>
                        {item.labels.map((label, i) => (
                            <button
                                key={i}
                                className={`${
                                    isDarkMode
                                        ? style.issues_button_dark
                                        : style.issues_button_light
                                } md:mx-5 mx-2 mt-2`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center mt-4">
                        {item.labels2.map((label, i) => (
                            <div key={i} className="flex">
                                <span className="flex items-center">
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

                                <span className="flex items-center mx-2">
                                    <DiscIcon className="mx-1" />
                                    {label.number}
                                </span>

                                <span className="flex items-center mx-2">
                                    <Image
                                        src={label.chat.chat_icons}
                                        alt="chat"
                                        width={20}
                                        height={20}
                                        className="mx-1"
                                    />
                                    {label.chat.chat_number}
                                </span>

                                <span className="mx-2">
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
