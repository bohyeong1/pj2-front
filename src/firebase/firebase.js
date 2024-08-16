import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebase_config = {
    apiKey: "AIzaSyC6xL_7Q3NfnzK-YtPOaRZLs04ceK439Po",
    authDomain: "sukbak-project.firebaseapp.com",
    projectId: "sukbak-project",
    storageBucket: "sukbak-project.appspot.com",
    messagingSenderId: "125785874086",
    appId: "1:125785874086:web:216268298e91d67fb0de67",
    measurementId: "G-JS8RFZDPCJ"
}

const app = initializeApp(firebase_config)
const auth = getAuth(app)

export {auth}