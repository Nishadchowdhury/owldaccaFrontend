import { BiRightArrowCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
function SingleRestaurant({ name, picture, id, }) {



    return (
        <Link to={`/restaurant/${id}`} >

            <div className="group relative hover:scale-105 transition-all overflow-hidden" >
                <div className="bg-white shadow-sm rounded-xl overflow-hidden">
                    <img loading="lazy"
                        className="min-h-full max-h-full min-w-full max-w-full rounded-t-xl group-hover:scale-105 overflow-hidden transition-all group-hover:brightness-50 "
                        alt="Image restaurant"
                        src={picture}
                    />
                </div>
                <div className="singleItemsHomePage" >
                    {name?.length > 18 ? name?.slice(0, 14) + "..." : name}
                    <span className="msm:hidden" > <BiRightArrowCircle className="scale-125" /> </span>
                </div>
            </div>
        </Link>
    )
}
export default SingleRestaurant