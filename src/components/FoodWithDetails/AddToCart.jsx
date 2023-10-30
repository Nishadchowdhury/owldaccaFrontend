import { useEffect, useState } from "react"
import { AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai'
import { MdDeleteForever, } from 'react-icons/md'
import useCartToLocalStorage from "../../hooks/useAddToCart"
import Button from "../Button/Button"
import { useContext } from "react";
import { userContext } from "../../App";


function AddToCart({ food, cartQuantity, setCheck }) {


    const { users, setUser } = useContext(userContext);

    const [quantity, setQuantity] = useState({ value: 0 })

    const { cuisineImg, price, availableAt, name } = food || {};

    const localStorageItem = () => {
        const i = JSON.parse(localStorage.getItem("userCart")) || [];
        const found = i.find(item => {
            return item.food.name === name && item.food.price === price && item.food.availableAt === availableAt && item.food.cuisineImg === cuisineImg
        });

        setQuantity({ value: found?.quantity || 0 })

        return found;
    }


    useEffect(() => {

        localStorageItem()

    }, [users])

    function cartQuantityManage(e) {

        setUser(p => ({ ...p, userCart: users.userCart + 1 }))

        if (e === "up" && quantity.value < 25) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useCartToLocalStorage(food, e)
            if (setCheck) {
                setCheck(p => !p)
            }
            setQuantity(prev => ({ ...prev, value: +quantity.value + 1 }))

        }

        if (e === "down" && quantity.value > 1) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useCartToLocalStorage(food, e)
            if (setCheck) {
                setCheck(p => !p)
            }
            setQuantity(prev => ({ ...prev, value: +quantity.value - 1 }))
        }

        if (e === "delete") {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            useCartToLocalStorage(food, e)
            if (setCheck) {
                setCheck(p => !p)
            }
        }
        localStorageItem();
    }







    return (
        <div className={`opacity-100`} >

            {quantity.value === 0 ? <Button className={`msm:scale-75 msm:text-sm min-w-28 msm:px-1 ${""} `} onClick={() => cartQuantityManage("up")}  > Add to Cart </Button> :
                <div className="flex items-center gap-1 bg-gray-800 rounded-full p-1 msm:scale-75 ">
                    <button className=" flex  items-center justify-center" onClick={() => cartQuantityManage("up")} >
                        <span className="inline-block rounded-full overflow-hidden mx-auto" > <  AiFillPlusCircle style={{ width: "25px", height: "25px", color: "#f05900", backgroundColor: "#FFFFFF" }} /></span>
                    </button>

                    <span className={" text-primary mx-0.5 msm:text-base "} >{quantity.value}</span>

                    <button disabled={quantity.value < 2} className="  flex items-center justify-center disabled:opacity-50" onClick={() => cartQuantityManage("down")} >
                        <span className="inline-block rounded-full overflow-hidden mx-auto" > <  AiFillMinusCircle style={{ width: "25px", height: "25px", color: "#f05900", backgroundColor: "#FFFFFF" }} /></span>
                    </button>

                    <button disabled={quantity.value == 0} className="  flex items-center justify-center disabled:opacity-50" onClick={() => cartQuantityManage("delete")} >
                        <span className="inline-block rounded-full overflow-hidden mx-auto" > <  MdDeleteForever style={{ width: "25px", height: "25px", color: "red", backgroundColor: "#FFFFFF" }} /></span>
                    </button>
                </div>

            }

        </div>
    )
}
export default AddToCart