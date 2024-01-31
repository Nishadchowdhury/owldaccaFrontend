import SingleRestaurant from '../Restaurants/SingleRestaurant'
import { baseURL } from '../../hooks/envCheck';

import { useQuery } from "react-query"
import Loader from '../Loaders/Loader';
import NetworkIssueModal from '../Modals/NetworkIssueModal';
import { useEffect, useState } from 'react';

function Restaurants() {

    const [visible, setVisible] = useState(false)

    const { isLoading, data } = useQuery('restaurantsAll', () =>
        fetch(baseURL + '/restaurants').then(res =>
            res.json()
        )
    )
    const restaurants = data?.restaurantList || [];

    useEffect(() => {
        if (data?.status === 200) {
            return setVisible(false)
        }

        setTimeout(() => {
            if (data?.status === undefined) {
                return setVisible(true)
            }
        }, 5500)
    }, [data])


    return (
        <div className="mt-7 ">

            {!restaurants && <NetworkIssueModal visible={visible} />}

            <h1 className="homePageText"> Order by Restaurants </h1>

            <div className="HomePageContainer">

                <div className='HomeItemsGridContainer' >
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



