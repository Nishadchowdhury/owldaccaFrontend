import SingleFood from './SingleFood'
import { baseURL } from "../../hooks/envCheck";
import { useQuery } from "react-query";
import Loader from '../Loaders/Loader';

function ExclusiveFoods() {
    const { isLoading, error, data, refetch } = useQuery('cuisinesAllExclusive', () =>
        fetch(baseURL + "/cuisines/1000000000").then(res =>
            res.json()
        ),
        {
            staleTime: (60000 * 60) * 24,
            refetchOnWindowFocus: false,
        }
    )
    const cuisines = data?.cuisineList || [];

    return (
        <div className="mt-7">
            <h1 className="homePageText"> {`Owl Dacca's Exclusive`} </h1>

            <div className="HomePageContainer">

                <div className='HomeItemsGridContainer'>
                    {cuisines &&
                        cuisines.map(({ cuisineId, cuisineData }) => {
                            return cuisineData.isExclusive ? (
                                <SingleFood
                                    isExclusive={cuisineData.isExclusive}
                                    picture={cuisineData.cuisineImg}
                                    name={cuisineData.name}
                                    id={cuisineId}
                                    key={cuisineId}
                                />
                            ) : null
                        }
                        )}
                </div>

                {
                    isLoading && <Loader />

                }
            </div>


        </div>
    );
}
export default ExclusiveFoods



