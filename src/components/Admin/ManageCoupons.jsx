import { VscSettingsGear } from "react-icons/vsc";
import { useContext, useRef, useState } from "react";
import Form from "../Form/Form";
import { useEffect } from "react";
import { baseURL } from "../../hooks/envCheck";
import { useQuery } from "react-query";
import { userContext } from "../../App"
import { toast } from "react-toastify";
import { FaInfinity } from "react-icons/fa6";
import { BsPostcardHeart } from "react-icons/bs";

function ManageCoupons({ adminEmail }) {
    //pages 
    const [pageName, setPageName] = useState("")

    //coupon states
    const [couponId, setCouponId] = useState("");
    const [unCommon, setIsUnCommon] = useState(false)
    const [active, setIsActive] = useState(false) // both
    const [expiryDate, setExpiryDate] = useState("")
    const [minimumAmount, setMinimumAmount] = useState("") // both
    const [prize, setPrize] = useState("") //both
    const [totalUseAvailable, setTotalUseAvailable] = useState("")
    const available = totalUseAvailable;
    const usedBy = "" // Unique


    const dateObj = new Date();
    const createdOn = (dateObj.getUTCFullYear()) + "-" + (dateObj.getMonth() + 1) + "-" + (dateObj.getUTCDate());

    //error handling
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    //getting all coupons
    const { isLoading, data, refetch } = useQuery('allCoupons', () =>
        fetch(baseURL + "/couponsAll/" + adminEmail).then(res =>
            res.json()
        ),
        {
            // You can add more options as needed:
            staleTime: (60000 * 60) * 24 * 3,
            refetchOnWindowFocus: false,
        }
    )

    const coupons = data?.coupons || [];




    useEffect(() => {


        if (unCommon) {
            const unCommonCouponName = "UNI-" + ("" + dateObj.getTime()).slice(-6)
            setCouponId(unCommonCouponName);

        } else {
            setCouponId("");
        }
    }, [unCommon, adminEmail, loading])



    async function createCoupon(e) {
        e.preventDefault();


        if (!couponId) {
            setError('fill the fields properly.!')
            return;
        }

        if (!unCommon && (!expiryDate || !totalUseAvailable)) {

            setLoading(true);
            setError('fill the fields properly.!')
            return
        }
        setLoading(true);
        setError(null)

        const commonCoupon = {
            available: Number(totalUseAvailable),
            createdOn: createdOn,
            expiryDate: expiryDate,
            isActive: active,
            minimumAmount: Number(minimumAmount),
            prize: Number(prize),
            totalUse: 0,
        }

        const uniqueCoupon = {
            isActive: active,
            minimumAmount: Number(minimumAmount),
            prize: Number(prize),
            usedBy: "",
        }


        const commonResponse = await fetch(baseURL + '/coupons/' + couponId, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(unCommon ? uniqueCoupon : commonCoupon)
        })

        const res = await commonResponse.json()

        res?.message === "this coupon does exist.!" && window.alert(res?.message)
        setMinimumAmount("")
        setPrize("")
        refetch()
        setLoading(false)
        setError(null)
    }

    //calculating how many days are left.
    function daysUntilExpiration(expirationDate) {
        const now = new Date();
        const expiration = new Date(expirationDate);
        // Calculate the difference in milliseconds
        const differenceInMs = expiration - now;
        // Calculate the number of days
        const days = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

        if (days < 1 || isNaN(days)) {
            return 0;
        }

        return days;
    }
    const dayLeft = daysUntilExpiration(expiryDate);


    //updating the status of a coupon
    async function updateTheCoupon(couponOBJ, couponId) {

        const alteredStatus = !couponOBJ.isActive;
        setLoading(true)
        const response = await fetch(baseURL + "/couponsUpdate/" + couponId, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ ...couponOBJ, isActive: alteredStatus, adminId: adminEmail })
        })

        console.log(await response.json())
        setLoading(false)
        refetch()
    }


    //delete a coupon
    async function deleteCoupon(couponId) {

        const ask = window.confirm("do you want to delete " + couponId + "coupon ?")
        if (!ask) return;

        setLoading(true)
        const response = await fetch(baseURL + "/couponsDelete/" + couponId, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "DELETE",
            body: JSON.stringify({ adminId: adminEmail })
        })
        const res = await response.json()

        if (res.status === 410) {
            console.log("deleted")
            refetch()

        }
        setLoading(false)

    }




    return (
        <div className="hs-accordion  bg-slate-800 rounded-xl px-3 mt-5" id="hs-basic-with-title-and-arrow-stretched-heading-two">


            <button className="hs-accordion-toggle  group py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold  transition  hs-accordion-active:border-b border-slate-600 text-center" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two">
                <h1 className="text-center w-full flex justify-center items-center gap-3" >Manage Coupons <span ><BsPostcardHeart /></span> </h1>
                <svg className="hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block w-3 h-3 text-gray-600 group-hover:" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <svg className="hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden w-3 h-3 text-gray-600 group-hover:" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>
            <div id="hs-basic-with-title-and-arrow-stretched-collapse-two" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-two">




                <div className="flex w-full justify-center ">
                    <div className="  rounded-lg transition p-1   flex justify-center w-full">
                        <nav className="flex space-x-2 w-full justify-center" aria-label="Tabs" role="tablist">
                            <button onClick={() => setPageName("create")} type="button" className=" hs-tab-active:text-white hs-tab-active  py-3 px-4 inline-flex items-center gap-2 bg-transparent text-sm border border-slate-400  font-medium rounded-md  " id="segment-item-1" data-hs-tab="#segment-5" aria-controls="segment-5" role="tab5">
                                Create +
                            </button>

                            <button onClick={() => setPageName("delete")} type="button" className=" hs-tab-active:text-white hs-tab-active  py-3 px-4 inline-flex items-center gap-2 bg-transparent text-sm border border-slate-400  font-medium rounded-md  " id="segment-item-2" data-hs-tab="#segment-6" aria-controls="segment-6" role="tab6">
                                update^ & Delete -
                            </button>
                        </nav>
                    </div>
                </div>

                <div className="mt-3">
                    {
                        pageName === "create" &&
                        <div id="segment-5" role="tabpanel5" aria-labelledby="segment-item-5" className="mb-5">


                            <Form onSubmit={createCoupon} className={"flex justify-center mb-5 flex-col"}>



                                <div className="grid md:grid-cols-4 md:gap-6 ">

                                    <div className="relative z-0 w-full mb-6 group " >

                                        <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required
                                            onChange={(e) => setCouponId(e.target.value)}
                                            min={0}
                                            value={couponId}
                                        />


                                        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:text-base   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Coupon Name</label>


                                    </div>

                                    <div className="relative z-0 w-full mb-6 group " >

                                        <input type="number" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required
                                            onChange={(e) => setPrize(e.target.value)}
                                            min={0}
                                            value={prize}
                                        />


                                        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:text-base   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Discount amount.</label>


                                    </div>

                                    <div className="relative z-0 w-full mb-6 group flex flex-row gap-2">
                                        <div className="text-white w-full">

                                            <label htmlFor="hs-checkbox-checked-in-formCouponIsCommon" className={`flex p-3 w-full border rounded-md text-sm  ${unCommon ? "bg-green-600" : "bg-red-600"}`}

                                                onClick={() => setIsUnCommon(p => !p)}
                                            >

                                                <span className={`text-sm flex ml-3 ${unCommon && ""}`}>{unCommon ? "Unique" : "Common"} type</span>
                                            </label>
                                        </div>

                                        <div className="text-white w-full">

                                            <label htmlFor="hs-checkbox-checked-in-formCouponActive" className={`flex p-3 w-full border rounded-md text-sm  ${active ? "bg-green-600" : "bg-red-600"}`}
                                                onClick={() => setIsActive(p => !p)}
                                            >

                                                <span className={`text-sm  ml-3 `}>{active ? "Active" : "Inactive"}</span>
                                            </label>
                                        </div>

                                    </div>
                                    <div className="relative z-0 w-full mb-6 group " >

                                        <input type="number" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required
                                            onChange={(e) => setMinimumAmount(e.target.value)}
                                            min={0}
                                            value={minimumAmount}
                                        />


                                        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:text-base   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Minimum purchase amount.</label>


                                    </div>

                                    {
                                        !unCommon && <div className="relative z-0 w-full mb-6 group " >

                                            <input type="date" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required
                                                onChange={(e) => setExpiryDate(e.target.value)}
                                            />


                                            <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:text-base   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Set expire date.</label>

                                            <span className={`absolute right-8 bottom-3 inline-block ${(dayLeft < 1 && expiryDate) ? "text-red-500" : "text-green-500"} `} >
                                                {dayLeft > 0 ? `${dayLeft} ${dayLeft > 1 ? "days " : "day"} to expire.` : "select a future date."}
                                            </span>
                                        </div>

                                    }



                                    {
                                        !unCommon && <div className="relative z-0 w-full mb-6 group inline-block hs-tooltip  [--trigger:click]"  >

                                            <input type="number" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer " placeholder=" " required
                                                onChange={(e) => setTotalUseAvailable(e.target.value)}
                                                min={0}
                                                value={totalUseAvailable}
                                            />


                                            <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:text-base   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Number of usage.</label>

                                            <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-3 px-4  border text-sm text-sm rounded-md shadow-md baseGradient90 text-white" role="tooltip">
                                                Type how many times the coupon will be usable.
                                            </div>

                                        </div>
                                    }




                                </div>

                                <button type="submit" disabled={loading} className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center 
                                ${loading && "opacity-50"}
                                `} >
                                    Add a coupon.
                                </button>
                            </Form>




                        </div>


                    }


                    {
                        pageName === "delete" && <div id="segment-6" className="hidden " role="tabpanel6" aria-labelledby="segment-item-6"
                        >

                            <div className="flex flex-col">
                                <div className="-m-1.5 overflow-x-auto  ">
                                    <div className="p-1.5 min-w-full inline-block align-middle">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full divide-y divide-gray-200 text-primary ">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase">Id</th>

                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase">Min amount</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase">Prize</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase">Expire date</th>

                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase">Total use</th>

                                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium  uppercase flex justify-center items-center">Status</th>

                                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium  uppercase">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                                    {
                                                        coupons && coupons.map(({ couponId, couponData, couponData: { isActive, minimumAmount, prize, usedBy, available, createdOn, expiryDate, totalUse, }, }) => (
                                                            <tr key={couponId} className="">
                                                                <td className="px-6 w-44  py-4 whitespace-nowrap text-sm font-medium  ">{couponId}</td>

                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  ">{minimumAmount}</td>

                                                                <td className="px-6 py-4 whitespace-nowrap text-sm  ">{prize}</td>

                                                                <td className="px-6 py-4 whitespace-nowrap text-sm  ">{expiryDate ? expiryDate : <span className="inline-block scale-125 "  > <FaInfinity /> </span>}</td>

                                                                <td className="px-6 py-4 whitespace-nowrap text-sm  ">

                                                                    {!usedBy && !totalUse && <span className="text-red-500" > NO ONE </span>}
                                                                    {usedBy && usedBy}
                                                                    {totalUse > 0 && totalUse}

                                                                </td>

                                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-center items-center">
                                                                    <button disabled={loading} onClick={async () => updateTheCoupon(couponData, couponId)} className={`text-blue-500 hover:text-blue-200 rounded-md border border-slate-500 hover:border-slate-400 px-3 py-2 min-w-[100px]  ${isActive ? "text-green-600" : "text-red-600"} ${loading && "opacity-40"}`} href="#">{isActive ? "Active" : "Inactive"}</button>
                                                                </td>

                                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                    <button disabled={loading} onClick={async () => deleteCoupon(couponId)} className={`text-blue-500 hover:text-blue-200 rounded-md border border-slate-500 hover:border-slate-400 px-3 py-2 ${loading && "opacity-40"}`} href="#">Delete</button>
                                                                </td>


                                                            </tr>
                                                        ))

                                                    }

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    }
                </div>


            </div >
        </div >
    );
}
export default ManageCoupons;