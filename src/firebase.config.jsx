import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyAjGzaGxyqHyJ24KcZLMwB2Fp6GWZcf7OE",
    authDomain: "owldaccabd.firebaseapp.com",
    projectId: "owldaccabd",
    storageBucket: "owldaccabd.appspot.com",
    messagingSenderId: "577540615209",
    appId: "1:577540615209:web:0c925cf95f8ee2e6b78038"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
