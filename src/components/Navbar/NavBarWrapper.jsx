import { useEffect, useState } from "react"
import CartModal from "../Modals/CartModal"
import Navbar from "./Navbar"
import AddAddress from "../AddAddress/AddAddress"
import { useLocation } from "react-router-dom";

function NavBarWrapper() {

  const pathname = useLocation().pathname;

  const [modal, setModal] = useState(false)
  const [modalAddress, setModalAddress] = useState(false)

  useEffect(() => {
    if (pathname.includes("/checkout") && !JSON.parse(localStorage.getItem("userAddress"))?.phone) {
      setModalAddress(true)
    }
  }, [pathname])



  return (
    <>
      <Navbar showModal={setModal} session={!true} />
      <CartModal visible={modal} showModal={setModal} />
      <AddAddress session={true} visible={modalAddress} showModal={setModalAddress} />
    </>
  )
}
export default NavBarWrapper