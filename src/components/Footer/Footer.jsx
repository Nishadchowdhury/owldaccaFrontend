import facebook from "/assets/svgs/facebook.svg"
import instagram from "/assets/svgs/instagram.svg"
import youtube from "/assets/svgs/youtube.svg"
import messenger from "/assets/svgs/messenger.svg"
import whatsapp from "/assets/svgs/whatsapp.svg"
import link from "/assets/svgs/Link.svg"
import call from "/assets/svgs/call.svg"
import { BsFillTelephoneOutboundFill } from "react-icons/bs"

function Footer() {
    return (

        <div className="bg-slate-900 h-40 " >
            <div className="h-full w-full flex flex-row items-center  justify-around  border-b border-slate-800">
                <div className="flex flex-col msm:hidden">
                    Call us in 8PM - 3AM
                    <a href="tel:+8801604511970" className="flex items-center justify-center">(+880) 1604511970
                        <span className="inline-block border-2 border-slate-700 p-2 ml-3 rounded-md scale-90 hover:scale-110 transition-all" > <BsFillTelephoneOutboundFill /> </span> </a>
                </div>

                <div className="flex flex-col justify-center  msm:scale-75" >
                    <h1 className="text-center pb-1">Connect us on <img loading="lazy" className="inline invert -mt-1" src={link} alt="link" height={20} width={20} /> </h1>
                    <div className="flex flex-row items-center justify-center gap-1">

                        <a href="tel:+8801604511970"   ><img className=" sm:hidden border-primary border rounded-md border-opacity-30 footerSVG" loading="lazy" id="youtube" src={call} alt="youtube" width={43} height={43} /> </a>

                        <a className="footerSVG" href="https://www.facebook.com/owldacca.eat" target="_blank" rel="noreferrer" ><img loading="lazy" id="facebook" src={facebook} alt="facebook" width={40} height={40} /> </a>

                        <a className="footerSVG" href="http://m.me/owldacca.eat" target="_blank" rel="noreferrer"  ><img className="" loading="lazy" id="messenger" src={messenger} alt="messenger" width={40} height={40} /> </a>

                        <a className="footerSVG" href="https://wa.me/+8801604511970?text=Owl%20Dacca%20%7C%20For%20the%20night%20owls.%20Hungry%20Now%3F%20Enjoy%20Authentic%20Puran%20Dhaka%20foods%20from%208PM-3AM." target="_blank" rel="noreferrer"   ><img className="" loading="lazy" id="linkdIn" src={whatsapp} alt="linkdIn" width={40} height={40} /> </a>

                        <a href="" ><img className="opacity-40 cursor-default" loading="lazy" id="instagram" src={instagram} alt="instagram" width={40} height={40} /> </a>

                        <a href="" ><img className="opacity-40 cursor-default" loading="lazy" id="youtube" src={youtube} alt="youtube" width={43} height={43} /> </a>




                    </div>
                </div>

            </div>
            <div className=" bg-inherit text-center p-2 " >
                Copyright © Owldacca 2023. All Rights Reserved.
            </div>
        </div>
    )
}
export default Footer