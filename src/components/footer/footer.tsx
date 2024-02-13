"use client"
import { useTheme } from "../contextApi/ThemeContext"
import style from "./index.module.css"

export default function Footer(props) {
    const { isDarkMode } = useTheme()

    const isSmallScreen = window.innerWidth <= 767

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
                        {[...Array(endPage - startPage + 1).keys()].map(
                            (offset) => {
                                const page = startPage + offset
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
