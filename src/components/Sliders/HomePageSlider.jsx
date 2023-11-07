import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Grid } from "swiper/modules";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseURL } from "../../hooks/envCheck";
import { useQuery } from "react-query";



function HomePageSlider() {

    const [imagesForSlider, setImagesForSlider] = useState([]);

    const { isLoading, error, data, refetch } = useQuery('allSlider', () =>
        fetch(baseURL + "/sliders").then(res =>
            res.json()
        ),
        //--------
    )

    useEffect(() => {
        setImagesForSlider(data?.sliders);
    }, [data])


    return (


        <div className="rounded-3xl overflow-hidden">


            <div className="w-full" >
                <Swiper
                    slidesPerView={2}
                    grid={{
                        rows: 1,
                        fill: 'row'
                    }}
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
                        dynamicBullets: false,
                    }}
                    navigation={true}
                    modules={[Autoplay, Grid, Pagination, Navigation]}
                    className="mySwiper mmd:hidden"
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                >
                    {imagesForSlider &&
                        imagesForSlider?.map((image) => (
                            <SwiperSlide className="rounded-3xl overflow-hidden " key={image + '' + Math.random()}>
                                <div className=" overflow-hidden flex items-center justify-center ">
                                    <Link to='/' >
                                        <img loading="lazy"
                                            src={image?.src}
                                            alt="sliderImage"
                                            className="min-w-full max-w-full hover:scale-105 transition-all object-cover"
                                        />
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>

                <Swiper
                    slidesPerView={1}
                    grid={{
                        rows: 1,
                        fill: 'row'
                    }}
                    spaceBetween={20}
                    pagination={{
                        clickable: true,
                        dynamicBullets: false,
                    }}
                    navigation={true}
                    modules={[Autoplay, Grid, Pagination, Navigation]}
                    className="mySwiper md:hidden"
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                >
                    {imagesForSlider &&
                        imagesForSlider.map(image => (
                            <SwiperSlide className="rounded-3xl overflow-hidden " key={image + '' + Math.random()}>
                                <div className=" overflow-hidden flex items-center justify-center ">
                                    <Link to='/' >
                                        <img loading="lazy"
                                            src={image?.src}
                                            alt="sliderImage"
                                            className="min-w-full max-w-full hover:scale-105 transition-all object-cover"
                                        />
                                    </Link>
                                </div>
                            </SwiperSlide>
                        ))}
                </Swiper>


            </div>
        </div >
    )
}
export default HomePageSlider