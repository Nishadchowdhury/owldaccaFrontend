import SingleFood from './SingleFood'
import { baseURL } from "../../hooks/envCheck";
import { useQuery } from "react-query";
import Loader from '../Loaders/Loader';
import { LoadElement } from '../Restaurants/Restaurants';

function ExclusiveFoods() {
    const { isLoading, error, data, refetch } = useQuery('cuisinesAllExclusive', () =>
        fetch("/db/foodItems.json").then(res =>
            res.json()
        ),
        //--------
    )
    const cuisines = data || [];

    return (
        <div className="mt-7">
            <h1 className="homePageText"> {`Owl Dacca's Exclusive`} </h1>

            <div className="HomePageContainer">

                <div className='HomeItemsGridContainer'>
                    {cuisines &&
                        cuisines.map(({ isExclusive, cuisineImg, name, _id }) => {
                            return isExclusive ? (
                                <SingleFood
                                    isExclusive={isExclusive}
                                    picture={`/foods/${cuisineImg}`}
                                    name={name}
                                    id={_id}
                                    key={_id}
                                />
                            ) : null
                        }
                        )}
                </div>

                {
                    isLoading && <>
                        <LoadElement />
                    </>

                }
            </div>


        </div>
    );
}
export default ExclusiveFoods


