import React, {useRef,useState, useEffect, useContext} from "react";
import './Acc_regist_lv6.scss'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Host_footer from "../../../utilComponent/menu/host-footer/Host-footer";
import { ImgContext } from "../../../context/img_context/config/img_context";
import ImgRegistModal from "../../../utilComponent/modal/img_regist_modal/img_regist_modal";
import useAccRegistLv6Business from "../hook_store/business_hooks/acc_regist_lv6_business";
import useAccRegistLv6Style from "../hook_store/style_hooks/acc_regist_lv6_style";
import { reference_store, state_store } from "../../../utilData/UtilFunction";
import default_data from "../../../utilData/defaultData";

function AccRegistLv6({login_user, this_step}){

    // =================================================
    // states //
    const [subImgFile, setSubImgFile] = useState([])             ///////////서브 이미지 파일  
    const [sellectData, setSellectData] = useState({main:'', sub:''})         // 선택된 카테고리의 data값 state
    
    // =================================================
    // context states //
    const { main_img_state, setMain_img_state } = useContext(ImgContext)

    // =================================================
    // refs //
    const lv6_main_img = useRef()
    const lv6_sub_img = useRef([])

    // =================================================
    // hooks //
    // business
    const {} = useAccRegistLv6Business()

    // style
    const {img_modal_toggle, img_delete} = useAccRegistLv6Style({
        'main_img_state' : main_img_state,
        'setMain_img_state' : setMain_img_state
        },
        undefined,
        reference_store([
            {
                'lv6_main_img' : lv6_main_img
            }
        ])
    )

    //이미지 한방에 여러개 등록
    async function multiImgfetch(imgdata){
        // const file = imgdata.main
        // const files = Array.from(imgdata.sub)        ///////유사배열 -> 배열로 변환

        // console.log(file, files)

        // if(files.length === 4 && file){
        //     let imgDatas = new FormData()   ///sub, main 이미지 통합으로 관리 // 이름은 다르게 ㅇㅇ
        //     imgDatas.append('mainImg',file,'mainImg') //메인 이미지 어펜드


        //     // 서브이미지 어펜드 ㅇ
        //     for(const file of files){
        //         imgDatas.append('subImg', file, 'subImg')
        //     }

        //     //////////////숙소의 ref 유저 데이터값
        //     const userInfo = new Blob([JSON.stringify(userData._id)],{type:'application/json'})
        //     ////////////////숙소 _id값
        //     const home_id = new Blob([JSON.stringify(registData._id)],{type:'application/json'})

        //     imgDatas.append('userData',userInfo)
        //     imgDatas.append('homeid', home_id)

        //     ///////////////////////이미지 폼데이터 console확인

        //     for (const pair of imgDatas) {                             
        //         console.log(pair); 
        //     }

        //     try{
        //         const token = localStorage.getItem('log')
        //         const result = await fetch((`${default_data.d_base_url}/api/accomodation/imgs`),{
        //             headers:{
        //                 'Authorization': `${token? 'Bearer' + token : ''}`
        //             },
        //             method: 'POST',
        //             body: imgDatas
        //           })

        //     }
        //     catch(e){
        //         console.log(e)
        //     }
        // }        
    }

    return(
        <div className="Acc-regist-lv6__container">
            <Main_menu login_user={login_user}></Main_menu>

            <div className="Acc-regist-lv6__content">
                <div className="Acc-regist-lv6__content-title">
                    <span>숙소를 대표하는 이미지를 등록해주세요</span>                    
                    <div className="Acc-regist-lv6__content-title-section1">
                        <span>초기 등록 5장이 필요 합니다!</span>
                    </div>
                </div>

                <div className="Acc-regist-lv6__content-section2">
                    <div className="Acc-regist-lv6__content-section2-box1">
                        {main_img_state ? <img className="Acc-regist-lv6__content-section2-box1-part1" ref={lv6_main_img}>
                        </img> : null}
                        {/* add btn */}
                        {!main_img_state ? <button className="Acc-regist-lv6__content-section2-box1-btn"  onClick={img_modal_toggle}>
                            <img src={default_data.d_imgs.plus}></img>
                        </button> : null}
                        {/* delete btn */}
                        {main_img_state ? <button className="Acc-regist-lv6__content-section2-box1-delete-btn"  onClick={img_delete}>
                            <img src={default_data.d_imgs.transh_can}></img>
                        </button> : null}

                    </div>
                    {/* 서브이미지 디스플레이 */}
                    {main_img_state ? <div className="Acc-regist-lv6__content-section2-box2" >
                        <div className="Acc-regist-lv6__content-section2-box2-part1">
                            <img className="Acc-regist-lv6__subimg" ref={(ele)=>{lv6_sub_img.current[0] = ele}}></img>
                        </div>
                        <div className="Acc-regist-lv6__content-section2-box2-part1">
                            <img className="Acc-regist-lv6__subimg" ref={(ele)=>{lv6_sub_img.current[1] = ele}}></img>
                        </div>
                        <div className="Acc-regist-lv6__content-section2-box2-part1">
                            <img className="Acc-regist-lv6__subimg" ref={(ele)=>{lv6_sub_img.current[2] = ele}}></img>
                        </div>
                        <div className="Acc-regist-lv6__content-section2-box2-part1">
                            <img className="Acc-regist-lv6__subimg" ref={(ele)=>{lv6_sub_img.current[3] = ele}}></img>
                        </div>
                        {main_img_state ? <button className="Acc-regist-lv6__content-section2-box2-btn"   onClick={img_modal_toggle}>
                            <img src={default_data.d_imgs.plus}></img>
                        </button> : null}
                    </div> : null}
                </div>

            </div>

            <div className="Acc-regist-lv6__footer">
                <Host_footer fetchHandlerFun = {multiImgfetch} dropData = {sellectData}></Host_footer>
            </div>

            <ImgRegistModal img_modal_toggle={img_modal_toggle}></ImgRegistModal>
        </div>
    )
}

export default AccRegistLv6