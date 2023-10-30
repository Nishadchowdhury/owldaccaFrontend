import SingleRestaurant from '../Restaurants/SingleRestaurant'
import { baseURL } from '../../hooks/envCheck';

import { useQuery } from "react-query"
import Loader from '../Loaders/Loader';

function Restaurants() {

    const { isLoading, error, data, refetch } = useQuery(
        'repoData',
        () =>
            fetch(baseURL + '/restaurants', {
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then((res) => res.json()),
        {
            staleTime: (60000 * 60) * 24,
            refetchOnWindowFocus: false,
        }
    );

    const restaurants = data?.restaurantList || [];

    return (
        <div className="mt-7 ">
            <h1 className="homePageText"> Order by Restaurants </h1>
            <div className="HomePageContainer">

                <div className='HomeItemsGridContainer ' >

                    {restaurants && !isLoading && restaurants.map(({ restaurantId, restaurantData }) => (
                        <SingleRestaurant key={restaurantId} id={restaurantId} picture={restaurantData?.picture} name={restaurantData?.name} />
                    ))}

                </div>
                {
                    isLoading && <Loader />

                }
            </div>

        </div>
    );
}
export default Restaurants



