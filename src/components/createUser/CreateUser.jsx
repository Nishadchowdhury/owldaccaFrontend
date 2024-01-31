'use client'
import Form from "../Form/Form"
import { useContext, useEffect, useState } from "react"
import Input from "../Inputs/Input";
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { auth } from "../../firebase.config";
import { baseURL } from "../../hooks/envCheck";
import { userContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

async function createUserInDB(name, email, phone) {

    const userData = {
        name: name,
        email: email.toLowerCase(),
        phone: phone.toLowerCase()
    };

    const rawResponse = await fetch(baseURL + "/createUser", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    const result = await rawResponse.json();

    return result;

}

function CreateUser() {
    const navigate = useNavigate();

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




    let { users, setUser } = useContext(userContext);
    //react firebase hooks functionality
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, errorUpdating] = useUpdateProfile(auth);


    useEffect(() => {

        setUser(prev => ({ ...prev, firebaseUser: user?.user || {} }))

    }, [user,])

    const [name, setName] = useState({ value: "", error: "" });
    const [email, setEmail] = useState({ value: "", error: "" });
    const [phone, setPhone] = useState({ value: "", error: "" });
    const [password, setPassword] = useState({ value: "", error: "" });
    const [confirmPassword, setConfirmPassword] = useState({ value: "", error: "" });

    async function submitSignIn(e) {
        if (password.value !== confirmPassword.value) {
            e.preventDefault();
            return window.alert('passwords are not the same')
        }
        if (email?.value?.includes("@") && password?.value && name?.value && confirmPassword?.value) {
            e.preventDefault();
            const userFromDB = await createUserInDB(name.value, email.value, phone.value)

            setUser(prev => ({ ...prev, DBUser: userFromDB?.user || {} }))
            await createUserWithEmailAndPassword(email.value, password.value);
            await updateProfile({ displayName: `${name.value} * ${phone.value}`, })
        }
    }

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

        <Form onSubmit={submitSignIn} className="flex mx-auto w-3/4 flex-col items-center justify-center " >

            <Input className={"my-3 mlg:m-2 w-full p-3 bg-transparent border "}
                onChange={setName} value={name?.value} placeholder={"Name"} type={"text"} name={"name"} required={true}
            />

            <Input className={"my-3 mlg:m-2 w-full p-3 bg-transparent border "}
                onChange={setPhone} value={phone?.value} placeholder={"Phone"} type={"tel"} name={"phone"} required={true}
            />


            <Input className={"my-3 mlg:m-2 w-full p-3 bg-transparent border "}
                onChange={setEmail} autocomplete={"on"} value={email?.value} placeholder={"Email"} type={"email"} name={"email"} required={true}
            />


            <Input className={"my-3 mlg:m-2 w-full p-3 bg-transparent border "}
                onChange={setPassword} value={password?.value} minLength={6} placeholder={"Password"} type={"password"} name={"password"} required={true} autocomplete={"on"}
            />


            <Input className={"my-3 mlg:m-2 w-full p-3 bg-transparent border "}
                onChange={setConfirmPassword} value={confirmPassword?.value} minLength={6} placeholder={"Confirm password"} type={"password"} name={"password"} required={true} autocomplete={"on"}
            />

            <Input disabled={loading} type={'submit'} placeholder={loading ? "loading..." : "Sign In"} className={`text-white w-full p-3 cursor-pointer border transition-all duration-1000 ${loading && "opacity-50 cursor-not-allowed"}`} />
        </Form>
    )
}
export default CreateUser