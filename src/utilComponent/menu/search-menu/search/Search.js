import React, {useState, useRef, forwardRef} from "react";
import './Search.css'
import DateCalendar from "../../../../utilData/dateCalendar/DateCalendar";
import defaultData from '../../../../utilData/defaultData'
import useMenuSearchBusiness from "../../hook-store/business-hooks/menu-search-business";
import useMenuSearchStyle from "../../hook-store/style-hooks/menu-search-style";
import { state_store, reference_store } from "../../../../utilData/UtilFunction";
import { clickPlus, clickMinus } from "../../../../utilData/UtilFunction";

const Search = forwardRef((props,ref) => {

    // props
    const {data, preview} = props

    // state
    const [selectedDropdown, setSelectedDropdown] = useState(null)
    const [cityName, setCityName] = useState(null)

    // 드롭다운 ref
    const b_box1_ref = useRef(null)
    const b_box2_ref = useRef(null)
    const b_box3_ref = useRef(null)
    const b_box3_ref_box3 = useRef(null)
    const b_box3_ref_val = useRef(null)
    const minus_btn = useRef(null)
    const plus_btn = useRef(null)

    // overay ref
    const overay_ref = useRef(null)


    ////////////////////////////////////
    ////////////// hooks ///////////////
    ////////////////////////////////////
    // business
    const {searchBtn, today_format} = useMenuSearchBusiness(data, 
        state_store([
            {
                'selectedDropdown':selectedDropdown,
                'setSelectedDropdown':setSelectedDropdown
            },
            {
                'cityName':cityName,
                'setCityName':setCityName
            }
        ]),
        reference_store([
            {'b_box1_ref':b_box1_ref}, 
            {'b_box2_ref':b_box2_ref},
            {'b_box3_ref':b_box3_ref}, 
            {'b_box3_ref_box3':b_box3_ref_box3}, 
            {'b_box3_ref_val':b_box3_ref_val}
        ]))
    // style
    const {open_dropdown, click_preview, open_target_id} =  useMenuSearchStyle(undefined, 
        state_store([
            {
                'selectedDropdown':selectedDropdown,
                'setSelectedDropdown':setSelectedDropdown
            }
        ]),
        reference_store([
            {'b_box1_ref':b_box1_ref}, 
            {'b_box2_ref':b_box2_ref},
            {'b_box3_ref':b_box3_ref}, 
            {'b_box3_ref_box3':b_box3_ref_box3}, 
            {'b_box3_ref_val':b_box3_ref_val},
            {'overay_ref':overay_ref}
        ]))
 
    return(
        <>
            <div className="search-bottom__wrapper">
                {/* 검색창 프리뷰 */}
                <div className="search-bottom__preview" style={{display:`${preview?'flex':'none'}`}}>
                    <div className="search-bottom__preview-location" data-index = '1' onClick={click_preview}>
                        {b_box1_ref.current && b_box1_ref.current.value ? b_box1_ref.current.value : '지역'}
                    </div>
                    <span className="search-bottom__line"></span>
                    <div className="search-bottom__preview-data" data-index = '2' onClick={click_preview}>
                        {b_box2_ref.current && b_box2_ref.current.value ? b_box2_ref.current.value : today_format() + '-' + today_format(0,1)}
                    </div>
                    <span className="search-bottom__line"></span>
                    <div className="search-bottom__preview-capacity" data-index = '3' onClick={click_preview}>
                        {b_box3_ref.current && b_box3_ref.current.value ? '인원 ' + b_box3_ref.current.value  : '지역'}
                    </div>
                </div>

                {/* 검색창 실제 로직 */}
                <div className="search-bottom-line" style={{display:`${preview && !open_target_id ? 'none' : 'flex'}`}}>         
                    <div className="bottom-line-box1">
                        <input className="b-l-box1-title" ref={b_box1_ref} placeholder='여행지를 검색해 보세요' defaultValue={null} type='text' data-toggle_data='search-location'
                        id={1} onClick={open_dropdown}></input>  
                        {/* 드롭다운 */}
                        <div className={`search-b-l-box1-dr ${b_box1_ref.current && b_box1_ref.current.dataset.toggle_data === open_target_id && 'drop_active'}`} >
                            <div className="search-b-l-box1-dr-title">지역 검색하기</div>
                            {cityName?.map((ele,id)=>{
                                    return(
                                        <div onClick={(e)=>{
                                            e.stopPropagation()
                                            b_box1_ref.current.value=ele    
                                            setSelectedDropdown(`${Number(selectedDropdown)+1}`)
                                        }} className="search-b-l-box1-dr-list" key={id} value={ele}>
                                            <span>{id+1}</span>
                                            <span>{ele}</span>
                                        </div>
                                    )
                            })}
                        </div>
                    </div> 

                    <div className="bottom-line-box2">
                        <input className="b-l-box2-title" ref={b_box2_ref}  id={2} data-toggle_data='search-date' onClick={open_dropdown} defaultValue={`${today_format() + '-' + today_format(0,1)}`}></input>
                        {/* 드롭다운 */}
                        <div className={`search-b-l-box2-dr ${b_box2_ref.current && b_box2_ref.current.dataset.toggle_data === open_target_id && 'drop_active'}`}>
                            <DateCalendar></DateCalendar>
                        </div>
                    </div> 


                    <div className="bottom-line-box3">
                        <input ref={b_box3_ref} className="b-l-box3-title" id={3} data-toggle_data='search-capacity' onClick={open_dropdown} defaultValue={2} type="text"></input>
                        {/* 드롭다운 */}
                        <div className={`search-b-l-box3-dr ${b_box3_ref.current && b_box3_ref.current.dataset.toggle_data === open_target_id && 'drop_active'}`}>
                            <div className="search-b-l-box3-dr-box1">
                                <div className="search-b-l-box3-dr-box1-title">인원</div>
                                <div className="search-b-l-box3-dr-box1-text">유아 및 아동도 포함해 주세요</div>
                            </div>

                            <div className="search-b-l-box3-dr-box2">
                                <button ref={minus_btn} className="search-b-l-box3-dr-box2-lb" onClick={(e)=>{clickMinus(
                                    e, b_box3_ref, b_box3_ref_val, b_box3_ref_box3, plus_btn
                                )}}>
                                    <img   style={{width:'100%', height:'100%'}} src={defaultData.d_imgs.minus}></img>
                                </button>

                                <span ref={b_box3_ref_val} className="b_box3_ref_val">2</span>

                                <button ref={plus_btn} className="search-b-l-box3-dr-box2-rb" onClick={(e)=>{clickPlus(
                                    e, b_box3_ref, b_box3_ref_val, b_box3_ref_box3, minus_btn
                                )}}>
                                    <img style={{width:'100%', height:'100%'}} src={defaultData.d_imgs.plus}></img>
                                </button>
                            </div>
                            <div ref={b_box3_ref_box3} className="search-b-l-box3-dr-box3"></div>
                        </div>
                    </div>

                    <div className="bottom-line-box4">
                        <div className="b-l-box4-title" onClick={searchBtn}>검색</div>
                    </div>
                </div>
            </div>
        </>
    )
})

export default Search