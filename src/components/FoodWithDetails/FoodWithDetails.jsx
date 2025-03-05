import { IoFastFood } from "react-icons/io5";
import AddToCart from "./AddToCart"
import { useState } from "react";

function FoodWithDetails({ cuisineImg, price, availableAt, isExclusive, name, quantity, setCheck, setError }) {

    const [show, setShow] = useState(true)
    
    const food = {
        cuisineImg: cuisineImg,
        price: price,
        availableAt: availableAt,
        isExclusive: isExclusive,
        name: name
    }

    function imgFailed() {
        setShow(false)
        setError(true)
    }



    return (
        <div className={`${setCheck && "text-sm"} msm:text-xs flex relative pb-2 text-primary ${!show && "opacity-50 "} `} >

            <div className={`${setCheck && "hidden"}  msm:hidden h-full w-10 absolute inset-0 flex items-center justify-center`}>
                <div className="h-full w-1 bg-gray-200 rounded-full pointer-events-none"></div>
            </div>
            <div className={`${setCheck && "hidden"}  msm:hidden flex-shrink-0 w-10 h-10 rounded-full bg-orange-400  inline-flex items-center justify-center  relative z-10 text-amber-950`}>
                <IoFastFood style={{ scale: "1.5" }} />
            </div>

            <div className="msm:pl-0 flex-grow pl-4 mt-2  ">


                <div className=" rounded-md overflow-hidden flex flex-row gap-3   ">
                    <div className="relative w-3/4 flex flex-row gap-3">
                        {!show && <div className=" absolute h-full w-full bg-red-500 bg-opacity-80 backdrop-blur-2xl flex items-center justify-center" > This item is not available, please delete it from your cart. </div>}
                        <div className="w-2/6 h-fit rounded-md overflow-hidden my-auto">
                            <img loading="lazy" src={cuisineImg} onError={imgFailed} alt="cuisineImg" className="imgStrictSize rounded-md overflow-hidden msm:max-h-16" />
                        </div>

                        <div className="max-w-[200px] msm:w-[160px]" >
                            <h2 className={`font-medium title-font text-sm mb-1  tracking-wider ${(name.length > 25) && "text-xs"} `}>{name}</h2>
                            <span> Price: {price} BDT </span>
                            <br />
                            Restaurant: <span className={`rounded-full border border-amber-700 inline-block px-2 py-1 ${(availableAt.length > 25) && "text-xs px-0.5 py-0 rounded-md"} `} >
                                {availableAt}
                            </span>

                            <br />

                            {isExclusive && <span className="text-[#FFCF40] italic inline-block mt-0.5"> {"It's an exclusive item !"} </span>}

                        </div>
                    </div>
                    <div className="w-1/4 flex items-center justify-center  ">
                        <AddToCart food={food} setCheck={setCheck} />
                    </div>



                </div>


            </div>
        </div>
    )
}
export default FoodWithDetails