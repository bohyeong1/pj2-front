import './search_menu.scss';
import { useState } from 'react';
import default_data from "@/util/default_data/default_data";
import { transform_date } from '@/util/function/util_function';
import { useSelector } from "react-redux"
import useMenuSearchBusiness from '../hook-store/business-hooks/menu_search_business';
import useMenuSearchStyle from '../hook-store/style-hooks/menu_search_style';
import { state_store } from "@/util/function/util_function";
import Calendar from '../../material/calendar/calendar';

function SearchMenu({data, preview_form = false, related_preview = false}){

    // =================================================
    // redux states // 
    const {
        search_modal_state,
        search_data_name,
        location_data,
        checkin_data,
        checkout_data,
        capacity_data
    } = useSelector(state => state.search_modal)

    // =================================================
    // states // 
    const [modal_state, setModal_state] = useState(null)

    // =================================================
    // hooks //
    // business
    const {search_button_click} = useMenuSearchBusiness(
        {
            search_modal_state,
            search_data_name,
            location_data,
            checkin_data,
            checkout_data,
            capacity_data
        },
        state_store([
            {modal_state, setModal_state}
        ])
    )
    // style
    const {
        click_preview,
        click_plus, 
        click_minus, 
        click_location, 
        open_modal
    } = useMenuSearchStyle(
        {
            search_modal_state,
            search_data_name,
            location_data,
            checkin_data,
            checkout_data,
            capacity_data
        },
        state_store([
            {modal_state, setModal_state}
        ]),
        undefined,
        {
            related_preview
        }
    )

    return(
        <div className="search-menu__container">
            {preview_form ? 
            // 검색창 프리뷰
            <div className="search-menu__preview">
                <div 
                    className="search-menu__preview-location" 
                    onClick={()=>{click_preview('location')}}>
                    <span>{location_data ? location_data : '지역'}</span>
                </div>
                <div 
                    className="search-menu__preview-date" 
                    onClick={()=>{click_preview('check-in-out')}}>
                    <span>{checkin_data && checkout_data ? `${transform_date(new Date(checkin_data))} - ${transform_date(new Date(checkout_data))}` : '날짜'}</span>
                </div>
                <div 
                    className="search-menu__preview-capacity" 
                    onClick={()=>{click_preview('capacity')}}>
                    <span>{capacity_data ? '인원 ' + capacity_data  : '인원'}</span>
                </div>
            </div> 

            // 검색창 default
            : 
            <div className="search-menu__default">    
                {/* location */}
                <div className="search-menu__location-wrapper">
                    <input 
                        className="search-menu__location-input" 
                        placeholder='여행지를 검색해 보세요' 
                        defaultValue={null} 
                        type='text' 
                        onClick={open_modal}/> 
                    {/* location modal */}
                    <div className={`search-menu__location-modal`}>
                        <div className="search-menu__location-modal-title">지역 검색하기</div>
                        {/* {city_name?.map((el,id)=>{
                            return(
                                <div 
                                    onClick={click_location} 
                                    className="search-menu__location-modal-list" 
                                    key={id}>
                                    <span>{id+1}</span>
                                    <span>{el}</span>
                                </div>
                            )
                        })} */}
                    </div>
                </div> 
                {/* check in out */}
                <div className="search-menu__check-in-out-wrapper">
                    <div 
                        className="search-menu__check-in-out-input"
                        onClick={open_modal}>
                        <span>{checkin_data && checkout_data ? `${transform_date(new Date(checkin_data))} - ${transform_date(new Date(checkout_data))}` : '날짜'}</span>                        
                    </div>
                    {/* check in out modal */}
                    <div className={`search-menu__check-in-out-modal`}>
                        <Calendar/>
                    </div>
                </div> 
                {/* capacity */}
                <div className="search-menu__capacity-wrapper">
                    <div
                        className="search-menu__capacity-input" 
                        onClick={open_modal}>
                        <span>{capacity_data ? '인원 ' + capacity_data  : '인원'}</span>                        
                    </div>
                    {/* capacity modal */}
                    <div className={`search-menu__capacity-modal`}>
                        <div className="search-menu__capacity-modal-box1">
                            <div className="search-menu__capacity-modal-box1-title">인원</div>
                            <div className="search-menu__capacity-modal-box1-text">유아 및 아동도 포함해 주세요</div>
                        </div>

                        <div className="search-menu__capacity-modal-box2">
                            <button 
                                onClick={click_minus} 
                                className="search-menu__capacity-modal-box2-button">
                                <img src={default_data.d_imgs.minus}/>
                            </button>                            
                            <span className="search-menu__capacity-modal-value">{capacity_data}</span>
                            <button 
                                onClick={click_plus} 
                                className="search-menu__capacity-modal-box2-button">
                                <img src={default_data.d_imgs.plus}/>
                            </button>
                        </div>
                    </div>
                </div>
                {/* search button */}
                <div className="search-menu__search-button-wrapper">
                    <button 
                        className="search-menu__search-button" 
                        onClick={search_button_click}>
                        검색
                    </button>
                </div>
            </div>}    
        </div>
    )
}

export default SearchMenu