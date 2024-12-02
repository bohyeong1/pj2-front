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
import background from '@/assets/background/background.jpg'
import Loading from "@/utilComponent/material/loading/loading"

function Main({login_user}){
    // console.log('렌더링 회수 체크')

    // =================================================
    // state //
    const [main_data, setMain_data] = useState(null) 

    // =================================================
    // ref //
    const search_menu = useRef(null)

    // =================================================
    // hooks //
    // business
    const {
        section1_query,
        section2_query,
        section3_query,
        section4_query,
        section5_query
    } = useMainBusiness(undefined,
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

    if(
        section1_query.isLoading ||
        section2_query.isLoading ||
        section3_query.isLoading ||
        section4_query.isLoading ||
        section5_query.isLoading
    ){
        return <Loading/>
    }

    if(
        section1_query.error ||
        section2_query.error ||
        section3_query.error ||
        section4_query.error ||
        section5_query.error
    ){
        // redirection error page
    }

    return(
        <MainMainLayout>
            <Main_menu 
                login_user = {login_user}
                role = {'main_menu'}/>
            <MainSearchBoard 
                data = {section1_query.data.city} 
                role = {'search_board'}/>
            <MainEventSection 
                role = {'event'}/>
            <MainSection1 
                title = {'국내 인기 여행지'} 
                data ={section1_query.data.city}
                role = {'local'}/>
            <MainSection2 
                title = {'연인추천 숙소'} 
                data = {section3_query.data.accomodations}
                role = {'category1'}/>
            <MainSection2 
                title = {'뷰맛집 숙소'} 
                data = {section4_query.data.accomodations}
                role = {'category2'}/>
            <MainCreatorDescription
                role = {'introduce'}/>
            <MainSection5 
                title = {'유형별 숙소'}
                role = {'space'}/>
            <MainSection4 
                title = {'친환경 숙소'} 
                data = {section2_query.data.accomodations} 
                imgurl = {background}
                role = {'category_highlight'}/>
            <MainSection3 
                title = {'할인 이벤트'} 
                data = {section5_query.data.accomodations}
                role = {'discount'}/>
            <MainSearchDescription 
                title = {'국내여행지'} 
                data = {section1_query.data.city}
                role = {'keyword'}/>
        </MainMainLayout>
    )
}

export default Main