import React, {useEffect,useState} from "react";
import './detail_info.scss'
import { useParams } from "react-router-dom";
import Main_menu from "../../../../utilComponent/menu/main-menu/main-menu";
import Original_img from "../../../../picture/original_img/original_img";
import Footer from "../../../../utilComponent/menu/footer/Footer";
import Det_sec1 from "../sections/det_sec1/det_sec1";
import Sec1_payment from "../sections/det_sec1/sec1_payment/sec1_payment";
import Det_sec2 from "../sections/det_sec2/det_sec2";
import Det_sec3 from "../sections/det_sec3/det_sec3";
import Det_sec4 from "../sections/det_sec4/det_sec4";
import Det_sec5 from "../sections/det_sec5/det_sec5";
import Det_sec6 from "../sections/det_sec6/det_sec6";
import Img_dis_modal from "../../../../utilComponent/modal/img_dis_modal/img_dis_modal";
import connectData from "../../../../utilData/UtilFunction";
import default_data from "../../../../utilData/defaultData";
import Loading from '../../../../utilComponent/material/loading/loading'
import useDetDetappStyle from "../../hook_store/style_hooks/det_detapp_style";

function Detail_info(){
    let params = useParams()

    ///state
    const [sellect_data, setSellect_data] = useState() ///숙소, User, 평가 data
    const [sub_img, setSub_img] = useState(null)
    const [loading , setLoading] = useState(true)   
    
    ////////////////////////////////////
    ////////////// hooks ///////////////
    ////////////////////////////////////
    // business

    // style
    const {img_modal_toggle} = useDetDetappStyle()

    useEffect(()=>{
        ////////////숙소 한개 데이터 패치
        const houseParam = params.house
        connectData(`${default_data.d_base_url}/api/common/sellect`, 'POST', {_id:houseParam})
        .then((result)=>{
            setSellect_data(result)
            const copied_img = result.accomodations.sub_img
            const limit_copied_img = copied_img.slice(0,4)
            setSub_img(limit_copied_img)

        })
        .catch((e) => {
            console.log(e)
        })
        .finally(() => {
            setLoading(false)
        })

    },[])

    return(
        loading ? <Loading></Loading> : 
        <div className="detail-info-app__container">
            <Main_menu></Main_menu>
            <div className="detail-info-app__img">
                <div className="detail-info-app_img-box1" onClick={img_modal_toggle}>
                    <Original_img url={sellect_data?.accomodations.main_img} hover={true}></Original_img>
                </div>
                <div className="detail-info-app_img-box2">
                    {sub_img?.map((el, id)=>{
                        return(
                            <div className="detail-info-app_img-item" key={id} onClick={img_modal_toggle}>
                                <Original_img url={el} hover={true}></Original_img>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* 요약 숙소 정보 섹션 */}
            <div className="detail-info-app__sec1">
                <div className="det-info-con1">
                    <Det_sec1 data={sellect_data?.accomodations} user={sellect_data?.seller} evaluations={sellect_data?.evaluations}></Det_sec1>
                </div>
                <div className="det-info-con2">
                    <Sec1_payment data={sellect_data?.accomodations} params={params.house}></Sec1_payment>
                </div>
            </div>
            {/* 지도 */}
            <div className="detail-info-app__sec2">
                <Det_sec2 data={sellect_data?.accomodations}></Det_sec2>
            </div>

            {/* 숙소 평점 */}
            <div className="detail-info-app__sec3">
                <Det_sec3 data={sellect_data?.evaluations} avgdata={sellect_data?.aggreEvalu}></Det_sec3>
            </div>


            {/* 댓글목록 페이지네이션으로 구성하기 */}
            <div className="detail-info-app__sec4">
                <Det_sec4 data={sellect_data?.evaluations}></Det_sec4>
            </div>

            {/* 호스트 정보 */}
            <div className="detail-info-app__sec5">
                <Det_sec5 data={sellect_data?.seller} homeData = {sellect_data?.accomodations}></Det_sec5>
            </div>

            {/* 이용규칙 */}
            <div className="detail-info-app__sec6">
                <Det_sec6 data={sellect_data?.accomodations}></Det_sec6>
            </div>

            <div className="detail-info-app__footer">
                <Footer></Footer>
            </div>

            {/* 모달 */}
            <Img_dis_modal data={sellect_data?.accomodations} imgs = {sellect_data ? [sellect_data.accomodations.main_img, ...sellect_data.accomodations.sub_img] : null} 
            img_modal_toggle={img_modal_toggle}></Img_dis_modal>
        </div>
    )
}

export default Detail_info 