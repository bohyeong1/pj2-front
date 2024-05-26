import React,{useEffect} from "react";
import './Acc_regist_lv5.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import Host_footer from "../../../menu/host-footer/Host-footer";


function Acc_regist_lv5(){

    useEffect(()=>{
        const adressApi = async()=>{
            const res = await fetch('//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js')
            const result = await res.json()
            return result
        }
        console.log(adressApi)
    },[])

    return(
        <div className="Acc_regist_lv5-container">
            <Main_menu></Main_menu>

            <div className="Acc_regist_lv5_content">

            </div>

            <div className="Acc_regist_lv5-footer">
                <Host_footer></Host_footer>
            </div>


        </div>
    )
}

export default Acc_regist_lv5