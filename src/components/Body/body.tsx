"use client"
import style from "../main-content/index.module.css"
import { useEffect, useState, useRef } from "react"
import AllIssues from "../All-issues/AllIssues"
import Navigation from "../navigation/Navigation"
import Footer from "../footer/footer"
import Small_nav from "../small_navigation/small_nav"

export default function Body(props) {
    interface Issue {
        id: number
        header: string
        company: { smallIcon: string; name: string }
        behaviour_text: string
        expected_behaviour_text: string
        labels: string[]
        labels2: {
            language: string
            number: number
            chat: {
                /*...*/
            }
            last_updated: string
            icon: string
        }[]
    }
    const [renderIssues, setRenderIssues] = useState<Issue[]>([])

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const visibleIssues = renderIssues.slice(startIndex, endIndex)

    const totalPages = Math.ceil(renderIssues.length / itemsPerPage)

    const handlePageChange = (page) => {
        setCurrentPage(page)
    }
    const [searchFilter, setSearchFilter] = useState({
        language: "",
        organisation: "",
        type: "",
        recent: ""
    })

    // dummy filter feature to be updated with real endpoint
    const filter = () => {
        let filtered = props.data

        if (searchFilter?.language !== "") {
            filtered = filtered?.filter((item) =>
                item.labels2.some(
                    (el) =>
                        el.language?.toLowerCase() ===
                        searchFilter?.language?.toLowerCase()
                )
            )
        }

        if (searchFilter.organisation !== "") {
            filtered = filtered.filter(
                (item) =>
                    item?.company?.name?.toLocaleLowerCase() ===
                    searchFilter?.organisation?.toLowerCase()
            )
        }

        if (searchFilter.type !== "") {
            filtered = filtered?.filter((item) =>
                item.labels.some(
                    (el) =>
                        el.toLowerCase() === searchFilter?.type?.toLowerCase()
                )
            )
        }

        setRenderIssues(filtered)
        setCurrentPage(1)
    }

    useEffect(() => {
        filter()
    }, [searchFilter])

    useEffect(() => {
        console.log(renderIssues)
    }, [renderIssues])

    useEffect(() => {
        setRenderIssues(props.data)
    }, [])

    return (
        <>
            <Navigation
                userInfo={props.sessionInfo}
                issues={props.data}
                searchParams={searchFilter}
                setSearchParams={setSearchFilter}
                issueList={renderIssues}
                setIssueList={setRenderIssues}
                setCurrentPage={setCurrentPage}
            />
            <div
                className={`${style.nav_item_container} ${style.container} mt-5 px-4 w-full py-4`}
            >
                <div className="lg:w-3/4">
                    <Small_nav
                        issueList={renderIssues}
                        setIssueList={setRenderIssues}
                        searchParams={searchFilter}
                        setSearchParams={setSearchFilter}
                    />
                    <AllIssues
                        searchParams={searchFilter}
                        issues={props.data}
                        issueList={renderIssues}
                        setIssueList={setRenderIssues}
                        setCurrentPage={setCurrentPage}
                        visibleIssues={visibleIssues}
                    />
                </div>
            </div>
            <Footer
                issues={props.data}
                issueList={renderIssues}
                setIssueList={setRenderIssues}
                totalPages={totalPages}
                changePage={handlePageChange}
                currentPage={currentPage}
            />
        </>
    )
}