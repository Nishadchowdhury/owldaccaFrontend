import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../components/Form/Form";
import Input from "../components/Inputs/Input";
import logo from '/assets/imgs/logo.png'
import PopUpLogin from '../components/PopUpLogin/PopUpLogin';
import CreateUser from '../components/createUser/CreateUser';
import { baseURL } from "../hooks/envCheck";
import { auth } from "../firebase.config";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { userContext } from "../App";
import { toast } from "react-toastify";


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
    return result;
}

function Login() {
    const { users, setUser } = useContext(userContext);

    //react firebase hooks
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [email, setEmail] = useState({ value: "", error: "" })

    const [password, setPassword] = useState({ value: "", error: "" })
    const [loginMode, setLoginMode] = useState(true)

    const submitLogin = async (e) => {
        if (email?.value.includes("@") && password.value) {
            e.preventDefault();
            //other login logics
            console.log("login")
            const userOfDB = await getUserInDB(email.value)
            setUser(prev => ({ ...prev, DBUser: userOfDB || {} }))
            signInWithEmailAndPassword(email.value, password.value)
            setUser(prev => ({ ...prev, firebaseUser: user?.user || {} }))
        }
    }

    // other logic

    const loginSuccessful = () => toast.success("Login Successful", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        closeButton: false,
        progress: undefined,
        theme: "dark",
        className: "bg-[#00FFFF] text-black border-2 border-background "
    });

    const loginError = (message) => toast.error(message || "an error happened..!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        className: "bg-red-700"
    });


    const navigate = useNavigate();

    useEffect(() => {
        if (error?.message?.includes("auth/invalid-login-credentials")) {
            loginError("Wrong email or password...!")
        }
    }, [error])


    useEffect(() => {
        if (user?.user?.email) {
            const status = localStorage.getItem("userFromCheckout")
            localStorage.removeItem("userFromCheckout");
            loginSuccessful()
            setTimeout(() => {
                navigate(status ? -1 : '/');
            }, 500);
        }
    }, [user])



    return (
        <div className={`baseGradient text-primary transition-all duration-1000 h-screen relative w-full mx-auto flex flex-col items-center justify-center  `} >

            <div className={`pt-${loginMode ? "20" : "5"}  bg-black bg-opacity-30 z-10 w-full h-full flex items-center flex-col justify-start backdrop-blur-lg `} >
                <Link to={"/"} > <img loading="lazy" src={logo} width={100} height={100} alt="log" /> </Link>

                <h1 className="text-3xl mb-8 mlg:mb-2" >{loginMode ? "Login" : "Sign in"} with</h1>

                <div className='w-full h-full flex items-center justify-center' >
                   
                    <div className='lg:w-1/2 mx-auto flex flex-col items-center justify-center  ' >
                        <div className='mb-1 hidden' >
                            <span className=' inline-block w-20 h-0.5  bg-primary -translate-y-[3px] mx-6  '>
                            </span>
                            <span>OR</span>
                            <span className=' inline-block w-20 h-0.5  bg-primary -translate-y-[3px] mx-6  '>
                            </span>
                        </div>

                        <div className='h-auto msm:w-full mmd:w-4/5 w-3/4 ' >
                            <PopUpLogin navigate={navigate} loginSuccessful={loginSuccessful} />

                            <h1 className='text-center mt-2 cursor-default hidden' > {loginMode ? "New here?" : " Already have an account? "} <strong className='cursor-pointer hover:underline' onClick={() => setLoginMode((prev) => !prev)} >{loginMode ? " Create an account" : " Log in"}</strong>  </h1>
                        </div>


                    </div>
                </div>
            </div>

            <svg className='absolute bottom-0 z-1 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"> <path fill="#0099ff" fillOpacity="1" d="M0,256L60,240C120,224,240,192,360,192C480,192,600,224,720,250.7C840,277,960,299,1080,256C1200,213,1320,107,1380,53.3L1440,0L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
            </svg>
        </div>
    )
}
export default Login