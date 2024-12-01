import React, {useRef} from "react";
import default_data from "@/util/default_data/default_data";
import './map_modal.scss'
// import Kakaomap from "../../material/kakaomap/Kakaomap";
import { state_store, reference_store } from "@/util/function/util_function";
import { NavLink } from "react-router-dom";
import useModalMapModalBusiness from "../hook-store/business-hooks/modal_mapmodal_business";
import useModalMapModalStyle from "../hook-store/style-hooks/modal_mapmodal_style";
import CheckButton from '@/util/component/button/check_button/check_button'
import PriceButton from '@/util/component/button/price_button/price_button';
import FilterButton from '@/util/component/button/filter_button/filter_button'
import BooleanButton from '@/util/component/button/boolean_button/boolean_button'
import { useSelector } from "react-redux";
import { createPortal } from 'react-dom'
import OriginalImg from "@/picture/original_img/original_img"
import { pop_three_texts } from '@/util/function/util_function';
import '@/manage_scss_style/commonness/commonness.scss'

function MapModal({data, modal_toggle, key_name}){

    // =================================================
    // redux state //
    const modal_state = useSelector(state => state.overay.open_target_id)

    // =================================================
    // refs //
    const modal_ref = useRef(null)
    const filter_ref = useRef(null)
    const list_ref = useRef(null)
  
    // =================================================
    // hooks //
    // business
    const {} = useModalMapModalBusiness()
    // style
    const {} =  useModalMapModalStyle(undefined,undefined,
        reference_store([
            {filter_ref},
            {list_ref}
        ])
    )

    return createPortal (
        modal_state === key_name &&
        <div className="sub-modal__wrapper" ref={modal_ref}>
            {/* header */}
            <div className="sub-modal__container">
                <div className="sub-modal__header">
                    <button 
                        className="sub-modal__closebtn" 
                        onClick={()=>{modal_toggle(null)}}>
                        <img 
                            className="sub-modal__closebtn-img" 
                            src={default_data.d_imgs.close}/>
                    </button>
                    <div>지도</div>
                    <div className="sub-modal__gurabox1"></div>
                </div>

                {/* contents */}
                <div className="sub-modal__contents-container">
                    {/* filter section */}
                    <div 
                        className="sub-modal__filter" 
                        ref={filter_ref}>                        
                        
                        <div className="list-side-bar__container">
                            <div className="side-menu-filter">
                                <div>필터</div>
                                <button 
                                    className="side-menu-fil-btn" 
                                    // onClick={initial_page}
                                    >
                                        초기화
                                </button>
                            </div>
                            <div className="side-menu-content">
                                <div className="side-content-category">
                                    <div className="category-title">숙소유형</div>
                                    <CheckButton 
                                        data={default_data.d_category_icon} 
                                        keyValue={'category'} 
                                        c_name={'category-content'}/>
                                </div>

                                <div className="side-content-price">
                                    <div className="price-title">가격</div>
                                    <div className="price-content">
                                    <PriceButton 
                                            key_value1='price-min' 
                                            key_value2='price-max'/>
                                    </div>
                                </div>

                                <div className="side-content-grade">
                                    <div className="grade-title">#키워드</div>
                                    <div className="side-menu__grade-container">
                                        {default_data.d_keyword.map((el,id)=>{
                                            return(
                                            <FilterButton 
                                                key={id} 
                                                text={el.name} 
                                                keyValue={'keywords'}/>
                                            )
                                        })}
                                    </div>
                                </div>

                                <div className="side-content-discount">
                                    <div className="discount-title">할인</div>
                                    <div className="discount-content">
                                        <BooleanButton 
                                            text='할인 상품' 
                                            keyValue={'discount'}/>
                                    </div>
                                </div>
                                
                                <div className="side-content-facility">
                                    <div className="facility-title">추가 시설</div>
                                    <div className="side-menu__facility-container">
                                        {default_data.d_service_facility_icon.map((el,id)=>{
                                            return(
                                            <FilterButton 
                                                key={id} 
                                                text={el.name} 
                                                keyValue={'service_facility'}/>
                                            )
                                        })                        
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* list */}
                    <div 
                        className="sub-modal__display common-scroll-bar sublist-modal__active" 
                        ref={list_ref}>
                        {data.accomodations.length !== 0 ? 
                        data.accomodations.map((el, id)=>{
                            return(
                                <div 
                                    className={`sublist-list`} 
                                    key={id} 
                                    data-key = {el._id} 
                                    // onClick={modal_list_click} 
                                    // onMouseEnter={modal_list_hover} 
                                    // onMouseLeave={modal_list_out}
                                    > 
                                    <div className="list-img">
                                        <OriginalImg url={el.main_img}/>
                                    </div>
                                    <div className="list-text">
                                        {/* 숙소분류 */}
                                        <div className="list-text-tex1">{`${el.category.name}`}</div>
                                        {/* 제목 */}
                                        <div className="list-text-tex2">{el.title}</div>
                                        {/* 숙소평가 */}
                                        <div className="list-text-evaluation">
                                            <div className="list-evaluation__star-box">
                                                <img src={default_data.d_imgs.star}></img>
                                                <span>{`${el.average ? el.average.toFixed(2) : '미평가'}`}</span>
                                            </div>
                                            <span>{`${el.counts_review !== 0 ? `${el.counts_review}명 평가` : ''}`}</span>
                                        </div>
                                        {/* 숙소주소 */}
                                        <div className="list-text-tex3">{el.search_adress}</div>
                                        {/* 키워드 */}
                    
                                        <div className="list-text-tex4">
                                            {el.keywords.map((ele, id)=>{
                                                return(
                                                    <span key={id}>{`${ele.name}. `}</span>
                                                )
                                            })}
                                        </div>
                                        {/* 가격 */}
                                        <div className="list-text-tex6">
                                            <span>{pop_three_texts(el.price)}</span>
                                            <span>원</span>
                                        </div>
                                    </div>
                                </div>
                            )}) : 
                            <span className="list-contents__sublist-list-no-data">등록된 숙소가 존재하지 않아요!</span>}
                    </div>
                    {/* map */}
                    <div className="sub-modal__map">
                        {/* <Kakaomap 
                            city = {city} 
                            type = {'default'}
                            data={data}/> */}
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root')
    )
}

export default MapModal