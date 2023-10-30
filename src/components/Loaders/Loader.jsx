function Loader({ height }) {
    return (
        <div className={`w-full flex items-center justify-center h-[${height + "px" || "100px"}]`}>
            <div className="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full" role="status" aria-label="loading">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    )
}
export default Loader