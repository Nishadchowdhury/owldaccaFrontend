
import { BsArrowRightSquare } from 'react-icons/bs';
import Button from "../Button/Button";
import { useContext, useEffect, useRef, useState, } from "react";
import { FaCartShopping } from "react-icons/fa6"
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { modalContext, userContext } from '../../App';
import { auth } from '../../firebase.config';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import ScrollTop from '../../hooks/useScrollTop';
import { baseURL } from '../../hooks/envCheck';
import { useQuery } from 'react-query';

function Navbar({ showModal, session }) {
    const { users, setUser } = useContext(userContext);
    const [overflowToggle, setOverflowToggle] = useContext(modalContext);


    const buttonRef = useRef(null);
    const pathname = useLocation().pathname;
    const [signOut, loading, error] = useSignOut(auth);
    const [user, loadingState, errorState] = useAuthState(auth);
    const [open, setOpen] = useState(false);
    // const [admin, setAdmin] = useState(false);
    const navigate = useNavigate();

    const admin = user?.email === "nishadhj111@gmail.com"



    const [cart, serCart] = useState([]);
    useEffect(() => {
        typeof window !== "undefined" && serCart(JSON.parse(localStorage.getItem("userCart")) || []);
        setUser(p => ({ ...p, firebaseUser: user }))


        async function getUserInDB(email) {
            const rawResponse = await fetch(baseURL + "/createUser", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: email?.toLowerCase() })
            });
            const result = await rawResponse.json();
            setUser(prev => ({ ...prev, DBUser: result?.user || {} }))
            return result;
        }
        if (user?.email) {
            getUserInDB(user?.email)
        }


    }, [user, loadingState]);


    const { data, loading: adminLoading, refetch, remove } = useQuery("admin", () => fetch(baseURL + "/admins/" + users?.firebaseUser?.email).then(res =>
        res.json()
    ), {
        enabled: false,
    }

    )



    useEffect(() => {
        typeof window !== "undefined" && serCart(JSON.parse(localStorage.getItem("userCart")) || [])
        if (users?.firebaseUser?.email && !adminLoading) {
            refetch()
        }
        // setAdmin(data?.admin)

    }, [users, data])

    // to signOut user
    async function signOutAll() {
        const userLogOut = await signOut();
        if (userLogOut) {
            setUser(p => ({ ...p, DBUser: {}, firebaseUser: {} }))
            remove()
        }
    }


    const hiddenPaths = ['/login',]
    const isShow = () => {
        if (hiddenPaths.includes(pathname)) {
            return false
        } else {
            return true
        }
    }

    function goToLogin() {
        if (open) {
            buttonRef.current.click()
        }
        setTimeout(() => {
            navigate("/login")
        }, 200);

    }

    function navToggle() {
        setOpen(p => !p)
        ScrollTop();
    }

    function navBlur() {
        if (open) {
            buttonRef.current.click()
        }
    }


    const toggleModal = () => {
        showModal(p => !p)
        setOverflowToggle(false)
    }

    return (

        <header className={`flex flex-wrap  backdrop-blur-sm sm:justify-start sm:flex-nowrap z-50 w-full sticky top-0 ${!isShow() && "hidden"} `}>
            <nav onBlur={navBlur} className=" sm:pl-12 w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
                <div className="flex items-center justify-between">
                    <div className='w-full pr-4 flex flex-row justify-between items-center' >
                        <Link preventScrollReset={false} to={'/'}>  <img loading="lazy" src={'/assets/imgs/logo.png'} alt="logo" width={100} height={100} className="w-[65px] " /></Link>


                        {
                            cart?.length ? <button onClick={toggleModal} className='w-fit sm:hidden'  >
                                <span className="relative inline-flex center w-[46px] h-[46px] rounded-full border border-gray-200">
                                    <FaCartShopping />
                                    <span className='absolute bg-primary top-0 right-0 text-black rounded-full min-w-[20px] text-center' >{cart?.length || ""}</span>
                                </span>
                            </button> : null
                        }
                    </div>
                    <div className="sm:hidden">

                        <button ref={buttonRef} onClick={navToggle} type="button" className="hs-collapse-toggle p-2 inline-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800" data-hs-collapse="#navbar-collapse-with-animation" aria-controls="navbar-collapse-with-animation" aria-label="Toggle navigation">
                            <svg className="hs-collapse-open:hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
                            </svg>
                            <svg className="hs-collapse-open:block hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div id="navbar-collapse-with-animation" className="hs-collapse hidden transition-all duration-300 basis-full grow sm:block">


                    <div className="flex msm:flex-row flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:pl-5">


                        {/* <SearchBox /> */}

                        {admin &&
                            <Link to="/admins" >
                                <Button > Go to Admin Page </Button>
                            </Link>
                        }


                        {cart?.length ? <button className='w-fit msm:hidden' onClick={toggleModal} >
                            <span className="relative inline-flex center w-[46px] h-[46px] rounded-full border border-gray-200">
                                <FaCartShopping />
                                <span className='absolute bg-primary top-0 right-0 text-black rounded-full min-w-[20px] text-center' >{cart?.length || ""}</span>
                            </span>
                        </button> : null}





                        {users?.firebaseUser?.email ? <div className="flex items-center gap-4" >
                            {users?.firebaseUser?.photoURL ? <img loading="lazy"
                                width={40}
                                height={40}
                                alt="userName"
                                className="rounded-full"
                                src={users?.firebaseUser?.photoURL} />

                                :

                                <div className="relative inline-block  ">
                                    <svg className="h-full w-full text-gray-300" width="46" height="46" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="0.62854" y="0.359985" width="15" height="15" rx="7.5" fill="white" />
                                        <path d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z" fill="currentColor" />
                                        <path d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z" fill="currentColor" />
                                    </svg>
                                </div>}


                            <p className=" dark:text-white poppins md:block lg:block">{session}</p>

                            <button title='log out' className='hover:opacity-75' onClick={async () => await signOutAll()} >  <BsArrowRightSquare style={{ width: "20px", height: "20px" }} /> </button>

                        </div> : (
                            <>

                                <Button onClick={() => goToLogin()} className={'text-white border border-gray-300 '} text={"Login"} children={"Login"} />


                            </>
                        )}

                    </div>


                </div>
            </nav>
        </header >


    )
}
export default Navbar

