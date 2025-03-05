import { useState } from "react"
import { TbCurrencyTaka } from "react-icons/tb"

function CheckOutPageFood({ cuisineImg, availableAt, name, price, quantity, setError }) {

    const [show, setShow] = useState(true)
console.log(cuisineImg);
    function imgError() {
        setShow(false)
        setError(true)
    }


    return (
        <tr className="relative" key={name + price + availableAt}>
            {!show && <div className=" absolute h-full w-full bg-red-500 bg-opacity-80 backdrop-blur-2xl flex items-center justify-center" > This item is not available, please delete it from your cart. </div>}
            <td className="msm:px-2 px-6 py-4 whitespace-nowrap text-sm font-medium  ">
                <img onError={imgError} loading="lazy" className="rounded-md " src={cuisineImg} width={150} height={150} alt="cuisineImg" />
            </td>
            <td className={`msm:px-2 px-6 py-4 whitespace-nowrap text-sm font-medium ${name?.length > 10 && "font-thin text-xs"}`}>{name}</td>
            <td className="msm:hidden msm:px-2 px-6 py-4 whitespace-nowrap text-sm ">{availableAt}</td>
            <td className="msm:px-2 px-6 py-4 whitespace-nowrap text-sm ">{quantity || 1}</td>
            <td className="msm:px-2 px-6 py-4 whitespace-nowrap text-sm ">
                <span className="flex  items-center" > {price} <span > < TbCurrencyTaka /></span>  </span>
            </td>

        </tr>
    )
}
export default CheckOutPageFood