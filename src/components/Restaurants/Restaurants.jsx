import SingleRestaurant from '../Restaurants/SingleRestaurant'
import { baseURL } from '../../hooks/envCheck';

import { useQuery } from "react-query"
import Loader from '../Loaders/Loader';
import NetworkIssueModal from '../Modals/NetworkIssueModal';
import { useEffect, useState } from 'react';
import { BiRightArrowCircle } from 'react-icons/bi';

function Restaurants() {

    const [visible, setVisible] = useState(false)

    const { isLoading, data } = useQuery('restaurantsAll', () =>
        fetch(baseURL + '/restaurants').then(res =>
            res.json()
        )
    )
    const restaurants = data?.restaurantList || [];

    useEffect(() => {
        if (restaurants.length !== 0) {
            return setVisible(false)
        }

        setTimeout(() => {
            if (restaurants.length === 0) {
                return setVisible(true)
            }
        }, 5500)
    }, [restaurants])




    return (
        <div className="mt-7 ">

            {/* {(restaurants.length === 0) && <NetworkIssueModal visible={visible} />} */}

            <h1 className="homePageText"> Order by Restaurants </h1>

            <div className="HomePageContainer">

                <div className='HomeItemsGridContainer' >

                    {
                        isLoading && <>
                            <LoadElement />

                        </>
                    }

                    {restaurants && !isLoading && restaurants.map(({ restaurantId, restaurantData }) => (
                        <SingleRestaurant key={restaurantId} id={restaurantId} picture={restaurantData?.picture} name={restaurantData?.name} />
                    ))}

                </div>

            </div>

        </div >
    );
}
export default Restaurants




