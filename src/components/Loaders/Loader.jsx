function Loader({ height }) {
    return (
        <div className={`w-full flex items-center justify-center h-[${height + "px" || "100px"}]`}>
            <div className="inline-block w-10 ">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  
                    width="100%"
                    height="100%"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                    
                >
                    <circle cx={50} cy={50} r={0} fill="none" stroke="#eb733e" strokeWidth={22}>
                        <animate
                            attributeName="r"
                            repeatCount="indefinite"
                            dur="1s"
                            values="0;40"
                            keyTimes="0;1"
                            keySplines="0 0.2 0.8 1"
                            calcMode="spline"
                            begin="0s"
                        />
                        <animate
                            attributeName="opacity"
                            repeatCount="indefinite"
                            dur="1s"
                            values="1;0"
                            keyTimes="0;1"
                            keySplines="0.2 0 0.8 1"
                            calcMode="spline"
                            begin="0s"
                        />
                    </circle>
                    <circle cx={50} cy={50} r={0} fill="none" stroke="#ffd773" strokeWidth={22}>
                        <animate
                            attributeName="r"
                            repeatCount="indefinite"
                            dur="1s"
                            values="0;40"
                            keyTimes="0;1"
                            keySplines="0 0.2 0.8 1"
                            calcMode="spline"
                            begin="-0.5s"
                        />
                        <animate
                            attributeName="opacity"
                            repeatCount="indefinite"
                            dur="1s"
                            values="1;0"
                            keyTimes="0;1"
                            keySplines="0.2 0 0.8 1"
                            calcMode="spline"
                            begin="-0.5s"
                        />
                    </circle>
                </svg>
            </div>
        </div>
    )
}
export default Loader