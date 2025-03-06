// create restaurant has done,>>> 4 more to do
import { IoFastFood, IoFastFoodOutline } from "react-icons/io5";
import { VscSettingsGear } from "react-icons/vsc";
import { useContext, useRef, useState } from "react";
import Form from "../Form/Form";
import { useEffect } from "react";
import { baseURL } from "../../hooks/envCheck";
import { useQuery } from "react-query";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";
import imageValidation from "../../hooks/imageValidation";
import { toast } from "react-toastify";

function FoodsAdmin({ restaurants, refetchRestaurants }) {
    const restaurantList = restaurants || [];
    // //getting all restaurant
    const { isLoading, error, data, refetch } = useQuery('allCuisines', () =>
        fetch("/db/foodItems.json").then(res =>
            res.json()
        ),
        //--------
    )

    const foodList = data || [];
    const { users } = useContext(userContext) || {}
    const user = users?.firebaseUser;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    //pages 
    const [pageName, setPageName] = useState(null)


    //food
    const [nameFood, setNameFood] = useState(null);
    const [priceFood, setPriceFood] = useState(null);
    const [isExclusive, setIsExclusive] = useState(false);
    const [availableAt, setAvailableAt] = useState(null);
    const findWith = nameFood?.split(" ");
    const [imgFood, setImgFood] = useState({ value: "", error: null });
    const [imgDataFood, setDataImgFood] = useState({ sizeError: null, ratioError: null });
    const [imgFileFood, setImgFileFood] = useState(null);
    const foodId = nameFood?.replace(/\s+/g, '') + '-' + Date.now() + '-' + Math.floor(Math.random() * 1000);

    //toasts of statuses
    const toastId = useRef(null);
    const creatingFood = () => toastId.current = toast("Adding a food Item.", {
        position: "top-center",
        autoClose: false,
        type: toast.TYPE.INFO,
        theme: "dark",
        className: "border border-slate-700"
    });

    const demoPanel = () => toast("Demo admin panel doesn't support any action", {
        position: "top-center",
        autoClose: true,
        type: toast.TYPE.INFO,
        theme: "dark",
        className: "border border-slate-700"
    });

    const foodCreated = () => toast.update(toastId.current, {
        position: "top-center",
        theme: "dark",
        render: <span className="flex flex-row" >The food has added successfully. </span>,
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
        className: 'rotateY animated border border-slate-700'
    });

    const foodExist = () => toast.update(toastId.current, {
        position: "top-center",
        theme: "dark",
        render: <span className="flex flex-row" >The food item does exist. </span>,
        type: toast.TYPE.WARNING,
        autoClose: 3000,
        className: 'rotateY animated border border-slate-700'
    });

    const newCuisine = {
        isExclusive: isExclusive,
        price: priceFood,
        availableAt: availableAt,
        name: nameFood,
        findWith: findWith,
    }

    const setFoodImage = function (event) {
        imageValidation(event, 120, setImgFood, setDataImgFood, setImgFileFood, "3:2");
    };

    //creating restaurant
    async function createFood(e) {
        e.preventDefault()

        if (imgDataFood.ratioError || imgDataFood.sizeError) {
            window.alert("get rid of all errors, before adding a food item.!")
            return
        }

        if (imgDataFood.ratioError || imgDataFood.sizeError) {
            window.alert("get rid of all errors, before adding a food item.!")
            return
        }



        // creating food
        try {
            creatingFood();
            const formData = new FormData()

            //food img upload start
            formData.append("image", imgFileFood);
            const statusOfUploadImageFood = await fetch(baseURL + '/food_image/' + foodId, {
                method: 'POST',
                body: formData,
            })
            const uploadedImgFood = await statusOfUploadImageFood.json()

            if (!uploadedImgFood.status === 201) {
                return window.alert('an error ocurred while uploading the image')
            }
            //food img upload end
            newCuisine.cuisineImg = uploadedImgFood.imgName;

            const creatingResponseFood = await fetch(baseURL + "/cuisines/" + foodId, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8',
                },
                body: JSON.stringify(newCuisine)
            })
            const response = await creatingResponseFood.json()
            console.log(response)

            if (response.status === 403) {
                setTimeout(() => {
                    foodExist()
                    refetchRestaurants()
                    refetch()
                }, 1000);

            } else if (response.status === 201) {
                const creatingResponseFoodInRes = await fetch(baseURL + "/restaurants/" + (response.food.availableAt.replace(/\s/g, '')).toLowerCase(), {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8',
                    },
                    body: JSON.stringify(response.food)
                })
                const responseRes = await creatingResponseFoodInRes.json()
                console.log(responseRes)

                setTimeout(() => {
                    foodCreated();
                    refetchRestaurants()
                    refetch()
                }, 700);

            }
        } catch (error) {
            console.log(error)
            return
        }


    }


    const deleteAFood = async ({ id, name, image, data }) => {
        const ask = window.confirm(`do you want to delete __${name}__ write ${name} here.`)

        function getImgName(url) {
            const parts = url.split("/");
            return parts[parts.length - 1];
        }

        if (ask) {

            const response = await fetch(baseURL + "/cuisines/" + id, {
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

                const creatingResponseFoodInRes = await fetch(baseURL + "/restaurantsFood/" + (data.availableAt.replace(/\s/g, '')).toLowerCase(), {
                    method: "DELETE",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8',
                    },
                    body: JSON.stringify(data)
                })
                const responseRes = await creatingResponseFoodInRes.json()
                console.log(responseRes)

                console.log(ok)
                refetch()
                refetchRestaurants()
            }
        }
        return;
    }





    return (
        <div className="hs-accordion  bg-slate-800 rounded-xl px-3 mt-5" id="hs-basic-with-title-and-arrow-stretched-heading-two">


            <button className="hs-accordion-toggle  group py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold  transition  hs-accordion-active:border-b border-slate-600 text-center" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two">
                <h1 className="text-center w-full center gap-3" >Manage Foods <span ><IoFastFoodOutline /></span> </h1>
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
                            <button onClick={() => setPageName("create")} type="button" className=" hs-tab-active:text-white hs-tab-active  py-3 px-4 inline-flex items-center gap-2 bg-transparent text-sm border border-slate-400 hover:text-gray-700 font-medium rounded-md hover:hover:text-blue-600 dark:hover:text-white" id="segment-item-1" data-hs-tab="#segment-3" aria-controls="segment-3" role="tab3">
                                Create +
                            </button>

                            <button onClick={() => setPageName("delete")} type="button" className=" hs-tab-active:text-white hs-tab-active  py-3 px-4 inline-flex items-center gap-2 bg-transparent text-sm border border-slate-400 hover:text-gray-700 font-medium rounded-md hover:hover:text-blue-600 dark:hover:text-white" id="segment-item-2" data-hs-tab="#segment-4" aria-controls="segment-4" role="tab4">
                                Delete -
                            </button>
                        </nav>
                    </div>
                </div>

                <div className="mt-3">
                    {
                        pageName === "create" &&
                        <div id="segment-3" role="tabpanel3" aria-labelledby="segment-item-3" className="mb-5">


                            <Form onSubmit={demoPanel} className={"flex justify-center mb-5 flex-col"}>



                                {
                                    imgFood?.value &&
                                    <div className={`w-full flex justify-end mb-2`}  >


                                        <div className={`w-96 flex flex-col relative ${(imgDataFood?.ratioError || imgDataFood?.sizeError) && "bg-red-600"}`}  >
                                            < img className={`imgStrictSize ${(imgDataFood?.ratioError || imgDataFood?.sizeError) && "opacity-50"}`} src={imgFood?.value} alt="" />

                                            {
                                                (imgDataFood?.ratioError || imgDataFood?.sizeError) && <span className="absolute py-5 px-2 bg-red-600 top-2/4  inline-block w-full" >{imgDataFood.ratioError + "(1200×800 pixels)"} <br /> {imgDataFood.sizeError}</span>
                                            }


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

                                            <label htmlFor="hs-checkbox-checked-in-formFood" className={`flex p-3 w-full border rounded-md text-sm  ${isExclusive && "bg-green-800"}`} >
                                                <input type="checkbox" className="shrink-0 mt-0.5 text-white" id="hs-checkbox-checked-in-formFood"
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

                                    <div className="relative z-0 w-full mb-6 group">

                                        <select
                                            type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-2 w-full text-sm uppercase text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required
                                            onChange={(e) => setAvailableAt(e.target.value + '')}
                                        >
                                            <option className="bg-background  " ></option>

                                            {
                                                restaurantList && restaurantList.map(({ name }) => (
                                                    <option key={name} className="bg-background " > {name} </option>

                                                ))
                                            }


                                        </select>

                                        <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:text-base scale-100  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Select associated restaurant. </label>

                                    </div>


                                </div>

                                <button type="submit" className=" text-white bg-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Add an item</button>
                            </Form>




                        </div>


                    }


                    {
                        pageName === "delete" && <div id="segment-4" className="hidden " role="tabpanel4" aria-labelledby="segment-item-4"
                        >

                            <div className="flex flex-col">
                                <div className="-m-1.5 overflow-x-auto  ">
                                    <div className="p-1.5 min-w-full inline-block align-middle">
                                        <div className="overflow-hidden h-96 overflow-y-scroll ">
                                            <table className="min-w-full divide-y divide-gray-200 text-primary ">
                                                <thead>
                                                    <tr>
                                                        <th scope="col" className=" px-6 py-3 text-left text-xs font-medium  uppercase">Cover</th>

                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase">Name</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase">Restaurant</th>
                                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium  uppercase">Price</th>

                                                        <th scope="col" className="px-6 py-3 text-right text-xs font-medium  uppercase">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y overflow-y-scroll divide-gray-200 dark:divide-gray-700">
                                                    {


                                                        foodList && foodList.map(({ cuisineImg, name, availableAt, price }) => (
                                                            <tr key={"/foods/" + cuisineImg} className="">
                                                                <td className="  w-44  py-4 whitespace-nowrap text-sm font-medium  "><img loading="lazy" className="imgStrictSize border border-gray-400 rounded-lg" src={"/foods/" + cuisineImg} alt="" />
                                                                </td>

                                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  ">{name}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm  ">{availableAt}</td>
                                                                <td className="px-6 py-4 whitespace-nowrap text-sm  ">{price} BDT</td>

                                                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                    <button onClick={demoPanel} className="text-blue-500 hover:text-blue-200 rounded-md border border-slate-500 hover:border-slate-400 px-3 py-2" href="#">Delete</button>
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
export default FoodsAdmin;