
import FoodWithDetails from "../components/FoodWithDetails/FoodWithDetails"
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import Loader from "../components/Loaders/Loader";

function Restaurant() {
    const params = useParams();

    const { isLoading, data } = useQuery('singleRestaurant' + params?.restaurantId, () =>
        fetch("/db/restaurants.json").then(res =>
            res.json()
        )
    )

    const { data: cuisines } = useQuery('singleRestaurant' + "cuisines" + params?.restaurantId, () =>
        fetch("/db/foodItems.json").then(res =>
            res.json()
        )
    )

    const { name } = data?.find(item => item.name === params.restaurantId) || {}




    console.log(cuisines);

    return (

        <section className="bg-background px-2 text-gray-600 body-font relative flex items-start  w-full xl:px-16   ">

            {
                !isLoading && name && <div className="container msm:px-2 px-5 py-2 mx-auto flex flex-wrap h-full">
                    <div className="flex items-start justify-center msm:flex-col  w-full">

                        <div className="  sm:hidden lg:block  md:w-1/2 lg:w-2/5 xl:w-1/3 2xl:w-1/3 object-cover object-center rounded-lg md:mt-0 msm:static sticky top-12" >
                            <div className="group  relative overflow-hidden" >
                                <div className=" mt-5 msm:mr-0 mr-6 shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] overflow-hidden">
                                    <img loading="lazy"

                                        className="imgStrictSize rounded-t-xl"
                                        alt="Image Description"
                                        src={"/restaurants/" + name + ".jpg"}
                                    />

                                </div>

                                <div className="absolute w-full h-10 bg-black bg-opacity-30 backdrop-blur-sm transition-all -bottom-10  opacity-0  group-hover:bottom-0 group-hover:opacity-100 rounded-b-xl flex justify-between items-center px-5 text-primary " >
                                    {name}
                                </div>
                            </div>

                        </div>

                        <div className="lg:w-3/5 xl:w-2/3 2xl:w-2/3 w-full mt-4 ">

                            {cuisines?.filter(items => items.restaurant === params.restaurantId).map(({ cuisineImg, price, restaurant, isExclusive, name }) => (
                                <FoodWithDetails key={name + price + cuisineImg}
                                    name={name}
                                    cuisineImg={"/foods/" + cuisineImg}
                                    price={price}
                                    availableAt={restaurant}
                                    isExclusive={isExclusive}
                                />
                            ))}



                        </div>

                    </div>
                </div>
            }

            {
                isLoading && <Loader height={"h-screen"} />
            }

        </section>


    )
}
export default Restaurant