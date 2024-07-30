import React, {useEffect, useState} from "react";
import './Acc_manage.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import { useNavigate } from "react-router-dom";
import Footer from "../../../menu/footer/Footer";
import default_data from "../../../utilData/defaultData";
import connectData from "../../../utilData/UtilFunction";

function Acc_manage(){
    //////////숙소 데이터 state
    const [homeState, setHomeState] = useState(null)

    const userData = JSON.parse(sessionStorage.getItem('userData')) ///유저데이터
    const navigate = useNavigate()

    async function getData(){
        const homeData = await connectData(`${default_data.d_base_url}/api/common/host`, 'POST',{
            sellerid : userData._id
        })
        if(homeData){
            setHomeState(homeData.accomodations)
        }else{
            alert('데이터를 받아오는데 실패하셨습니다')
        }
    }

    useEffect(()=>{
        getData()
    },[])

    // console.log(homeState)

    return(
        <div className="Acc_manage-container">
            <Main_menu></Main_menu>
            <div className="Acc_manage-content">
                <div className="Acc_manage-sec1">
                    <div className="Acc_manage-s1-title">숙소</div>
                    <div className="Acc_manage-s1-addBtn" onClick={()=>{navigate('/Acc_regist/Acc_regist_start')}}>
                        <img src={default_data.d_imgs.plus}></img>
                    </div>
                </div>
                <div className="Acc_manage-sec2">
                    <div className="Acc_manage-s2-title">
                        <div className="Acc_manage-s2-t-b1">숙소 리스트</div>
                        <div className="Acc_manage-s2-t-b2">위치</div>
                        <div className="Acc_manage-s2-t-b3">상태</div>
                    </div>
                </div>
                <div className="Acc_manage-s2-box">
                    {homeState ? homeState.map((el)=>{
                        return(
                            <div className="Acc_manage-s2-b-c">
                                <div className="Acc_manage-s2-b-c-b1">
                                    <img className="Acc_manage-s2-b-c-b1-img" src={el.main_img}></img>
                                    <span style={{fontWeight:'bold'}}>{el.title}</span>
                                </div>
                                <div className="Acc_manage-s2-b-c-b2">{el.search_adress}</div>
                                <div className="Acc_manage-s2-b-c-b3" style={{color:`${el.sellState ? 'black' : 'red'}`}}>{el.sellState ? '등록 완료' : '등록중'}</div>
                            </div>
                        )
                    }) : '등록된 숙소가 없습니다'}
                </div>
            </div>
            <div className="Acc_manage-footer">
                <Footer></Footer>
            </div>
        </div>
    )
}

export default Acc_manage