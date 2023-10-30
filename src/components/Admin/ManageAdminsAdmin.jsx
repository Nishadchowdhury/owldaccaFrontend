import { RiAdminLine, } from "react-icons/ri";
import { useState } from "react";
import Form from "../Form/Form";
import { useEffect } from "react";
import { baseURL } from "../../hooks/envCheck";
import { useQuery } from "react-query";
import Button from "../Button/Button";

function ManageAdmins({ adminEmail }) {

    const [userList, setUserList] = useState([]);
    const [adminList, setAdminList] = useState([]);
    const [loading, setLoading] = useState(false);

    //pages 
    const [pageName, setPageName] = useState(null);


    const { isLoading, data, refetch } = useQuery('getAllUsers', () =>
        fetch(baseURL + "/usersAll/" + adminEmail).then(res =>
            res.json()
        ),
        {
            // You can add more options as needed:
            staleTime: (60000 * 60) * 24,
            refetchOnWindowFocus: false,
        }
    )
    const { isLoadingAdmin, data: dataAdmin, refetch: refetchAdmin } = useQuery('getAllAdmins', () =>
        fetch(baseURL + "/adminsAll/" + adminEmail).then(res =>
            res.json()
        ),
        {
            // You can add more options as needed:
            staleTime: (60000 * 60) * 24,
            refetchOnWindowFocus: false,
        }
    )

    const adminsList = dataAdmin?.admins?.map((admin) => {
        return admin.usersId

    })
    useEffect(() => {

        setUserList(data?.users)
        setAdminList(dataAdmin?.admins)
    }, [dataAdmin, data])

    async function promote(id) {
        const ask = window.confirm(`Proceed to make [_${id}_] an admin.`)
        if (!ask) return
        setLoading(true)

        const response = await fetch(baseURL + '/makeAdmin/' + adminEmail, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({ userId: id })
        })
        const res = await response.json()
        refetch()
        refetchAdmin()
        setLoading(false)
        window.alert(res?.message)
    }

    async function demote(id) {
        const ask = window.confirm(`Proceed to demote [_${id}_] from an admin to user.`)
        if (!ask) return
        setLoading(true)
        const response = await fetch(baseURL + '/makeAdmin/' + adminEmail, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "DELETE",
            body: JSON.stringify({ userId: id })
        })
        const res = await response.json()
        refetch()
        refetchAdmin()
        setLoading(false)
        window.alert(res?.message)
    }

    return (
        <div className="hs-accordion  bg-slate-800 rounded-xl px-3 mt-5" id="hs-basic-with-title-and-arrow-stretched-heading-two">


            <button className="hs-accordion-toggle  group py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold  transition  hs-accordion-active:border-b border-slate-600 text-center" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two">
                <h1 className="text-center w-full flex justify-center items-center gap-3 " >Manage Admins <span className="text-primary "><RiAdminLine /></span> </h1>
                <svg className="hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block w-3 h-3 text-gray-600 group-hover:" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <svg className="hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden w-3 h-3 text-gray-600 group-hover:" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>

            <div id="hs-basic-with-title-and-arrow-stretched-collapse-two" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-two">



                <div className="flex w-full justify-center ">
                    <div className="  rounded-lg transition p-1   flex justify-center w-full">
                        <nav className="flex space-x-2 w-full justify-center" aria-label="Tabs" role="tablist">
                            <button onClick={() => setPageName("promote")} type="button" className=" hs-tab-active:text-white hs-tab-active  py-3 px-4 inline-flex items-center gap-2 bg-transparent text-sm border border-slate-400  font-medium rounded-md hover:hover:text-blue-600 " id="segment-item-1" data-hs-tab="#segment-1" aria-controls="segment-1" role="tab">
                                Promote
                            </button>

                            <button onClick={() => setPageName("demote")} type="button" className=" hs-tab-active:text-white hs-tab-active  py-3 px-4 inline-flex items-center gap-2 bg-transparent text-sm border border-slate-400  font-medium rounded-md hover:hover:text-blue-600 " id="segment-item-2" data-hs-tab="#segment-2" aria-controls="segment-2" role="tab">
                                Demote
                            </button>
                        </nav>
                    </div>
                </div>


                {pageName === 'promote' &&
                    <div  >
                        <div className="w-full baseGradient90 h-10 rounded-full flex items-center justify-center mt-3" >
                            <p className="text-center text-white" >This site have total {userList?.length - adminList?.length} promotable users.</p>
                        </div>

                        <div className="flex flex-col">
                            <div className="-m-1.5 overflow-x-auto  ">
                                <div className="p-1.5 min-w-full inline-block align-middle">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full divide-y divide-gray-200 text-primary ">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="mmd:px-1 mmd:py-1  px-6 py-3 text-left text-xs font-medium  uppercase">Email</th>
                                                    <th scope="col" className="mmd:px-1 mmd:py-1  px-6 py-3 text-right text-xs font-medium  uppercase">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                                {
                                                    userList && userList?.map(({ usersId, userData: { phone, name, email } }) => (
                                                        <tr key={usersId} className="">
                                                            <td className="mmd:px-1 mmd:py-1  px-6 max-w-[20px] py-4 whitespace-nowrap text-sm font-medium  ">
                                                                <span>{email}</span>
                                                            </td>

                                                            <td className="mmd:px-1 mmd:py-1  px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                <button disabled={loading || adminsList.includes(usersId)} onClick={async () => promote(usersId)} className={`text-green-500 hover:text-blue-200 rounded-md border border-slate-500 hover:border-slate-400 px-3 py-2 ${(loading || adminsList.includes(usersId)) && "opacity-40"}`} href="#">Promote</button>
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
                    </div>
                }

                {pageName === "demote" &&
                    <div  >
                        <div className="w-full baseGradient90 h-10 rounded-full flex items-center justify-center mt-3" >
                            <p className="text-center text-white" >This site have total {adminList?.length} admins.</p>
                        </div>

                        <div className="flex flex-col">
                            <div className="-m-1.5 overflow-x-auto  ">
                                <div className="p-1.5 min-w-full inline-block align-middle">
                                    <div className="overflow-hidden">
                                        <table className="min-w-full divide-y divide-gray-200 text-primary ">
                                            <thead>
                                                <tr>
                                                    <th scope="col" className="mmd:px-1 mmd:py-1  px-6 py-3 text-left text-xs font-medium  uppercase">Email</th>


                                                    <th scope="col" className="mmd:px-1 mmd:py-1  px-6 py-3 text-right text-xs font-medium  uppercase">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                                {
                                                    adminList && adminList?.map(({ usersId, userData: { phone, name, email } }) => (
                                                        <tr key={usersId} className="">
                                                            <td className="mmd:px-1 mmd:py-1  px-6 max-w-[20px] py-4 whitespace-nowrap text-sm font-medium  ">
                                                                <span>{usersId}</span>
                                                            </td>

                                                            <td className="mmd:px-1 mmd:py-1  px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                                <button disabled={loading} onClick={async () => demote(usersId)} className={`text-red-500 hover:text-blue-200 rounded-md border border-slate-500 hover:border-slate-400 px-3 py-2 ${loading && "opacity-40"}`} href="#">Demote</button>
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
                    </div>
                }

            </div >
        </div >
    )
}
export default ManageAdmins;