import React,{useState, useRef} from "react";
import './MainApp.css'
import Event_swiper from "../event-swiper/Event-swiper";
import Creator_description from "../creator-description/Creator-description";
import Lv1_description from "../lv1-description/Lv1-description";
import Lv2_description from "../lv2-description/Lv2-description";
import Lv3_description from "../lv3-description/Lv3-description";
import Lv4_description from "../lv4-description/Lv4-description";
import Lv5_description from "../lv5-description/lv5-description";
import Search_descripton from "../search-description/Search-descripton";
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Search_menu from "../../../utilComponent/menu/search-menu/search-menu";
import Footer from "../../../utilComponent/menu/footer/Footer";
import useMainBusiness from "../hook-store/business-hooks/main-business";
import useMainStyle from "../hook-store/style-hooks/main-style";
import { reference_store, state_store } from "../../../utilData/UtilFunction";

function MainApp(){
    // console.log('렌더링 회수 체크')

    // state
    const [dataStore, setDataStore] = useState(null)

    // ref
    const search_component = useRef(null)
    const main_app_ref = useRef(null)
    const search_menu = useRef(null)

    // hooks
    const {} = useMainBusiness(undefined,
        state_store([
            {
                'dataStore':dataStore,
                'setDataStore':setDataStore
            }
        ]))

    const {} = useMainStyle(undefined, undefined,
        reference_store([
            {'search_component':search_component},
            {'main_app_ref':main_app_ref},
            {'search_menu':search_menu}
        ])
    )

    const imgurl ='http://www.cbiz.kr/news/photo/201907/16757_21366_1236.jpg'

    return(
        <div className="mainApp" ref={main_app_ref}>
            <div className="main-gnb">
                <div className="main-gnb__menu-container">
                    <Main_menu data={dataStore?.sec1.search} preview={true} ref={search_menu} scroll={true}></Main_menu>
                </div>
                <Search_menu ref={search_component} shadow={true} subtitle={true} data={dataStore?.sec1.search} preview={false}></Search_menu>
            </div>
            <div className="main-content">
                <Event_swiper></Event_swiper>
                <Lv1_description title={'국내 인기 여행지'} data ={dataStore?.sec1.search}></Lv1_description>
                <Lv2_description title={'연인추천 숙소'} data={dataStore?.sec3.accomodations}></Lv2_description>
                <Lv2_description title={'뷰맛집 숙소'} data={dataStore?.sec4.accomodations}></Lv2_description>
                <Creator_description></Creator_description>
                <Lv5_description title={'유형별 숙소'}></Lv5_description>
                <Lv4_description title={'친환경 숙소'} data={dataStore?.sec2.accomodations} imgurl = {imgurl}></Lv4_description>
                <Lv3_description title={'할인 이벤트'} data={dataStore?.sec5.accomodations}></Lv3_description>
                <Search_descripton title={'국내여행지'} data={dataStore?.sec1.search}></Search_descripton>
            </div>
            <div className="main-footer">
                <Footer></Footer>
            </div>
        </div>

    )
}

export default MainApp