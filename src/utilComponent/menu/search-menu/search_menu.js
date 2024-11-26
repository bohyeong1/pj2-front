import './search_menu.scss';
import { useState } from 'react';
import default_data from "@/util/default_data/default_data";
import { transform_date } from '@/util/function/util_function';
import { useSelector } from "react-redux"
import useMenuSearchBusiness from '../hook-store/business-hooks/menu_search_business';
import useMenuSearchStyle from '../hook-store/style-hooks/menu_search_style';
import { state_store } from "@/util/function/util_function";
import CommonCalendar from '../../material/common_calendar/common_calendar';
import '@/manage_scss_style/commonness/commonness.scss'
import marker_icon from '@/assets/icon/marker-icon.png'
import capacity_icon from '@/assets/icon/capacity-icon.png'
import calendar_icon from '@/assets/icon/calendar-icon.png'
import glasses_icon from '@/assets/icon/glasses-icon.png'

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
    const [search_data, setSearch_data] = useState(null)
    const [onchange_search_data, setOnchange_search_data] = useState(null)

    // =================================================
    // hooks //
    // business
    const {
        search_button_click, 
        location_onchange
    } = useMenuSearchBusiness(
        {
            search_modal_state,
            search_data_name,
            location_data,
            checkin_data,
            checkout_data,
            capacity_data
        },
        state_store([
            {modal_state, setModal_state},
            {search_data, setSearch_data},
            {onchange_search_data, setOnchange_search_data}
        ]),
        undefined,
        {
            search_props : data
        }
    )
    // style
    const {
        click_preview,
        click_plus, 
        click_minus, 
        click_location,
        click_check_in, 
        click_check_out, 
        open_modal,
        close_modal
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
        <div className="search-menu__container not-user-sellect">
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
                    <img 
                        className='search-menu__img'
                        src={glasses_icon}/>
                    <input 
                        className="search-menu__location-input" 
                        placeholder='여행지를 검색해 보세요' 
                        defaultValue={null} 
                        type='text' 
                        onChange={(e) => {location_onchange(e.target.value)}}
                        onClick={()=>{open_modal('location')}}/> 
                    {/* location modal */}
                    {modal_state && modal_state === 'location' &&
                    <div className={`search-menu__location-modal box-shadow-lv2`}>
                        {search_data && <div className="search-menu__location-modal-title">보형짱 닷컴 검색 순위</div>}
                        {search_data ?
                        search_data.map((el, id)=>{
                            return(
                                <div 
                                    onClick={click_location} 
                                    className="search-menu__location-modal-list" 
                                    key={id}>
                                    <span>{id+1}</span>
                                    <span>{el.city}</span>
                                </div>
                            )
                        }) : null}

                        {onchange_search_data && onchange_search_data.result ? 
                        onchange_search_data.result.map((el, id)=>{
                            return (
                                <div
                                    key={id}
                                    className="search-menu__location-modal-search-list" >
                                    <div>
                                        <img src={marker_icon}/>
                                        <span>{el.original_word}</span>
                                    </div>
                                    <span>{el.original_address}</span>
                                </div>
                            )
                        }) : null}

                        {onchange_search_data && !onchange_search_data.result ? 
                        <span className='search-menu__loaction-modal-search-not'>
                            {onchange_search_data.message}
                        </span> : null}

                    </div>}
                </div> 
                {/* check in out */}
                <div className="search-menu__check-in-out-wrapper">
                    <img 
                        className='search-menu__img'
                        src={calendar_icon}/>
                    <div 
                        className="search-menu__check-in-out-input"
                        onClick={()=>{open_modal('check-in-out')}}>
                        <span>{checkin_data && checkout_data ? `${transform_date(new Date(checkin_data))} - ${transform_date(new Date(checkout_data))}` : '날짜'}</span>                        
                    </div>
                    {/* check in out modal */}
                    {modal_state && modal_state === 'check-in-out' &&
                    <div className={`search-menu__check-in-out-modal box-shadow-lv2`}>
                        <div className='search-menu__check-in-out-modal-board'>
                            <div>
                                <span>체크인</span>
                                <span>{checkin_data ? transform_date(new Date(checkin_data)) : '날짜 입력'}</span>
                            </div>
                            <div>
                                <span>체크아웃</span>
                                <span>{checkout_data ? transform_date(new Date(checkout_data)) : '날짜 입력'}</span>
                            </div>
                        </div>
                        <button 
                            className='search-menu__check-in-out-modal-close-button small-button'
                            onClick={close_modal}>
                            닫기
                        </button>
                        <CommonCalendar
                            set_checkout_handler = {click_check_out}
                            set_checkin_handler = {click_check_in}
                            checkin_date={checkin_data ? new Date(checkin_data) : null}
                            checkout_date={checkout_data ? new Date(checkout_data) : null}/>
                    </div>}
                </div> 
                {/* capacity */}
                <div className="search-menu__capacity-wrapper">
                    <img 
                        className='search-menu__img'
                        src={capacity_icon}/>
                    <div
                        className="search-menu__capacity-input" 
                        onClick={()=>{open_modal('capacity')}}>
                        <span>{capacity_data ? '인원 ' + capacity_data  : '인원'}</span>                        
                    </div>
                    {/* capacity modal */}
                    {modal_state && modal_state === 'capacity' &&
                    <div className={`search-menu__capacity-modal box-shadow-lv2`}>
                        <div className="search-menu__capacity-modal-box1">
                            <span className="search-menu__capacity-modal-box1-title">인원</span>
                            <span className="search-menu__capacity-modal-box1-text">유아 및 아동도 포함해 주세요</span>
                        </div>

                        <button 
                            className='search-menu__capacity-modal-close-button small-button'
                            onClick={close_modal}>
                            닫기
                        </button>

                        <div className="search-menu__capacity-modal-box2">
                            <button 
                                onClick={click_minus} 
                                className = {`search-menu__capacity-modal-box2-button ${capacity_data === 0 ? 'small-button-disabled' : 'small-button'}`}
                                disabled = {capacity_data === 0 ? true : false}>
                                <img src={default_data.d_imgs.minus}/>
                            </button>                            
                            <span className="search-menu__capacity-modal-value">{capacity_data}</span>
                            <button 
                                onClick={click_plus} 
                                className = {`search-menu__capacity-modal-box2-button  ${capacity_data === 30 ? 'small-button-disabled' : 'small-button'}`}
                                disabled =  {capacity_data === 30 ? true : false}>
                                <img src={default_data.d_imgs.plus}/>
                            </button>
                        </div>
                    </div>}
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