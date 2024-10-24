import {useState, useRef} from "react";
import MainCreatorDescription from "../sections/main_creator_descripition/main_creator_descripition";
import MainEventSection from "../sections/main_event_section/main_event_section";
import MainSearchDescription from "../sections/main_search_description/main_search_description";
import MainSection1 from "../sections/main_section1/main_section1";
import MainSection2 from "../sections/main_section2/main_section2";
import MainSection3 from "../sections/main_section3/main_section3";
import MainSection4 from "../sections/main_section4/main_section4";
import MainSection5 from "../sections/main_section5/main_section5";
import Main_menu from "@/utilComponent/menu/main-menu/main-menu";
import MainSearchBoard from "../sections/main_search_board/main_search_board";
import MainMainLayout from "@/layout/main/main_main_layout/main_main_layout";
import useMainBusiness from "../hook_store/business_hooks/main_business";
import useMainStyle from "../hook_store/style_hooks/main_style";
import { reference_store, state_store } from "@/util/function/util_function";
import session_storage from "@/sessionStorage/session_storage";
import background from '@/assets/background/background.jpg'
import MainSearchModalSection from "../sections/main_search_modal_section/main_search_modal_section";

function Main(){
    // console.log('렌더링 회수 체크')

    // =================================================
    // user //
    const user_state = {
        userId : session_storage.load('user_id')
    }

    // =================================================
    // state //
    const [main_data, setMain_data] = useState(null)
    const [loading , setLoading] = useState(true)   

    // =================================================
    // ref //
    const search_menu = useRef(null)

    // =================================================
    // hooks //
    // business
    const {} = useMainBusiness(undefined,
        state_store([
            {main_data, setMain_data}
        ])
    )
    // style
    const {} = useMainStyle(undefined, undefined,
        reference_store([
            {search_menu}
        ])
    )
    
    return(
        <MainMainLayout>
            <Main_menu 
                data = {main_data?.sec1.search} 
                search = {true} 
                border = {false}
                ref = {search_menu} 
                scroll = {true} 
                login_user = {user_state.userId ? user_state : null}
                role = {'main_menu'}/>
            <MainSearchModalSection
                data = {main_data?.sec1.search} 
                role = {'search_modal'}/>
            <MainSearchBoard 
                data = {main_data?.sec1.search} 
                role = {'search_board'}/>
            <MainEventSection 
                role = {'event'}/>
            <MainSection1 
                title = {'국내 인기 여행지'} 
                data ={main_data?.sec1.search}
                role = {'local'}/>
            <MainSection2 
                title = {'연인추천 숙소'} 
                data = {main_data?.sec3.accomodations}
                role = {'category1'}/>
            <MainSection2 
                title = {'뷰맛집 숙소'} 
                data = {main_data?.sec4.accomodations}
                role = {'category2'}/>
            <MainCreatorDescription
                role = {'introduce'}/>
            <MainSection5 
                title = {'유형별 숙소'}
                role = {'space'}/>
            <MainSection4 
                title = {'친환경 숙소'} 
                data = {main_data?.sec2.accomodations} 
                imgurl = {background}
                role = {'category_highlight'}/>
            <MainSection3 
                title = {'할인 이벤트'} 
                data = {main_data?.sec5.accomodations}
                role = {'discount'}/>
            <MainSearchDescription 
                title = {'국내여행지'} 
                data = {main_data?.sec1.search}
                role = {'keyword'}/>
        </MainMainLayout>
    )
}

export default Main