export function LoadElement() {

    return (
        <>
            <div className="group relative hover:scale-105 transition-all overflow-hidden animate-pulse" >
                <div className="bg-white shadow-sm rounded-xl overflow-hidden">
                    <img loading="lazy"
                        className="min-h-full max-h-full min-w-full max-w-full rounded-t-xl group-hover:scale-105 overflow-hidden transition-all group-hover:brightness-50 blur-md grayscale"
                        alt="Image restaurant"
                        style={{
                            height: 150,
                            width: 300,
                        }}
                        src={'/public/assets/imgs/loaderBg.jpg'}
                    />
                </div>
                <div className="singleItemsHomePage " >
                    {name?.length > 14 ? name?.slice(0, 13) + "..." : name}
                    <span className="msm:hidden " > <BiRightArrowCircle className="scale-125" /> </span>
                </div>
            </div>
            <div className="group relative hover:scale-105 transition-all overflow-hidden animate-pulse" >
                <div className="bg-white shadow-sm rounded-xl overflow-hidden">
                    <img loading="lazy"
                        className="min-h-full max-h-full min-w-full max-w-full rounded-t-xl group-hover:scale-105 overflow-hidden transition-all group-hover:brightness-50 blur-md grayscale"
                        alt="Image restaurant"
                        style={{
                            height: 150,
                            width: 300,
                        }}
                        src={'/public/assets/imgs/loaderBg.jpg'}
                    />
                </div>
                <div className="singleItemsHomePage " >
                    {name?.length > 14 ? name?.slice(0, 13) + "..." : name}
                    <span className="msm:hidden " > <BiRightArrowCircle className="scale-125" /> </span>
                </div>
            </div>
            <div className="group relative hover:scale-105 transition-all overflow-hidden animate-pulse" >
                <div className="bg-white shadow-sm rounded-xl overflow-hidden">
                    <img loading="lazy"
                        className="min-h-full max-h-full min-w-full max-w-full rounded-t-xl group-hover:scale-105 overflow-hidden transition-all group-hover:brightness-50 blur-md grayscale"
                        alt="Image restaurant"
                        style={{
                            height: 150,
                            width: 300,
                        }}
                        src={'/public/assets/imgs/loaderBg.jpg'}
                    />
                </div>
                <div className="singleItemsHomePage " >
                    {name?.length > 14 ? name?.slice(0, 13) + "..." : name}
                    <span className="msm:hidden " > <BiRightArrowCircle className="scale-125" /> </span>
                </div>
            </div>
            <div className="group relative hover:scale-105 transition-all overflow-hidden animate-pulse" >
                <div className="bg-white shadow-sm rounded-xl overflow-hidden">
                    <img loading="lazy"
                        className="min-h-full max-h-full min-w-full max-w-full rounded-t-xl group-hover:scale-105 overflow-hidden transition-all group-hover:brightness-50 blur-md grayscale"
                        alt="Image restaurant"
                        style={{
                            height: 150,
                            width: 300,
                        }}
                        src={'/public/assets/imgs/loaderBg.jpg'}
                    />
                </div>
                <div className="singleItemsHomePage " >
                    {name?.length > 14 ? name?.slice(0, 13) + "..." : name}
                    <span className="msm:hidden " > <BiRightArrowCircle className="scale-125" /> </span>
                </div>
            </div>
            <div className="group relative hover:scale-105 transition-all overflow-hidden animate-pulse" >
                <div className="bg-white shadow-sm rounded-xl overflow-hidden">
                    <img loading="lazy"
                        className="min-h-full max-h-full min-w-full max-w-full rounded-t-xl group-hover:scale-105 overflow-hidden transition-all group-hover:brightness-50 blur-md grayscale"
                        alt="Image restaurant"
                        style={{
                            height: 150,
                            width: 300,
                        }}
                        src={'/public/assets/imgs/loaderBg.jpg'}
                    />
                </div>
                <div className="singleItemsHomePage " >
                    {name?.length > 14 ? name?.slice(0, 13) + "..." : name}
                    <span className="msm:hidden " > <BiRightArrowCircle className="scale-125" /> </span>
                </div>
            </div>
            <div className="group relative hover:scale-105 transition-all overflow-hidden animate-pulse" >
                <div className="bg-white shadow-sm rounded-xl overflow-hidden">
                    <img loading="lazy"
                        className="min-h-full max-h-full min-w-full max-w-full rounded-t-xl group-hover:scale-105 overflow-hidden transition-all group-hover:brightness-50 blur-md grayscale"
                        alt="Image restaurant"
                        style={{
                            height: 150,
                            width: 300,
                        }}
                        src={'/public/assets/imgs/loaderBg.jpg'}
                    />
                </div>
                <div className="singleItemsHomePage " >
                    {name?.length > 14 ? name?.slice(0, 13) + "..." : name}
                    <span className="msm:hidden " > <BiRightArrowCircle className="scale-125" /> </span>
                </div>
            </div>
            <div className="group relative hover:scale-105 transition-all overflow-hidden animate-pulse" >
                <div className="bg-white shadow-sm rounded-xl overflow-hidden">
                    <img loading="lazy"
                        className="min-h-full max-h-full min-w-full max-w-full rounded-t-xl group-hover:scale-105 overflow-hidden transition-all group-hover:brightness-50 blur-md grayscale"
                        alt="Image restaurant"
                        style={{
                            height: 150,
                            width: 300,
                        }}
                        src={'/public/assets/imgs/loaderBg.jpg'}
                    />
                </div>
                <div className="singleItemsHomePage " >
                    {name?.length > 14 ? name?.slice(0, 13) + "..." : name}
                    <span className="msm:hidden " > <BiRightArrowCircle className="scale-125" /> </span>
                </div>
            </div>
            <div className="group relative hover:scale-105 transition-all overflow-hidden animate-pulse" >
                <div className="bg-white shadow-sm rounded-xl overflow-hidden">
                    <img loading="lazy"
                        className="min-h-full max-h-full min-w-full max-w-full rounded-t-xl group-hover:scale-105 overflow-hidden transition-all group-hover:brightness-50 blur-md grayscale"
                        alt="Image restaurant"
                        style={{
                            height: 150,
                            width: 300,
                        }}
                        src={'/public/assets/imgs/loaderBg.jpg'}
                    />
                </div>
                <div className="singleItemsHomePage " >
                    {name?.length > 14 ? name?.slice(0, 13) + "..." : name}
                    <span className="msm:hidden " > <BiRightArrowCircle className="scale-125" /> </span>
                </div>
            </div>
            <div className="group relative hover:scale-105 transition-all overflow-hidden animate-pulse" >
                <div className="bg-white shadow-sm rounded-xl overflow-hidden">
                    <img loading="lazy"
                        className="min-h-full max-h-full min-w-full max-w-full rounded-t-xl group-hover:scale-105 overflow-hidden transition-all group-hover:brightness-50 blur-md grayscale"
                        alt="Image restaurant"
                        style={{
                            height: 150,
                            width: 300,
                        }}
                        src={'/public/assets/imgs/loaderBg.jpg'}
                    />
                </div>
                <div className="singleItemsHomePage " >
                    {name?.length > 14 ? name?.slice(0, 13) + "..." : name}
                    <span className="msm:hidden " > <BiRightArrowCircle className="scale-125" /> </span>
                </div>
            </div>
            <div className="group relative hover:scale-105 transition-all overflow-hidden animate-pulse" >
                <div className="bg-white shadow-sm rounded-xl overflow-hidden">
                    <img loading="lazy"
                        className="min-h-full max-h-full min-w-full max-w-full rounded-t-xl group-hover:scale-105 overflow-hidden transition-all group-hover:brightness-50 blur-md grayscale"
                        alt="Image restaurant"
                        style={{
                            height: 150,
                            width: 300,
                        }}
                        src={'/public/assets/imgs/loaderBg.jpg'}
                    />
                </div>
                <div className="singleItemsHomePage " >
                    {name?.length > 14 ? name?.slice(0, 13) + "..." : name}
                    <span className="msm:hidden " > <BiRightArrowCircle className="scale-125" /> </span>
                </div>
            </div>
            <div className="group relative hover:scale-105 transition-all overflow-hidden animate-pulse" >
                <div className="bg-white shadow-sm rounded-xl overflow-hidden">
                    <img loading="lazy"
                        className="min-h-full max-h-full min-w-full max-w-full rounded-t-xl group-hover:scale-105 overflow-hidden transition-all group-hover:brightness-50 blur-md grayscale"
                        alt="Image restaurant"
                        style={{
                            height: 150,
                            width: 300,
                        }}
                        src={'/public/assets/imgs/loaderBg.jpg'}
                    />
                </div>
                <div className="singleItemsHomePage " >
                    {name?.length > 14 ? name?.slice(0, 13) + "..." : name}
                    <span className="msm:hidden " > <BiRightArrowCircle className="scale-125" /> </span>
                </div>
            </div>
            <div className="group relative hover:scale-105 transition-all overflow-hidden animate-pulse" >
                <div className="bg-white shadow-sm rounded-xl overflow-hidden">
                    <img loading="lazy"
                        className="min-h-full max-h-full min-w-full max-w-full rounded-t-xl group-hover:scale-105 overflow-hidden transition-all group-hover:brightness-50 blur-md grayscale"
                        alt="Image restaurant"
                        style={{
                            height: 150,
                            width: 300,
                        }}
                        src={'/public/assets/imgs/loaderBg.jpg'}
                    />
                </div>
                <div className="singleItemsHomePage " >
                    {name?.length > 14 ? name?.slice(0, 13) + "..." : name}
                    <span className="msm:hidden " > <BiRightArrowCircle className="scale-125" /> </span>
                </div>
            </div>
        </>
    )
}