// create restaurant has done,>>> 4 more to do
import { IoFastFood } from "react-icons/io5";
import { VscSettingsGear } from "react-icons/vsc";
import { useContext, useRef, useState } from "react";
import Form from "../Form/Form";
import { useEffect } from "react";
import { baseURL } from "../../hooks/envCheck";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";
import imageValidation from "../../hooks/imageValidation";
import { toast } from "react-toastify";
import { BsShop } from "react-icons/bs";

function RestaurantsAdmin({ data, refetch }) {
    const { users } = useContext(userContext) || {}
    const user = users?.firebaseUser;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    //pages 
    const [pageName, setPageName] = useState(null)
    const [restaurantList, setRestaurantList] = useState(null)

    //restaurant
    const [nameRestaurant, setNameRestaurant] = useState("");
    const [closeAt, setCloseAt] = useState();
    const [imgRestaurant, setImgRestaurant] = useState({ value: "", error: null });
    const [imgDataRestaurant, setImgDataRestaurant] = useState({ sizeError: null, ratioError: null });
    const [imgFileRes, setImgFileRes] = useState(null);
    const restaurantId = nameRestaurant?.replace(/\s+/g, ''); //auto creates from the name.

    //food
    const [nameFood, setNameFood] = useState(null);
    const [priceFood, setPriceFood] = useState(null);
    const [isExclusive, setIsExclusive] = useState(false);
    const availableAt = nameRestaurant;
    const findWith = nameFood?.split(" ");
    const [imgFood, setImgFood] = useState({ value: "", error: null });
    const [imgDataFood, setDataImgFood] = useState({ sizeError: null, ratioError: null });
    const [imgFileFood, setImgFileFood] = useState(null);
    const foodId = nameFood?.replace(/\s+/g, ''); //auto creates from the name.

    //toasts of statuses
    const toastId = useRef(null);
    const creatingRestaurant = () => toastId.current = toast("Restaurant creating", {
        position: "top-center",
        autoClose: false,
        type: toast.TYPE.INFO,
        theme: "dark",
        className: "border border-slate-700"
    });

    const restaurantCreated = () => toast.update(toastId.current, {
        position: "top-center",
        theme: "dark",
        render: <span className="flex flex-row" >The restaurant has created successfully. </span>,
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
        className: 'rotateY animated border border-slate-700'
    });

    const restaurantExist = () => toast.update(toastId.current, {
        position: "top-center",
        theme: "dark",
        render: <span className="flex flex-row" >The restaurant does exist. </span>,
        type: toast.TYPE.WARNING,
        autoClose: 3000,
        className: 'rotateY animated border border-slate-700'
    });


    const newRestaurant = {
        Id: restaurantId,
        name: nameRestaurant,
        closeAt: closeAt,
        cuisines: [
            {
                isExclusive: isExclusive,
                price: priceFood,
                availableAt: availableAt,
                name: nameFood,
                findWith: findWith
            },

        ]
    }

    useEffect(() => {
        if (pageName === "delete") {
            setRestaurantList(data?.restaurantList)
        }
    }, [pageName, data])

    const setRestaurantImage = function (event) {
        imageValidation(event, 120, setImgRestaurant, setImgDataRestaurant, setImgFileRes, "3:2");
    };

    const setFoodImage = function (event) {
        imageValidation(event, 120, setImgFood, setDataImgFood, setImgFileFood, "3:2");
    };

    //creating restaurant
    async function createRestaurant(e) {
        e.preventDefault()


        //checking all is data present or not. 
        if (!restaurantId || !nameRestaurant || !closeAt || !priceFood || !availableAt || !nameFood || !findWith || !imgFileRes || !imgFileFood) {
            window.alert("please fill the input field properly")
            return
        }

        if (imgDataRestaurant.ratioError || imgDataRestaurant.sizeError || imgDataFood.ratioError || imgDataFood.sizeError) {
            window.alert("get rid of all errors, before creating a restaurant!!!")
            return
        }

        //res img upload start
        const formData = new FormData()
        formData.append("image", imgFileRes);
        const statusOfUploadImageRes = await fetch(baseURL + '/restaurants_image/' + restaurantId, {
            method: 'POST',
            body: formData,
        })
        const uploadedImgRes = await statusOfUploadImageRes.json()
        if (!uploadedImgRes.status === 201) {
            return;
        }
        formData.delete("image", imgFileRes);
        //res img upload end

        //food img upload start
        formData.append("image", imgFileFood);
        const statusOfUploadImageFood = await fetch(baseURL + '/food_image/' + foodId, {
            method: 'POST',
            body: formData,
        })
        const uploadedImgFood = await statusOfUploadImageFood.json()
        if (!uploadedImgFood.status === 201) {
            return;
        }
        //food img upload end
        newRestaurant.cuisines[0].cuisineImg = uploadedImgFood.imgName;



        // creating restaurant
        try {
            creatingRestaurant();
            setLoading(true)

            const creatingResponseRes = await fetch(baseURL + "/restaurants/", {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify({ ...newRestaurant, imgName: uploadedImgRes.imgName, })
            })
            const resResponse = await creatingResponseRes.json();
            if (resResponse.status === 403) {
                setTimeout(() => {
                    restaurantExist()
                    setLoading(false)
                }, 1000);
                return
            }
            refetch();

            //getting food data from response and reupload it to cusinds 
            if (resResponse?.restaurant) {


                const creatingResponseFood = await fetch(baseURL + "/cuisines/" + foodId, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8',
                    },
                    body: JSON.stringify(newRestaurant.cuisines[0])
                })
                console.log(await creatingResponseFood.json())
                setTimeout(() => {
                    restaurantCreated();
                    setLoading(false)
                }, 700);
            }
            console.log("food created too.")


        } catch (error) {
            console.log(error)
            return
        }


    }


    const deleteARestaurant = async ({ id, name, image }) => {
        setLoading(true)
        const ask = window.confirm(`do you want to delete __${name}__ write ${name} here.`)

        function getImgName(url) {
            const parts = url.split("/");
            return parts[parts.length - 1];
        }
        if (ask) {
            const response = await fetch(baseURL + "/restaurants/" + id, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({ adminId: user?.email, image: getImgName(image) })
            })

            const ok = await response.json()
            console.log(ok)
            if (ok.status == 200) {
                console.log(ok)
                refetch()
                setLoading(false)
            }
        }
        setLoading(false)
        return;
    }

    return (
        <div className="hs-accordion bg-slate-800 rounded-xl px-3" id="hs-basic-with-title-and-arrow-stretched-heading-two">


            <button className="hs-accordion-toggle  group py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold  transition  hs-accordion-active:border-b border-slate-600 text-center" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two">
                <h1 className="text-center w-full flex justify-center items-center gap-3" >Manage Restaurants <span ><BsShop /></span> </h1>
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
                            <button onClick={() => setPageName("create")} type="button" className=" hs-tab-active:text-white hs-tab-active  py-3 px-4 inline-flex items-center gap-2 bg-transparent text-sm border border-slate-400 hover: font-medium rounded-md hover:hover:text-blue-600 " id="segment-item-1" data-hs-tab="#segment-1" aria-controls="segment-1" role="tab">
                                Create +
                            </button>

                            <button onClick={() => setPageName("delete")} type="button" className=" hs-tab-active:text-white hs-tab-active  py-3 px-4 inline-flex items-center gap-2 bg-transparent text-sm border border-slate-400 hover: font-medium rounded-md hover:hover:text-blue-600 " id="segment-item-2" data-hs-tab="#segment-2" aria-controls="segment-2" role="tab">
                                Delete -
                            </button>
                        </nav>
                    </div>
                </div>

                <div className="mt-3">
                    {
                        pageName === "create" &&
                        <div id="segment-1" role="tabpanel" aria-labelledby="segment-item-1" className="mb-5">

                            {
                                imgRestaurant?.value &&
                                <div className={`w-full flex justify-end`}  >


                                    <div className={`w-96 flex flex-col relative ${(imgDataRestaurant?.ratioError || imgDataRestaurant?.sizeError) && "bg-red-600"}`}  >

                                        < img className={`imgStrictSize ${(imgDataRestaurant?.ratioError || imgDataRestaurant?.sizeError) && "opacity-50"}`} src={imgRestaurant?.value} alt="" />

                                        {(imgDataRestaurant?.ratioError || imgDataRestaurant?.sizeError) && <span className="absolute py-5 px-2 bg-red-600 top-2/4  inline-block w-full" >{imgDataRestaurant.ratioError + "(1200×800 pixels)"} {imgDataRestaurant.ratioError && <br />} {imgDataRestaurant.sizeError}</span>}


                                    </div>
                                </div>

                            }
                            <Form onSubmit={createRestaurant} className={"flex justify-center mb-5 flex-col"}>
                                <div className="grid md:grid-cols-3 md:gap-6">
                                    <div className="relative z-0 w-full mb-6 group">
                                        <input type="text" name="floating_last_name" id="floating_last_name"
                                            className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required
                                            onChange={(e) => setNameRestaurant(e.target.value)}
                                        />
                                        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:text-base   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full name of the restaurant.</label>
                                    </div>

                                    <div className="relative z-0 w-full mb-6 group">

                                        <select
                                            type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-2 w-full text-sm uppercase text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required
                                            onChange={(e) => setCloseAt(e.target.value + '')}
                                        >
                                            <option className="bg-background " ></option>
                                            <option className="bg-background " >12AM</option>
                                            <option className="bg-background " >1AM</option>
                                            <option className="bg-background " >2AM</option>
                                            <option className="bg-background " >3AM</option>
                                            <option className="bg-background " >4AM</option>
                                            <option className="bg-background " >5AM</option>
                                            <option className="bg-background " >6AM</option>
                                            <option className="bg-background " >7AM</option>
                                            <option className="bg-background " >8AM</option>
                                            <option className="bg-background " >9AM</option>
                                            <option className="bg-background " >10AM</option>
                                            <option className="bg-background " >11AM</option>
                                            <option className="bg-background " >12PM</option>
                                            <option className="bg-background " >1PM</option>
                                            <option className="bg-background " >2PM</option>
                                            <option className="bg-background " >3PM</option>
                                            <option className="bg-background " >4PM</option>
                                            <option className="bg-background " >5PM</option>
                                            <option className="bg-background " >6PM</option>
                                            <option className="bg-background " >7PM</option>
                                            <option className="bg-background " >8PM</option>
                                            <option className="bg-background " >9PM</option>
                                            <option className="bg-background " >10PM</option>
                                            <option className="bg-background " >11PM</option>

                                        </select>

                                        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:text-base   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Closing Time [_3AM_]</label>

                                    </div>

                                    <div className="relative z-0 w-full mb-6 group">
                                        <input
                                            onChange={setRestaurantImage}
                                            type="file" name="floating_first_name" id="floating_first_name" className="block py-1.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer
                                        
                                        file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                            placeholder=" "
                                            accept="image/x-png,image/jpeg,image/jpg"
                                            required />
                                    </div>

                                </div>

                                <div className="text-center baseGradient90 rounded-full my-5 text-white py-2 flex gap-3 justify-center items-center mmd:text-sm  " >

                                    Add At least one food to this restaurant.

                                    <span className=" mmd:hidden scale-150" >  <IoFastFood /></span>

                                </div>

                                {
                                    imgFood?.value &&

                                    <div className="flex justify-end ">

                                        <div className={`w-96 flex flex-col relative ${(imgDataFood?.ratioError || imgDataFood?.sizeError) && "bg-red-600"}`}  >

                                            < img className={`imgStrictSize ${(imgDataFood?.ratioError || imgDataFood?.sizeError) && "opacity-50"}`} src={imgFood?.value} alt="" />

                                            {(imgDataFood?.ratioError || imgDataFood?.sizeError) && <span className="absolute py-5 px-2 bg-red-600 top-2/4  inline-block w-full" >{imgDataFood.ratioError + "(1200×800 pixels)"} {imgDataFood.ratioError && <br />} {imgDataFood.sizeError}</span>}
                                        </div>
                                    </div>

                                }

                                <div className="grid md:grid-cols-4 md:gap-6">

                                    <div className="relative z-0 w-full mb-6 group " >

                                        <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required

                                            onChange={(e) => setNameFood(e.target.value)}

                                        />


                                        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:text-base   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Food item's full name</label>
                                    </div>

                                    <div className="relative z-0 w-full mb-6 group">
                                        <input type="number" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required

                                            onChange={(e) => setPriceFood(e.target.value)}
                                        />
                                        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:text-base   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>

                                    </div>

                                    <div className="relative z-0 w-full mb-6 group">
                                        <div className="text-white">

                                            <label htmlFor="hs-checkbox-checked-in-form" className={`flex p-3 w-full border rounded-md text-sm  ${isExclusive && "bg-green-800"}`} >
                                                <input type="checkbox" className="shrink-0 mt-0.5 text-white" id="hs-checkbox-checked-in-form"
                                                    onChange={() => setIsExclusive(p => !p)}
                                                    checked={isExclusive}
                                                />
                                                <span className={`text-sm  ml-3 ${!isExclusive && "line-through"}`}>It is an Exclusive item.</span>
                                            </label>
                                        </div>

                                    </div>

                                    <div className="relative z-0 w-full mb-6 group">



                                        <input
                                            onChange={(e) => setFoodImage(e)}
                                            type="file" name="floating_first_name" id="floating_first_name" className="block py-1.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer
                                        
                                        file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                            placeholder=" "
                                            accept="image/x-png,image/jpeg,image/jpg"
                                        />
                                    </div>


                                </div>

                                <button type="submit" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Restaurant</button>
                            </Form>




                        </div>


                    }


                    {
                        pageName === "delete" && <div id="segment-2" className="hidden " role="tabpanel" aria-labelledby="segment-item-2"
                        >

                            <div className="flex flex-col">
                                <div className="-m-1.5 overflow-x-auto  ">
                                    <div className="p-1.5 min-w-full inline-block align-middle">
                                        <div className="overflow-hidden">
                                            <table className="min-w-full divide-y divide-gray-200 text-primary ">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase">Cover</th>

                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase">Name</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase">Id</th>

                                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium  uppercase">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">

                                                    {

                                                        restaurantList && restaurantList.map(({ restaurantData, restaurantId, }) => (
                                                            <tr key={restaurantId} className="">
                                                                <td className="px-6 w-44  py-4 whitespace-nowrap text-sm font-medium  dark:text-gray-200"><img loading="lazy" className="imgStrictSize border border-gray-400 rounded-lg" src={restaurantData.picture} alt="" /></td>

                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  dark:text-gray-200">{restaurantData.name}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm  dark:text-gray-200">{restaurantId}</td>

                                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                    <button disabled={loading} onClick={async () => deleteARestaurant({ id: restaurantId, name: restaurantData.name, image: restaurantData.picture })} className={`text-blue-500 hover:text-blue-200 rounded-md border border-slate-500 hover:border-slate-400 px-3 py-2 ${loading && "opacity-30"}`} href="#">
                                                                        Delete
                                                                    </button>
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
    )
}
export default RestaurantsAdmin;