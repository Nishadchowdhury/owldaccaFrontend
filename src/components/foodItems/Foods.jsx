import SingleFood from './SingleFood'
import { baseURL } from "../../hooks/envCheck";
import { useQuery } from "react-query";
import Loader from '../Loaders/Loader';
import { useContext, useEffect, useState } from 'react';
import Button from '../Button/Button';
import { TfiReload } from 'react-icons/tfi';
import { userContext } from '../../App';

function Foods() {
    const { users, setUser } = useContext(userContext);
    const { queryN } = users
    const [cuisines, setCuisines] = useState([])


    const { isLoading, data, refetch, isRefetching } = useQuery('cuisinesAll' + queryN, () =>
        fetch("/db/foodItems.json").then(res =>
            res.json()
        )
    )


    function getMore() {
        setUser(p => ({ ...p, queryN: queryN + 18 }))
        refetch()
    }

    useEffect(() => {
        setCuisines(data || []);
    }, [data])



    return (
        <div className="mt-7"  >
            <h1 className="homePageText"> {`All Cuisines`} </h1>

            <div className="HomePageContainer">

                <div className='HomeItemsGridContainer ' >
                    {
                        cuisines && cuisines.map(({ isExclusive, cuisineImg, _id, name  }) => (

                            <SingleFood isExclusive={isExclusive} picture={`/foods/${cuisineImg}`} name={name} id={_id} key={_id} />

                        ))
                    }

                    {isRefetching && <Loader />}

                </div>

                {isLoading && <Loader />}


            </div>
            <div className='flex items-center justify-center h-10 w-full mt-5' >
                <Button disabled={isRefetching || (queryN > cuisines?.length)} onClick={getMore} >
                    {(queryN > cuisines?.length && !isRefetching) ? "No more left" : <> Show more <TfiReload /> </>}
                </Button>
            </div>

        </div>
    );
}
export default Foods



