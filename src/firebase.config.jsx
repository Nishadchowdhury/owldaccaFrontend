import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD16SkHpCTH4PtOyGDq_Q64aAL2ySdw50A",
    authDomain: "restaurants-app-shuvo.firebaseapp.com",
    projectId: "restaurants-app-shuvo",
    storageBucket: "restaurants-app-shuvo.firebasestorage.app",
    messagingSenderId: "849570856310",
    appId: "1:849570856310:web:a6a2d65f31708236da8e57"
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)