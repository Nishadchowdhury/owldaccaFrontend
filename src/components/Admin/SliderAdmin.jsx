import { TfiLayoutSliderAlt } from "react-icons/tfi";
import { useContext, useRef, useState } from "react";
import Form from "../Form/Form";
import { useEffect } from "react";
import { baseURL } from "../../hooks/envCheck";
import { useQuery } from "react-query";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";
import imageValidation from "../../hooks/imageValidation";
import { toast } from "react-toastify";
import Button from "../Button/Button";

function SliderAdmin({ adminEmail }) {
    const [imagesForSlider, setImagesForSlider] = useState([]);

    const [imgSlider, setImgSlider] = useState({ value: "", error: null });
    const [imgDataSlider, setDataImgSlider] = useState({ sizeError: null, ratioError: null });
    const [imgFileSlider, setImgFileSlider] = useState(null);

    const [loading, setLoading] = useState(false)

    const { isLoading, error, data, refetch } = useQuery('allSlider', () =>
        fetch(baseURL + "/sliders").then(res =>
            res.json()
        ),
        {
            // You can add more options as needed:
            staleTime: (60000 * 60) * 24 * 3,
            refetchOnWindowFocus: false,
        }
    )
    useEffect(() => {
        setImagesForSlider(data?.sliders)
    }, [data])


    const setSliderImg = function (event) {
        imageValidation(event, 120, setImgSlider, setDataImgSlider, setImgFileSlider, "10:3");
    };



    async function addSlider(e) {
        e.preventDefault()

        if (imgDataSlider.ratioError || imgDataSlider.sizeError) {
            window.alert("get rid of all errors, before adding a food item.!")
            return
        }

        if (imgDataSlider.ratioError || imgDataSlider.sizeError || !imgFileSlider) {
            window.alert("get rid of all errors, before adding a food item.!")
            return
        }

        // creating food
        try {
            setLoading(true)
            const formData = new FormData()
            //slider img upload start
            formData.append("image", imgFileSlider);
            const statusOfUploadImageSlider = await fetch(baseURL + '/sliders/' + new Date().getTime(), {
                method: 'POST',
                body: formData,
            })
            const uploadedImgSlider = await statusOfUploadImageSlider.json()
            if (!uploadedImgSlider.status === 201) {
                return window.alert('an error ocurred while uploading the image')
            } else {
                console.log(uploadedImgSlider)
            }

            formData.delete("image", imgFileSlider);
            //slider img uploaded done


            setLoading(false)
            refetch()
        } catch (error) {
            console.log(error)
            return
        }

        // e.target.reset()
        setLoading(false)

    }







    async function deleteSlider(id, status) {
        const ask = window.confirm(`do you want to delete a slider image?`)

        if (ask) {
            setLoading(true)
            const response = await fetch(baseURL + "/slider/" + adminEmail, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({ sliderId: id, status: status })
            })
            const ok = await response.json()

            if (ok.status == 410) {
                console.log(ok)
                refetch()
                setLoading(false)

            }
        }


    }




    return (
        <div className="hs-accordion  bg-slate-800 rounded-xl px-3 mt-5" id="hs-basic-with-title-and-arrow-stretched-heading-two">


            <button className="hs-accordion-toggle  group py-3 inline-flex items-center justify-between gap-x-3 w-full font-semibold  transition  hs-accordion-active:border-b border-slate-600 text-center" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two">
                <h1 className="text-center w-full flex justify-center items-center gap-3" >Manage Sliders <span ><TfiLayoutSliderAlt /></span> </h1>
                <svg className="hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block w-3 h-3 text-gray-600 group-hover:" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <svg className="hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden w-3 h-3 text-gray-600 group-hover:" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>

            <div id="hs-basic-with-title-and-arrow-stretched-collapse-two" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-two">

                <div className="border-b border-slate-600" >
                    <Form onSubmit={addSlider} >

                        <div className="grid md:grid-cols-3 md:gap-6 lg:justify-end lg:items-end">





                            <div className={`w-full flex justify-end mb-2`}  >


                                {imgSlider?.value &&
                                    <div className={`w-96 mmd:w-full flex flex-col relative ${imgDataSlider?.ratioError && "bg-red-600"}`}  >
                                        < img className={`imgStrictSize ${imgDataSlider?.ratioError && "opacity-50"}`} src={imgSlider?.value} alt="" />
                                        {imgDataSlider?.ratioError && <span className="absolute py-5 px-2 bg-red-600 top-2/4  inline-block w-full" >{imgDataSlider.ratioError + "(1200×360 pixels)"} <br /> {imgDataSlider.sizeError}</span>}
                                    </div>
                                }
                            </div>





                            <div className="relative z-0 w-full mb-6 group mt-3">



                                <input
                                    onChange={(e) => setSliderImg(e)}
                                    type="file" name="sliderImg" id="floating_first_name" className="block py-1.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-primary peer file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                    placeholder=" "
                                    accept="image/x-png,image/jpeg,image/jpg"
                                />
                            </div>

                            <div className="relative z-0 w-full mb-6 group mmd:px-3">
                                <Button className={`bg-slate-700 border rounded-md w-full`} type={"submit"} >Add slider </Button>
                            </div>


                        </div >

                    </Form>
                </div>

                <div className="w-full baseGradient90 h-10 rounded-full flex items-center justify-center mt-3" >
                    <p className="text-center text-white" >This site have total {imagesForSlider?.length} sliders.</p>
                </div>

                <div className="flex flex-col">
                    <div className="-m-1.5 overflow-x-auto  ">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200 text-primary ">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="mmd:px-1 mmd:py-1  px-6 py-3 text-left text-xs font-medium  uppercase">Picture</th>


                                            <th scope="col" className="mmd:px-1 mmd:py-1  px-6 py-3 text-right text-xs font-medium  uppercase">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {
                                            imagesForSlider && imagesForSlider.map(({ src, active }) => (
                                                <tr key={src} className="">
                                                    <td className="mmd:px-1 mmd:py-1  px-6 w-full md:w-[300px] py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                                                        <img loading="lazy" className="imgStrictSize" src={src} alt="" />
                                                    </td>



                                                    <td className="mmd:px-1 mmd:py-1  px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button disabled={loading} onClick={async () => deleteSlider(src, active)} className={`text-blue-500 hover:text-blue-200 rounded-md border border-slate-500 hover:border-slate-400 px-3 py-2 ${loading && "opacity-40"}`} href="#">Delete</button>
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
export default SliderAdmin;