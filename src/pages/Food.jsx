import { baseURL } from "../hooks/envCheck";
import { TbCurrencyTaka } from "react-icons/tb"
import { HiShoppingBag } from "react-icons/hi2";
import Button from "../components/Button/Button";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import AddToCart from "../components/FoodWithDetails/AddToCart";
import { useEffect, useState } from "react";
import Loader from "../components/Loaders/Loader";

function Food() {
    const params = useParams();

    const { isLoading, error, data, refetch } = useQuery('singleCuisine' + params.foodId, () =>
        fetch('/db/foodItems.json').then(res =>
            res.json()
        )
    )
    const { cuisineImg, isExclusive, restaurant: availableAt, name, price, } = data?.find(item => item._id === params.foodId) || {};

    console.log(data);

    const item = {
        cuisineImg: cuisineImg,
        price: price,
        availableAt: availableAt,
        isExclusive: isExclusive,
        name: name
    }



    if (isLoading) return <Loader />;

    return (
        <section className=" text-primary body-font overflow-hidden mt-10 mb-10">
            <div className="container px-5  mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">

                    <img loading="lazy" alt="ecommerce" className=" msm:imgStrictSize lg:w-1/2 w-full object-cover object-center rounded-xl"
                        src={cuisineImg}

                        width={400} height={400} />
                    <div className="relative lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                        <div className=" " >
                            <h2 className="text-white text-sm title-font  tracking-widest ">Cuisine name:</h2>
                            <h1 className=" homePageText sm:ml-0 ml-2 font-medium mb-1 ">{name}</h1>
                        </div>
                        <div className="flex flex-col my-4 ">
                            <h2 className="text-white text-sm title-font  tracking-widest ">Restaurant name:</h2>
                            <h1 className=" homePageText sm:ml-0 ml-2 font-medium mb-1  ">{availableAt}</h1>

                            {isExclusive && <span className="text-[#FFCF40]   mt-4 "> {"It's an exclusive item.!"} </span>}
                        </div>


                        <div className="flex flex-row justify-between xl:absolute 2xl:absolute bottom-0 w-full">
                            <div className="  flex flex-row items-center ml-2 text-xl msm:text-xs "> Price: {price} <span className="inline scale-110" >
                                <TbCurrencyTaka /></span> </div>

                            <div className="flex flex-row items-center justify-center">


                                <AddToCart food={item} />

                                <Link
                                    className="msm:scale-75 "
                                    to={{
                                        pathname: `/checkout/${params?.foodId}`,
                                        query: data?.cuisine
                                    }}>
                                    <button className=" py-3 px-4 md:ml-3 flex flex-row items-center justify-center gap-3 bg-primary bg-opacity-10 rounded-md hover:opacity-75 transition-all  " >
                                        checkout <HiShoppingBag />
                                    </button>
                                </Link>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>


    )
}
export default Food