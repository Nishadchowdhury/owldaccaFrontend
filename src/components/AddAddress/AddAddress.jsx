
import Input from "../Inputs/Input"
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import { FaRegAddressCard } from "react-icons/fa6";
import Loader from "../Loaders/Loader";
import { baseURL } from "../../hooks/envCheck";



function AddAddress({ visible, showModal }) {

    function addressCheck() {
        const userPhone = JSON.parse(localStorage.getItem("userAddress"))?.phone
        if (!userPhone) {
            localStorage.setItem("userAddress", JSON.stringify({}))
        } else {
            showModal(false)
        }
    }

    const [text, setText] = useState({ value: '' });
    const [locationObj, setLocationObj] = useState({});
    const [addressesOfServer, setAddressesOfServer] = useState([]);
    const [addressesOfServerObjs, setAddressesOfServerObjs] = useState([]);
    const [addresses, setAddresses] = useState([...addressesOfServer]);
    const [loading, setLoading] = useState(false);

    // writable address by users
    const [name, setName] = useState({ value: "" });
    const [phone, setPhone] = useState({ value: "" });
    const [homeAndStreetAddress, setHomeAndStreetAddress] = useState({ value: "" });
    const [apartmentNo, setApartmentNo] = useState({ value: "" });
    const [showList, setShowList] = useState(false)


    //filter on each change of input text
    useEffect(() => {

        setAddresses(addressesOfServer.filter((address) =>
            address.toLowerCase().includes(text?.value?.toLowerCase() || "")
        ));
        if (text?.value) {

            const withSpace = addressesOfServerObjs.find(address => address.locationId === text.value.replace(/\s+/g, '_') && text.value.includes(' '))
            const withOutSpace = addressesOfServerObjs.find(address => address.locationId == text.value)

            // console.log(withSpace)
            if (withSpace) {
                setLocationObj(withSpace)
            } else if (withOutSpace) {
                setLocationObj(withOutSpace)
            }
        } else {
            setLocationObj({})
        }
    }, [text, showList])



    useEffect(() => {
        addressCheck();


        const getAddress = async () => {
            const addressListObject = await fetch(baseURL + "/deliveryLocations").then((res) => res.json());
            let list = [];
            setAddressesOfServerObjs(addressListObject?.locationList)
            addressListObject?.locationList.forEach((address) => {
                const addressName = address.locationId;

                if (addressName.indexOf("_") !== -1) {
                    const name = addressName.replace(/_/g, ' ');
                    list.push(name);
                } else {
                    list.push(addressName);
                }
            })
            setAddressesOfServer(list)
            setAddresses(list)
        }
        if (showList) {
            getAddress();
        }

    }, [showList])



    function setAnAddress(address) {
        setText({ value: address });
        setShowList(false)
    }

    function resetAddress() {
        setText({ value: "" });
        setShowList(false)
    }

    function AddAddress() {
        setLoading(true)


        if (!locationObj?.locationData?.fee) {
            return
        }


        localStorage.setItem("userAddressFee", JSON.stringify(locationObj))

        localStorage.setItem("userAddress", JSON.stringify({
            area: text.value,
            buyerName: name.value,
            phone: phone.value,
            homeAndStreetAddress: homeAndStreetAddress.value,
            apartmentNo: apartmentNo.value
        }))
        setTimeout(() => {
            setLoading(false)
            showModal(p => !p)
        }, 1500);
    }

    if (!visible) return null;
    const addressElements = <>
        {
            addresses.map(address => (
                <Button key={address} onClick={() => setAnAddress(address)} className="border h-10 w-full hover:rounded-md hover:scale-110 " >
                    {address}
                </Button>
            ))
        }
    </>

    return (
        <div
            className=" fixed inset-0 z-[300] text-primary  bg-background bg-opacity-75 backdrop-blur-md flex flex-col justify-center items-center" >

            <form onSubmit={AddAddress}>
                <div
                    className="msm:w-96 mxs:w-80 w-[500px] h-auto rounded-md overflow-hidden  z-[201]" >
                    <div className="relative bg-background bg-opacity-50 p-2  ">

                        {<div className="w-full text-primary  ml-2 " > {text?.value && "You have selected :-"}</div>}

                        <div className=" h-auto flex flex-row items-center justify-center py-1 px-2 rounded-md overflow-hidden border border-gray-600">
                            <Input
                                required={true}
                                onChange={setText}
                                value={text.value} placeholder={"Select your Area"} type={"text"}
                                onFocus={() => setShowList(true)}
                                autocomplate={"off"}
                                className={`w-full h-10 active:border-none active:outline-none focus:border-none focus:outline-none placeholder-primary  `} />
                            <span onClick={resetAddress} className=" w-7 h-7 cursor-pointer " >X</span>
                        </div>

                        {
                            showList &&
                            <div className="slimScrollBar h-fit max-h-96 overflow-y-scroll overflow-x-hidden " >
                                {addressElements}
                                {addresses?.length === 0 && <div className="w-full h-10 text-red-600 " > No address found..! </div>}
                            </div>
                        }

                        {!showList && <>
                            <div className="w-full text-primary mt-5 text-sm mb-1 ml-2" > Type your full name </div>
                            <div className="h-auto  flex flex-row items-center justify-center py-1 px-2 rounded-md overflow-hidden border border-gray-600">
                                <Input
                                    required={true}
                                    name={"funnName"} onChange={setName} placeholder={"Name"} value={name.value} type={"text"}
                                    className={`w-full h-10 active:border-none active:outline-none focus:border-none focus:outline-none placeholder-primary  `} />
                            </div>

                            <div className="w-full text-primary mt-5 text-sm mb-1 ml-2" > Phone number</div>
                            <div className="h-auto  flex flex-row items-center justify-center py-1 px-2 rounded-md overflow-hidden border border-gray-600">
                                <Input
                                    required={true}
                                    name={"phone"} onChange={setPhone} value={phone.value} placeholder={"01XXXXXXXXX"} type={"text"}
                                    className={`w-full h-10 active:border-none active:outline-none focus:border-none focus:outline-none placeholder-primary  `} />
                            </div>

                            <div className="w-full text-primary mt-5 text-sm mb-1 ml-2" > Type your details address </div>
                            <div className="h-auto  flex flex-row items-center justify-center py-1 px-2 rounded-md overflow-hidden border border-gray-600">
                                <Input
                                    required={true}
                                    name={"address"} onChange={setHomeAndStreetAddress} value={homeAndStreetAddress.value} placeholder={"Ex. House 2, Road 2, Block 2, Sector 2"} type={"text"}
                                    className={`w-full h-10 active:border-none active:outline-none focus:border-none focus:outline-none placeholder-primary  `} />
                            </div>

                            <div className="w-full text-primary mt-5 text-sm mb-1 ml-2" > {"Apartment Name/Number (optional)"} </div>
                            <div className="h-auto  flex flex-row items-center justify-center py-1 px-2 rounded-md overflow-hidden border border-gray-600">
                                <Input
                                    name={"apartmentName"} onChange={setApartmentNo} value={apartmentNo.value} placeholder={"Ex. 3B"} type={"text"}
                                    className={`w-full h-10 active:border-none active:outline-none focus:border-none focus:outline-none placeholder-primary  `} />
                            </div>


                        </>
                        }



                    </div>
                </div>

                <div className=" mt-10 flex items-center justify-center " >
                    <Button type={"submit"} className={"rounded-full border border-gray-800"} >
                        <span className="scale-125 " > {!loading ? <span className="flex gap-3 items-center"> <span className="text-xs" > Add Address </span> <FaRegAddressCard /></span>

                            : <Loader />}  </span>  </Button>
                </div>

            </form>

        </div>
    )
}
export default AddAddress

