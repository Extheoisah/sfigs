export default function Footer(props) {
    const num = ["1", "2", "3"]
    return (
        <footer className="py-6 px-12">
            <div className="flex justify-center items-center">
                <div className="flex">
                    <button>&lt; Previous </button>
                    {props.issueList.map((el, i) => (
                        <a className="mx-2" key={i}>{i + 1}</a>
                    ))}
                    <button> Next &gt; </button>
                </div>
            </div>
        </footer>
    )
}
