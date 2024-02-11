"use client"
import { useTheme } from "../contextApi/ThemeContext"
import style from "./index.module.css"

export default function Footer(props) {
    const { isDarkMode } = useTheme()

    return (
        <footer className={`${style.footer}`}>
            <div className="flex justify-center items-center">
                <div className="flex">
                    <div className="flex">
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
                        {[...Array(props.totalPages).keys()].map((page) => (
                            <a
                                className={`mx-2 px-2 ${
                                    props.currentPage === page + 1
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
                                onClick={() => props.changePage(page + 1)}
                            >
                                {page + 1}
                            </a>
                        ))}
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
                    </div>
                </div>
            </div>
        </footer>
    )
}
