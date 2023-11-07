import { useQuery } from "react-query"
import FoodsAdmin from "../components/Admin/FoodsAdmin"
import RestaurantsAdmin from "../components/Admin/RestaurantsAdmin"
import { baseURL } from "../hooks/envCheck"
import ManageCoupons from "../components/Admin/ManageCoupons"
import { useContext, useEffect, useState } from "react"
import { userContext } from "../App"
import SliderAdmin from "../components/Admin/SliderAdmin"
import { useNavigate } from "react-router-dom"
import DeliveryLocationsAdmin from "../components/Admin/DeliveryLocationsAdmin"
import ManageAdmins from "../components/Admin/ManageAdminsAdmin"



function Admins() {
    const navigate = useNavigate(null);
    const { users } = useContext(userContext);
    const [admin, setAdmin] = useState(false);
    const [show, setShow] = useState(false);
    //getting all restaurant
    const { isLoading, error, data, refetch } = useQuery('allRestaurant', () =>
        fetch(baseURL + "/restaurants/").then(res =>
            res.json()
        ),
        //--------
    )

    useEffect(() => {
        async function checkAdmin() {
            const data = await fetch(baseURL + "/admins/" + users?.firebaseUser?.email).then(res => res.json())
            setAdmin(data?.admin);

            if (!data?.admin) {
                return navigate('/')
            }
            setShow(true);

        }
        checkAdmin();
    }, [users])


    if (!admin || !show) {
        return null;
    }

    return (
        <div className="font-sans min-h-screen px-10 mmd:px-2" >
            <div className=" bg-slate-700 py-3 rounded-xl mt-5 overflow-hidden" >
                <div className="hs-accordion-group px-5">

                    <RestaurantsAdmin data={data} refetch={refetch} adminEmail={users?.firebaseUser?.email} />
                    <FoodsAdmin restaurants={data} refetchRestaurants={refetch} adminEmail={users?.firebaseUser?.email} />
                    <ManageCoupons adminEmail={users?.firebaseUser?.email} />
                    <SliderAdmin adminEmail={users?.firebaseUser?.email} />
                    <DeliveryLocationsAdmin adminEmail={users?.firebaseUser?.email} />
                    <ManageAdmins adminEmail={users?.firebaseUser?.email} />

                </div>


            </div>
        </div>
    )
}
export default Admins