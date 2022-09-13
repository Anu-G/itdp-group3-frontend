import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const app = initializeApp({
    apiKey: "AIzaSyDFbKZJPBMjrh617ZCZg9ophcwXETTUlq4",
    authDomain: "toktok-dev-f9bce.firebaseapp.com",
    projectId: "toktok-dev-f9bce",
    storageBucket: "toktok-dev-f9bce.appspot.com",
    messagingSenderId: "84267778819",
    appId: "1:84267778819:web:984d0d56524d41da355f36"
})

const storage = getStorage(app)
export default storage