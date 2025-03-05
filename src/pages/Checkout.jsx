import { useState, useEffect, useContext, useRef } from "react"
import { TbCurrencyTaka } from "react-icons/tb"
import { BiReset } from "react-icons/bi"
import { LuPackageCheck } from "react-icons/lu"
import { MdOutlineDeliveryDining } from "react-icons/md"
import { useParams } from "react-router-dom";
import getTotalPrice from "../hooks/getTotalPrice";
import banner from "/assets/imgs/checkoutPage.png"
import { useQuery } from "react-query";
import { baseURL } from "../hooks/envCheck";
import Loader from "../components/Loaders/Loader";
import Button from "../components/Button/Button";
import { useNavigate } from 'react-router-dom';
import { userContext } from "../App";
import Input from "../components/Inputs/Input";
import { toast } from "react-toastify"
import externalLink from "/assets/svgs/externalLink.svg"
import CheckOutPageFood from "../components/CheckoutPageFood/CheckOutPageFood"

function Checkout() {
    const params = useParams()
    const navigate = useNavigate();
    const [foods, setFoods] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [DeliveryFee, setDeliveryFee] = useState(0)
    const [coupon, setCoupon] = useState({ value: "", error: "" })
    const [couponLoading, setCouponLoading] = useState(false)
    const [couponObject, setCouponObject] = useState({})
    const [showContinue, setShowContinue] = useState(false)
    const toastId = useRef(null);

    const [error, setError] = useState(false)

    const notify = (email) => toastId.current = toast("sending Email to " + email, {
        position: "top-center",
        autoClose: false,
        type: toast.TYPE.INFO,
        theme: "dark",
        className: "border border-slate-700"
    });

    const update = (email) => toast.update(toastId.current, {
        position: "top-center",
        theme: "dark",
        render: <span className="flex flex-row" >  {email} <a rel="noreferrer" href="https://mail.google.com/" target="_blank" className="underline rounded "  >  <img loading="lazy" className="w-5 ml-2" src={externalLink} alt="" /> </a></span>,
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
        className: 'rotateY animated border border-slate-700'
    });

    const userAddressFee = () => {
        const fee = JSON.parse(localStorage.getItem("userAddressFee"))?.locationData?.fee || 0
        setDeliveryFee(+fee)
    }

    const { area, buyerName, phone, homeAndStreetAddress, apartmentNo, } = JSON.parse(localStorage.getItem("userAddress")) || {}
    const { users } = useContext(userContext);

    function resetAddress() {
        localStorage.removeItem('userAddress');
        setTimeout(() => {
            window.location.reload(true);
        }, 100);
    }
    const email = users?.firebaseUser?.email || "";
    const { isLoading, data } = useQuery('singleCuisine' + params.checkoutType, () =>
        fetch("/db/foodItems.json").then(res =>
            res.json()
        ),
        //--------
    )
    const { cuisineImg, isExclusive, restaurant: availableAt, findWith, name, price, } = data?.find(item => item._id === params.checkoutType) || {};

    const food = {
        cuisineImg,
        isExclusive,
        availableAt,
        findWith,
        name,
        price
    }

    // coupon checker
    async function usingCoupon() {
        const first = coupon.value.indexOf("-") === -1
        const second = coupon.value.indexOf("_") === -1
        const dateObj = new Date();
        const today = (dateObj.getUTCFullYear()) + "-" + (dateObj.getMonth() + 1) + "-" + (dateObj.getUTCDate());


        if (!first || !second) {
            setCoupon(prev => ({ ...prev, error: "" }))

            setCouponLoading(true);
            const getData = await fetch(baseURL + "/coupons/" + coupon?.value, {
                method: "GET"
            }).then((res) => res.json())
            setCouponLoading(false);


            const { available, createdOn, expiryDate, prize, totalUse, usedBy, minimumAmount, isActive } = getData.coupon || {};

            //checking the coupon

            if (!prize) {
                setCouponObject({})
                setCoupon(prev => ({ ...prev, error: "coupon not found" }))
                return
            }

            if (getData?.message === 'coupon not found you looking for.!') {
                setCouponObject({})
                setCouponLoading(false);
                setCoupon(prev => ({ ...prev, error: getData?.message }))
                return
            }

            //checking the coupon is active or not
            if (isActive === false) {
                setCouponObject({})
                setCouponLoading(false);
                setCoupon(prev => ({ ...prev, error: "The coupon is not applicable anymore!" }))
                return
            }

            console.log(new Date(expiryDate) >= new Date(today))

            // checking is it expired or not
            if (!(new Date(expiryDate) >= new Date(today))) {
                setCouponObject({})
                setCoupon(prev => ({ ...prev, error: "The coupon is expired.!" }))
                return;
            }


            //checking is the coupon usable with this total price?
            if (totalPrice < minimumAmount) {
                setCoupon(prev => ({ ...prev, error: "Total amount is too low.!" }))
                return;
            }
            //finally the coupon is sending to be used.
            if (getData?.coupon?.prize) {
                setCouponObject({})

                setCouponObject({ available, createdOn, expiryDate, prize, totalUse, usedBy })
            }

        } else {
            setCoupon(prev => ({ ...prev, error: "Not a valid coupon..!" }))
        }

    }

    useEffect(() => {
        if (showContinue && !users?.firebaseUser?.email) {
            navigate('/login')
            localStorage.setItem("userFromCheckout", JSON.stringify({ status: true }))
        }
        userAddressFee()
    }, [users, showContinue, isLoading])

    useEffect(() => {
        if (params.checkoutType === "cartDataOnly") {
            const cartData = JSON.parse(localStorage.getItem("userCart")) || []
            const foodList = cartData.map(item => ({ ...item.food, quantity: +item.quantity }))
            setFoods(foodList)
            setTotalPrice(getTotalPrice(foodList))
        } else {
            setTotalPrice(food.price)
            setFoods([food])
        }

        if (coupon?.value === "" && coupon?.error !== "") {
            setCoupon(prev => ({ ...prev, error: "" }))
        }

    }, [params, data, coupon])


    async function sendEmail(email) {
        try {
            const emailObj = {
                coupon: couponObject?.prize ? `${coupon.value} - ${couponObject.prize} Taka` : 'xxxxxxxx',
                address: "" + area + ", " + homeAndStreetAddress + ", " + (apartmentNo ? apartmentNo : ""),
                buyerName: buyerName,
                foods,
                total: (totalPrice - (couponObject?.prize || 0)) + DeliveryFee,
                delivery: `${area} - ${DeliveryFee} Taka`,
                phone: phone
            }

            notify(email)
            const emailSendingState = await fetch(`${baseURL}/sendMail`, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'Access-Control-Allow-Origin': "*",
                    "Access-Control-Allow-Headers": "*"
                },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({ email, emailObj })
            })
            const responseData = await emailSendingState.json()
            console.log(responseData)

            if (responseData?.status) {
                update(email)
                console.log("Done")

                setTimeout(() => {
                    navigate("/")
                }, 1500);
            }
            return emailSendingState;
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <section className="text-primary body-font">



            <div className="container mx-auto flex msm:px-2 px-5 pt-10 gap-4 md:flex-row flex-col items-start">
                <div className="mxl:hidden rounded-md overflow-hidden  w-2/6 mb-10 md:mb-0">
                    <img loading="lazy" className="imgStrictSize " src={banner} alt="img" />
                </div>

                <div className=" w-full xl:w-4/6  overflow-hidden  md:ml-4 flex flex-col md:items-start md:text-left items-center text-center">
                    <div className="w-full flex rounded-md flex-col border border-slate-700 mb-4">
                        <div className="-m-1.5 overflow-x-auto ">
                            <div className="p-1.5 min-w-full inline-block align-middle ">
                                <div className="overflow-hidden ">
                                    <table className="min-w-full divide-y divide-gray-700">
                                        <thead className="text-white" >
                                            <tr>
                                                <th scope="col" className=" msm:px-1 px-6 py-3 text-left text-xs font-medium mmd:text-center uppercase">Picture</th>
                                                <th scope="col" className=" msm:px-1 px-6 py-3 text-left text-xs font-medium mmd:text-center uppercase">Name</th>
                                                <th scope="col" className="msm:hidden msm:px-1 px-6 py-3 text-left text-xs font-medium mmd:text-center uppercase">Restaurant</th>
                                                <th scope="col" className=" msm:px-1 px-6 py-3 text-left text-xs font-medium mmd:text-center uppercase  ">Quantity</th>
                                                <th scope="col" className=" msm:px-1 px-6 py-3 text-left text-xs font-medium mmd:text-center uppercase">price</th>

                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">

                                            {!isLoading && foods.length > 0 ?
                                                foods?.map(({ cuisineImg, availableAt, name, price, quantity }) => (
                                                    <CheckOutPageFood key={cuisineImg + price + name}
                                                        cuisineImg={cuisineImg}
                                                        availableAt={availableAt}
                                                        name={name}
                                                        price={price}
                                                        quantity={quantity}
                                                        setError={setError}
                                                    />
                                                )) : <tr>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                                                        {
                                                            isLoading ? <Loader /> : <span> No order found...! </span>
                                                        }
                                                    </td>
                                                </tr>
                                            }



                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  dark:text-gray-200"></td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  dark:text-gray-200"></td>
                                                <td className="msm:hidden px-6 py-4 whitespace-nowrap text-sm font-medium  dark:text-gray-200"></td>
                                                <td className="msm:px-2 px-6 py-4 whitespace-nowrap text-sm font-medium  dark:text-gray-200">Total Price:
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  dark:text-gray-200"> {totalPrice ? totalPrice : "x"}</td>
                                            </tr>
                                        </tfoot>

                                    </table>


                                    <section className="border-t border-slate-700 flex items-end flex-col " >

                                        <div className="border border-slate-700 pl-3" >



                                            <div className="px-1 py-4 whitespace-nowrap text-sm flex flex-row items-center w-64 ">

                                                <div className="relative" >
                                                    <Input placeholder={"Type coupon code"} onChange={setCoupon} className={` px-2 w-full h-10 border border-gray-700 ${coupon?.error && coupon?.value && "border-red-700"}`} />

                                                    {coupon?.error && coupon?.value && <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-3">
                                                        <svg className="h-5 w-5 text-red-500" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true">
                                                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                                                        </svg>

                                                    </div>
                                                    }

                                                </div>



                                                <Button disabled={totalPrice === 0 || !coupon?.value}
                                                    onClick={async () => await usingCoupon()}
                                                    className={'ml-2 min-h-10 mx-auto'} >
                                                    {couponLoading ? <span className="scale-75" > <Loader /> </span> : "Apply"}
                                                </Button>


                                            </div>

                                            {
                                                coupon?.error && coupon?.value && <span className={`ml-2 text-red-500 ${coupon?.error?.length > 30 && "font-thin text-sm"}`} > {coupon?.error} </span>
                                            }


                                            {
                                                area && <span className=" flex flex-col items-start text-sm ml-2" >{area}   <span className="text-yellow-400 flex flex-row items-center" > <span className="mr-2 scale-150" ><MdOutlineDeliveryDining /></span>  Delivery charge:- {DeliveryFee}    <span className="scale-125" >< TbCurrencyTaka /> </span></span> </span>
                                            }

                                            <div className="px-1 py-4 whitespace-nowrap text-sm flex flex-row items-center w-64 ">

                                                {
                                                    couponObject?.prize ?
                                                        <div className="max-w-xs border border-slate-700 rounded-md shadow-lg" role="alert">
                                                            <div className="flex p-3 px-2 ">
                                                                <div className="flex-shrink-0">
                                                                    <svg className="h-4 w-4 text-green-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                                                                    </svg>
                                                                </div>
                                                                <div className="ml-3">
                                                                    <p className="text-sm ">
                                                                        <span className="line-through opacity-50"  >{Number(totalPrice) + Number(DeliveryFee)}</span>
                                                                        <span className="scale-110 ml-2"  >{(totalPrice - (couponObject?.prize || 0)) + DeliveryFee}</span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        : <span className="w-full flex items-center" >

                                                            Total Cost: {(totalPrice - (couponObject?.prize || 0)) + DeliveryFee}

                                                            <span >
                                                                < TbCurrencyTaka />
                                                            </span>
                                                        </span>


                                                }
                                                <Button disabled={totalPrice === 0 || error} onClick={() => setShowContinue(true)} className={'mx-auto'} >
                                                    Continue
                                                </Button>

                                            </div>
                                        </div>

                                    </section>


                                </div>
                            </div>
                        </div>
                    </div>

                    {showContinue && <div className="w-full border mb-4 border-slate-700 min-h-fit mt-6 flex px-6 py-4 rounded-md " >

                        <div className="w-4/5 flex flex-col text-start msm:text-sm msm:gap-2 text-white ">

                            {area && <span> <span className="text-primary" > Area: </span> {area}</span>}

                            {buyerName && <span> <span className="text-primary" >Name:</span> {buyerName}</span>}

                            {phone && <span> <span className="text-primary" >Phone:</span> {phone}</span>}
                            {homeAndStreetAddress && <span>  <span className="text-primary" >Home Address:</span> {homeAndStreetAddress}</span>}
                            {apartmentNo && <span>  <span className="text-primary" >Apartment No:</span> {apartmentNo}</span>}
                            {email && <span> <span className="text-primary" >Email:</span> {email}</span>}

                            <Button onClick={resetAddress} className={`w-fit mt-2 text-primary msm:text-xs`} > Reset Address <BiReset />  </Button>
                        </div>

                        <div className="min-w-[150px] flex items-end ml-3 ">
                            <Button disabled={totalPrice === 0 || error} className={'w-fit mx-auto'} onClick={async () => await sendEmail(email)} >

                                Confirm Order  <LuPackageCheck />

                            </Button>
                        </div>

                    </div>}
                </div>
            </div>
        </section>
    )
}
export default Checkout


// async function sendEmail(email) {

//     const emailObj = {
//         coupon: couponObject?.prize ? `${coupon.value} - ${couponObject.prize} Taka` : 'xxxxxxxx',
//         address: "" + area + ", " + homeAndStreetAddress + ", " + (apartmentNo ? apartmentNo : ""),
//         buyerName: buyerName,
//         foods,
//         total: (totalPrice - (couponObject?.prize || 0)) + DeliveryFee,
//         delivery: `${area} - ${DeliveryFee} Taka`,
//         phone: phone

//     }

//     const html = generateAnEmail(emailObj);

//     // return console.log(html)
//     notify(email)
//     const emailSendingState = await fetch(`${baseURL}/sendMail`, {
//         method: "POST",
//         headers: {
//             "Accept": "application/json",
//             "Content-Type": "application/json",
//             'Access-Control-Allow-Origin': "https://owldaccabd.com",

//         },
//         body: JSON.stringify({ email, html })
//     })
//     const responseData = await emailSendingState.json()
//     console.log(responseData)

//     if (responseData?.status) {
//         update(email)
//         console.log("Done")

//         setTimeout(() => {
//             navigate("/")
//         }, 1500);
//     }
//     return emailSendingState;
// }