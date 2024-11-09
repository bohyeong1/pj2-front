import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
import { update_user_token } from "../utilData/UtilFunction"

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

// =================================================
// 1시간마다 변경된 토큰값에 따른 쿠키 업데이트 요청//
export async function renew_fresh_token(){
    auth.onAuthStateChanged(async function(user){
        if(user){
            try{
                const token = await user.getIdToken(true)
                const log_data = await update_user_token(token)
                if(log_data && log_data.log_state){
                    console.log('cookie값 업데이트')
                }else{
                    console.log('server에서 cookie설정 중 오류 발생 logic 수정필요ㅕ')
                }
            }catch(e){
                console.log(e)
            }
        }else{
            // 추후 로그아웃 에러처리 로직 들어갈 것.
            console.log('로그아웃')
        }
    })
}

export {auth}