import { useContext, useEffect, useState } from "react";
import FoodWithDetails from "../FoodWithDetails/FoodWithDetails";
import { TbCurrencyTaka } from "react-icons/tb"
import { HiShoppingBag } from "react-icons/hi2"
import { Link } from "react-router-dom";
import { modalContext, userContext } from "../../App";
import { BiReset } from "react-icons/bi";

function CartModal({ visible, showModal }) {
    const { users, setUser } = useContext(userContext);
    const [error, setError] = useState(false)

    const [overflowToggle, setOverflowToggle] = useContext(modalContext);
    const cartItems = JSON.parse(localStorage.getItem("userCart")) || [];
    const [checkCart, setCheck] = useState(true)
    const [totalPrice, setTotalPrice] = useState(0)

    const totalPriceCounter = (latestItems) => {

        console.log(latestItems);
        
        const totalPriceOfALl = latestItems?.reduce((total, item) => (total + (+item.food.price * +item.quantity)), 0);
        setTotalPrice(totalPriceOfALl)
    }

    function clearCart() {
        const ask = window.confirm("Do you want to clear the cart ?")
        if (!ask) return;

        setTimeout(() => {
            localStorage.removeItem("userCart");
            showModal(p => !p)
            setUser(p => ({ ...p, userCart: 0 }))
            setOverflowToggle(true)
        }, 300);

    }

    useEffect(() => {
        typeof window !== "undefined" && totalPriceCounter(JSON.parse(localStorage.getItem("userCart")) || []);
    }, [checkCart, visible, users, showModal]);

    if (!visible) return null;


    function toggleModal() {
        showModal(p => !p)
        setOverflowToggle(true)
    }



    return (
        <div className="fixed inset-0 z-[200] text-white bg-background bg-opacity-75 backdrop-blur-md center" >
            <div className=" w-full hs-overlay-open:opacity-100 hs-overlay-open:duration-500 transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto mxs:scale-[0.85]">

                <div className="  flex flex-col my-10 h-auto bg-slate-900  shadow-sm rounded-xl "  >
                    <div className="flex justify-between items-center py-3 px-4 ">
                        <h3 className="font-bold text-primary dark:text-white">
                            Total {cartItems?.length} {cartItems?.length === 1 ? "item" : "items"} in your cart.
                        </h3>
                        <button onClick={toggleModal} type="button" className=" inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800" data-hs-overlay="#hs-basic-modal">
                            <span className="sr-only">Close</span>
                            <svg className="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor" />
                            </svg>
                        </button>
                    </div>
                    <div className="p-4 max-h-[500px] min-h-[500px] overflow-y-scroll ">
                        {cartItems?.length && cartItems?.map(({ food, id }) => (
                            <FoodWithDetails setError={setError} key={id} cuisineImg={food.cuisineImg} price={food.price} availableAt={food.availableAt} isExclusive={food.isExclusive} name={food.name} quantity={food.quantity} setCheck={setCheck} />
                        ))}
                    </div>
                    <div className="flex justify-between pl-7 text-primary">
                        <div className="flex flex-row justify-between" >
                            <div className="center">
                                <span className="w-2 h-2 inline-block bg-green-500 rounded-full mr-2 dark:bg-white"></span>

                                <span >Total:</span>
                                <div className="flex flex-row items-center ml-2 "> {totalPrice} <span className="inline scale-110" > <TbCurrencyTaka /></span> </div>

                            </div>


                        </div>

                        <div className="flex msm:scale-75">
                            {(totalPrice > 0 && !error) ?

                                <>
                                    <button onClick={clearCart} className=" mb-3 mr-3 py-3 px-4 flex flex-row items-center justify-center gap-3 bg-primary bg-opacity-10 rounded-md hover:opacity-75 transition-all" >
                                        Clear <BiReset />
                                    </button>

                                    <Link to={'/checkout/cartDataOnly'}>
                                        <button onClick={toggleModal} className=" mb-3 mr-3 py-3 px-4 flex flex-row items-center justify-center gap-3 bg-primary bg-opacity-10 rounded-md hover:opacity-75 transition-all" >
                                            Checkout <HiShoppingBag />
                                        </button>
                                    </Link>


                                </>


                                :
                                <button disabled={true} className="mb-3 mr-3 py-3 px-4 flex flex-row items-center justify-center gap-3 bg-primary bg-opacity-10 rounded-md opacity-50 transition-all" >
                                    Checkout <HiShoppingBag />
                                </button>


                            }
                        </div>

                    </div>
                </div>
            </div>


        </div>
    )
}
export default CartModal