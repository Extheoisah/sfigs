"use client"
import { useTheme } from "../contextApi/ThemeContext"
import style from "./index.module.css"
import { Data } from "../types/types"
interface FooterProps {
    setSearchParams: React.Dispatch<React.SetStateAction<any>>
    issueList: Data[]
    issues: Data[]
    setIssueList: React.Dispatch<React.SetStateAction<any>>
    currentPage: number
    totalPages: number
    setCurrentPage: React.Dispatch<React.SetStateAction<any>>
    searchParams: {
        language: string
        organisation: string
        type: string
        recent: string
    }
    changePage: (page: number) => void
}

export default function Footer(props: FooterProps) {
    const { isDarkMode } = useTheme()

    const isSmallScreen = window?.innerWidth <= 767

    const shouldShowPreviousButton = props.currentPage > 1
    const shouldShowNextButton = props.currentPage < props.totalPages

    const displayPageButtons = isSmallScreen ? 2 : 8

    const startPage = Math.max(
        1,
        props.currentPage - Math.floor(displayPageButtons / 2)
    )
    const endPage = Math.min(
        props.totalPages,
        startPage + displayPageButtons - 1
    )

    return (
        <footer className={`${style.footer}`}>
            <div className="flex justify-center items-center">
                <div className="flex">
                    <div className="flex">
                        {shouldShowPreviousButton && (
                            <button
                                className={`px-4 ${
                                    isDarkMode
                                        ? style.footer_button_dark
                                        : style.footer_button_light
                                }`}
                                onClick={() =>
                                    props.changePage(props.currentPage - 1)
                                }
                            >
                                &lt; Previous
                            </button>
                        )}
                        {Array.from(
                            { length: endPage - startPage + 1 },
                            (_, index) => {
                                const page = startPage + index
                                return (
                                    <a
                                        className={`mx-2 px-2 ${
                                            props.currentPage === page
                                                ? isDarkMode
                                                    ? style.footer_active_dark
                                                    : style.footer_active_light
                                                : ""
                                        } ${
                                            isDarkMode
                                                ? style.footer_link_dark
                                                : style.footer_link_light
                                        }`}
                                        key={page}
                                        onClick={() => props.changePage(page)}
                                    >
                                        {page}
                                    </a>
                                )
                            }
                        )}

                        {shouldShowNextButton && (
                            <button
                                className={`px-4 ${
                                    isDarkMode
                                        ? style.footer_button_dark
                                        : style.footer_button_light
                                }`}
                                onClick={() =>
                                    props.changePage(props.currentPage + 1)
                                }
                            >
                                Next &gt;
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    )
}
