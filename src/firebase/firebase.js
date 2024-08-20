import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebase_config = {
    apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: "sukbak-project.firebaseapp.com",
    projectId: "sukbak-project",
    storageBucket: "sukbak-project.appspot.com",
    messagingSenderId: "125785874086",
    appId: "1:125785874086:web:216268298e91d67fb0de67",
    measurementId: "G-JS8RFZDPCJ"
}

let app
if(!getApps().length){
    app = initializeApp(firebase_config)
}else{
    app = getApps()[0]
}
const auth = getAuth(app)

export {auth}