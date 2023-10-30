import SingleFood from './SingleFood'
import { baseURL } from "../../hooks/envCheck";
import { useQuery } from "react-query";
import Loader from '../Loaders/Loader';
import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import { TfiReload } from 'react-icons/tfi';

function Foods() {
    const [fetch_N, setFetch_N] = useState(18)

    const { isLoading, error, data, refetch, isRefetching } = useQuery('cuisinesAll', () =>
        fetch(baseURL + "/cuisines/" + (fetch_N).toString(),).then(res =>
            res.json()
        ),
        {
            staleTime: (60000 * 60) * 24,
            refetchOnWindowFocus: false,
        }
    )
    const cuisines = data?.cuisineList || [];

    useEffect(() => {
        refetch()
    }, [fetch_N])


    console.log(isLoading)

    return (
        <div className="  mt-7 "  >
            <h1 className="homePageText"> {`All Cuisines`} </h1>

            <div className="HomePageContainer">

                <div className='HomeItemsGridContainer ' >

                    {
                        cuisines && cuisines.map(({ cuisineId, cuisineData }) => (

                            <SingleFood isExclusive={cuisineData.isExclusive} picture={cuisineData.cuisineImg} name={cuisineData.name} id={cuisineId} key={cuisineId} />

                        ))

                    }

                    {isRefetching && <Loader />}

                </div>

                {
                    isLoading && <Loader />

                }


            </div>
            <div className='flex items-center justify-center h-10 w-full mt-5' >
                <Button disabled={isRefetching || (fetch_N > cuisines?.length)} onClick={() => setFetch_N(p => +p + 18)} >
                    {(fetch_N > cuisines?.length && !isRefetching) ? "No more left" : <> Show more <TfiReload /> </>}
                </Button>
            </div>

        </div>
    );
}
export default Foods



