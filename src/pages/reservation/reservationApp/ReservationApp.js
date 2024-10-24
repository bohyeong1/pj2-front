import React, { useEffect , useState} from "react";
import { useParams } from "react-router-dom";
import './ReservationApp.scss'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Footer from "../../../utilComponent/menu/footer/Footer";
import Res_con_sec1 from "../res-con/res-con-sec1/Res-con-sec1";
import Res_con_payment from "../res-con/res-con-payment/Res-con-payment";

function ReservationApp(){

    const [homeData, setHomeData] = useState()

    const params = useParams()

    useEffect(()=>{
        setHomeData(JSON.parse(sessionStorage.getItem('res_data')))
    },[])

    return(
        <div className="ReservationApp">
            <Main_menu></Main_menu>
            <div className="ReservationApp-content">
                <div className="ReservationApp-content-sec1">
                    <Res_con_sec1 
                        data={homeData} 
                        param = {params.reservation}/>
                </div>
                <div className="ReservationApp-content-sec2">
                    <Res_con_payment data={homeData}/>
                </div>
            </div>
            <div className="ReservationApp-footer">
                <Footer></Footer>
            </div>
        </div>
    )
}

export default ReservationApp