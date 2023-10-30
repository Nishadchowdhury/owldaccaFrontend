import Button from "../Button/Button"
import googleSVG from '/assets/svgs/google.svg'
import { auth } from "../../firebase.config";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useContext, useEffect } from "react";
import { userContext } from "../../App";
import { baseURL } from "../../hooks/envCheck";

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



function PopUpLogin({ loginSuccessful, navigate }) {


    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    const { setUser } = useContext(userContext)

    useEffect(() => {

        setUser(p => ({ ...p, firebaseUser: user?.user || {} }))

        if (user?.user?.email) {
            getUserInDB(user?.user?.email)
        }
    }, [user])



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
        <div className={`w-full flex justify-center gap-7 ${loading && "opacity-40"}`} >
            <Button
                className={'w-1/2 bg-black bg-opacity-20 '}
                disabled={loading}
                onClick={() => signInWithGoogle()}
            >
                <div className='w-full flex items-center justify-evenly h-full' > <img loading="lazy" className='inline' src={googleSVG} alt='googleSVG' width={30} height={0} /> Login with google </div>
            </Button>
        </div>
    )
}
export default PopUpLogin