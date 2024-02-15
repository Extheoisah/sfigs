import style from "../main-content/index.module.css"
import { useEffect, useState } from "react"
import AllIssues from "../All-issues/AllIssues"
import Navigation from "../navigation/Navigation"
import Footer from "../footer/footer"
import Small_nav from "../small_navigation/small_nav"
import { Data, IssueDetails, Issue } from "../types/types"

interface BodyProps {
    data: Data[]
}

export default function Body(props: BodyProps) {
    const [renderIssues, setRenderIssues] = useState<Issue[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const visibleIssues = renderIssues.slice(startIndex, endIndex)

    const totalPages = Math.ceil(renderIssues.length / itemsPerPage)

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const [searchFilter, setSearchFilter] = useState({
        language: "",
        organisation: "",
        type: "",
        recent: ""
    })

    // dummy filter feature to be updated with a real endpoint
    const filter = () => {
        let filtered = props.data

        if (searchFilter?.language !== "") {
            filtered = filtered?.filter((item) =>
                item.issue_details.some(
                    (el: IssueDetails) =>
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
                    (el: string) =>
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

    return (
        <>
            <Navigation
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
                        setSearchParams={setSearchFilter}
                        setIssueList={setRenderIssues}
                        setCurrentPage={setCurrentPage}
                        visibleIssues={visibleIssues}
                    />
                </div>
            </div>
            <Footer
                searchParams={searchFilter}
                setSearchParams={setSearchFilter}
                issueList={renderIssues}
                issues={props.data}
                setIssueList={setRenderIssues}
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
                changePage={handlePageChange}
            />
        </>
    )
}
