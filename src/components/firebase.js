import {initializeApp} from "firebase/app"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDLxIRdGbWCugneVy7kt3uGMPAjmzqk-Pc",
    authDomain: "student-detail-d8884.firebaseapp.com",
    projectId: "student-detail-d8884",
    storageBucket: "student-detail-d8884.firebasestorage.app",
    messagingSenderId: "536986539598",
    appId: "1:536986539598:web:d2a3c538aec5eabb8d551f"
};

export const App=initializeApp(firebaseConfig);
export const auth = getAuth(App);

  