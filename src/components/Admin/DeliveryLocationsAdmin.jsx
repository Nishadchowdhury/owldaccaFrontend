import { ImLocation, } from "react-icons/im";
import { useState } from "react";
import Form from "../Form/Form";
import { useEffect } from "react";
import { baseURL } from "../../hooks/envCheck";
import { useQuery } from "react-query";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";
import imageValidation from "../../hooks/imageValidation";
import { toast } from "react-toastify";
import Button from "../Button/Button";
import { FaLocationDot } from "react-icons/fa6";

function DeliveryLocationsAdmin({ adminEmail }) {

    const [locationList, setLocationList] = useState([])
    const [loading, setLoading] = useState(false)
    const [locationName, setLocationName] = useState('')
    const [locationFee, setLocationFee] = useState('')


    const { isLoading, data, refetch } = useQuery('getAllDeliveryLocations', () =>
        fetch(baseURL + "/deliveryLocations").then(res =>
            res.json()
        ),
        {
            // You can add more options as needed:
            staleTime: (60000 * 60) * 24 * 3,
            refetchOnWindowFocus: false,
        }
    )


    useEffect(() => {
        setLocationList(data?.locationList || [])
    }, [data])


    async function addLocation(e) {
        e.preventDefault()
        setLoading(true)
        const body = {
            adminId: adminEmail,
            id: locationName.replace(/ /g, '_'),
            fee: locationFee,
        }
        const response = await fetch(baseURL + '/location', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify(body)
        })
        console.log(await response.json())
        setLoading(false)
        refetch()
    }

    // async function updateLocation(id, status) {

    // }

    async function deleteLocation(id) {
        const adminId = adminEmail;

        const ask = window.confirm(`do you want to delete the location [_${id.replace(/_/g, ' ')}_] ?`)

        if (!ask) return

        setLoading(true)
        const response = await fetch(baseURL + "/location", {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8',
            },
            body: JSON.stringify({ adminId: adminId, id: id })
        })

        console.log(await response.json())

        setLoading(false)
        refetch()

    }




    return (
        <div className="hs-accordion  bg-slate-800 rounded-xl px-3 mt-5" id="hs-basic-with-title-and-arrow-stretched-heading-two">


            <button className="hs-accordion-toggle  group py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold  transition  hs-accordion-active:border-b border-slate-600 text-center" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two">
                <h1 className="text-center w-full flex justify-center items-center gap-3 " >Manage Locations <span className="text-primary" ><ImLocation /></span> </h1>
                <svg className="hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block w-3 h-3 text-gray-600 group-hover:" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <svg className="hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden w-3 h-3 text-gray-600 group-hover:" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>

            <div id="hs-basic-with-title-and-arrow-stretched-collapse-two" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-two">

                <div className="border-b border-slate-600" >
                    <Form onSubmit={addLocation} >

                        <div className="grid md:grid-cols-3 md:gap-6 mt-3">

                            <div className="relative z-0 w-full mb-6 group mmd:px-3">


                                <div className="relative z-0 w-full mb-6 group " >

                                    <input type="text" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required
                                        onChange={(e) => setLocationName(e.target.value)}
                                        min={0}
                                        value={locationName}
                                    />


                                    <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:text-base   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Location Name</label>


                                </div>

                            </div>

                            <div className="relative z-0 w-full mb-6 group mmd:px-3">


                                <div className="relative z-0 w-full mb-6 group " >

                                    <input type="number" name="floating_last_name" id="floating_last_name" className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer" placeholder=" " required
                                        onChange={(e) => setLocationFee(e.target.value)}
                                        min={0}
                                        value={locationFee}
                                    />


                                    <label htmlFor="floating_last_name" className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-primary peer-focus:text-base   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Delivery Fee</label>


                                </div>

                            </div>

                            <div className="relative z-0 w-full mb-6 group mmd:px-3">
                                <Button className={`bg-slate-700 border rounded-md w-full `} type={"submit"} >Add Location </Button>
                            </div>


                        </div >

                    </Form>
                </div>

                <div className="w-full baseGradient90 h-10 rounded-full flex items-center justify-center mt-3" >
                    <p className="text-center text-white" >This site have total {locationList?.length} locations to delivery.</p>
                </div>

                <div className="flex flex-col">
                    <div className="-m-1.5 overflow-x-auto  ">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200 text-primary ">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="mmd:px-1 mmd:py-1  px-6 py-3 text-left text-xs font-medium  uppercase">Location</th>

                                            <th scope="col" className="mmd:px-1 mmd:py-1  px-6 py-3 text-left text-xs font-medium  uppercase">Fee</th>


                                            <th scope="col" className="mmd:px-1 mmd:py-1  px-6 py-3 text-right text-xs font-medium  uppercase">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {
                                            locationList && locationList.map(({ locationId, locationData: { fee } }) => (
                                                <tr key={locationId} className="">
                                                    <td className="mmd:px-1 mmd:py-1  px-6 max-w-[20px] py-4 whitespace-nowrap text-sm font-medium  ">
                                                        <span>{locationId.replace(/_/g, ' ')}</span>
                                                    </td>

                                                    <td className="mmd:px-1 mmd:py-1  px-6 max-w-[20px] py-4 whitespace-nowrap text-sm font-medium  ">
                                                        <span>{fee}</span>
                                                    </td>




                                                    <td className="mmd:px-1 mmd:py-1  px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button disabled={loading} onClick={async () => deleteLocation(locationId)} className={`text-blue-500  rounded-md border border-slate-500 hover:border-slate-400 px-3 py-2 ${loading && "opacity-40"}`} href="#">Delete</button>
                                                    </td>


                                                </tr>
                                            ))

                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>


            </div >
        </div >
    )
}
export default DeliveryLocationsAdmin;