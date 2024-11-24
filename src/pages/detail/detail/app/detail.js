import {useState} from "react";
import DetailFixMenu from "../sections/detail_fix_menu/detail_fix_menu";
import Section1Payment from "../sections/detail_section1/section1_payment/section1_payment";
import DetailSection1 from "../sections/detail_section1/detail_section1";
import DetailSection2 from "../sections/detail_section2/detail_section2";
import DetailSection3 from "../sections/detail_section3/detail_section3";
import DetailSection4 from "../sections/detail_section4/detail_section4";
import DetailSection5 from "../sections/detail_section5/detail_section5";
import DetailSection6 from "../sections/detail_section6/detail_section6";
import Img_dis_modal from "@/utilComponent/modal/img_dis_modal/img_dis_modal";
import DetailHeader from "../sections/detail_header/detail_header";
import Loading from '@/utilComponent/material/loading/loading'
import useDetailDetailAppStyle from "../hook_store/style_hooks/detail_detail_app_style";
import useDetailDetailAppBusiness from "../hook_store/business_hooks/detail_detail_app_business";
import { state_store } from "@/util/function/util_function";
import DetailDetailLayout from "@/layout/detail/detail_detail_layout/detail_detail_layout";
import DetailImgDisplay from "../sections/detail_img_display/detail_img_display";
import { UserContext } from "@/context/user_context/config/user_context"
import { useContext } from "react"

function Detail(){

    // =================================================
    // states //
    const [sellect_data, setSellect_data] = useState() ///숙소, User, 평가 data
    const [sub_img, setSub_img] = useState(null)
    const [loading , setLoading] = useState(true)   

    // =================================================
    // context states //
    const {user_data, setUser_data} = useContext(UserContext)

    // =================================================
    // hooks //
    // business
    const {
        house_param,
        data, 
        isLoading, 
        isError
    } = useDetailDetailAppBusiness(
        {
            user_data,
            setUser_data
        },
        state_store([
            {sellect_data, setSellect_data},
            {sub_img, setSub_img},
            {loading, setLoading}
        ])
    )
    // style
    const {img_modal_toggle} = useDetailDetailAppStyle()

    return(
        loading ? <Loading></Loading> : 
        <>
        <DetailDetailLayout>
            <DetailFixMenu 
                data = {sellect_data?.accomodation}
                evaluations = {sellect_data?.evaluations[0]}
                role = {'fix_menu'}/>
            <DetailHeader 
                data = {sellect_data?.accomodation}
                user = {user_data}
                wishlist = {data}
                role = {'header'}/>
            <DetailImgDisplay 
                data = {sellect_data?.accomodation}
                click_handler = {img_modal_toggle}
                role = {'img_display'}/>
            <DetailSection1 
                data = {sellect_data?.accomodation} 
                user = {sellect_data?.seller} 
                evaluations = {sellect_data?.evaluations[0]}
                role = {'summary'}/>
            <Section1Payment 
                data = {sellect_data?.accomodation} 
                host = {sellect_data?.seller.host_text}
                params = {house_param}
                role = {'payment'}/>                                    
            <DetailSection2 
                data = {sellect_data?.accomodation}
                role = {'map'}/>  
            <DetailSection3 
                evaluations = {sellect_data?.evaluations[0]} 
                role = {'evaluation'}/>                            
            <DetailSection4 
                evaluations = {sellect_data?.evaluations[0]}
                role = {'reply'}/>                    
            <DetailSection5 
                seller = {sellect_data?.seller} 
                role = {'host_information'}/>
            <DetailSection6 
                data = {sellect_data?.accomodation}
                role = {'rule'}/>                   
        </DetailDetailLayout>
        <Img_dis_modal 
            data = {sellect_data?.accomodation} 
            imgs = {sellect_data ? [sellect_data.accomodation.main_img, ...sellect_data.accomodation.sub_img] : null} 
            img_modal_toggle = {img_modal_toggle}/>
        </>
    )
}

export default Detail 