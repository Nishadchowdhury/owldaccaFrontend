"use Client"
function Button({ className, onClick, children, type, ...rest }) {

    return (
        <button


            onClick={onClick}
            type={type ? type : "button"}
            className={`py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-gray-800 font-semibold   focus:ring-gray-800 transition-all text-sm hover:rounded-full  disabled:opacity-50  ${className}`}
            {...rest}
        >


            {children ? children : ("Button")}

        </button>
    )
}
export default Button