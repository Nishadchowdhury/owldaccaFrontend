import { BiRightArrowCircle } from "react-icons/bi";
import { Link } from "react-router-dom";


function SingleFood({ name, picture, id, isExclusive }) {


    return (
        <Link preventScrollReset={false} to={`/foods/${id}`} >

            <div className={`group relative hover:scale-105 transition-all overflow-hidden `} >
                <div className="  bg-white shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7] overflow-hidden">
                    <img loading="lazy"
                        className="w-full  rounded-t-xl  group-hover:scale-105 overflow-hidden transition-all group-hover:brightness-50 "
                        alt="Image Description"
                        src={picture}
                    />

                </div>

                {isExclusive && <div className="absolute top-4 mlg:top-0 left-0 min-w-10 min-h-6 bg-primary rounded-r-md mlg:rounded-tl-md mlg:rounded-tr-none text-red-600 font-bold text-lg px-2  msm:text-xs mlg:text-sm mxl:text-sm italic">
                    Exclusive
                </div>}

                <div className=" singleItemsHomePage " >
                    {name?.length > 12 ? name?.slice(0, 12) + "..." : name}

                    <span className="msm:hidden" >   <BiRightArrowCircle className="scale-125" /></span>
                </div>
            </div>
        </Link>
    )
}
export default SingleFood