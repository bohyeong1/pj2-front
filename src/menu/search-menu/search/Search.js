import React, {useState, useRef} from "react";
import './Search.css'
import DateCalendar from "../../../utilData/dateCalendar/DateCalendar";
import defaultData from '../../../utilData/defaultData'
import useMenuSearchBusiness from "../../hook-store/business-hooks/menu-search-business";
import useMenuSearchStyle from "../../hook-store/style-hooks/menu-search-style";
import { state_store, reference_store } from "../../../utilData/UtilFunction";
import { clickPlus, clickMinus } from "../../../utilData/UtilFunction";
import { forwardRef } from "react";

const Search = forwardRef((props,ref) => {

    // props
    const {data} = props

    // state
    const [selectedDropdown, setSelectedDropdown] = useState(null)
    const [cityName, setCityName] = useState(null)

    //드롭다운 ref
    const b_box1_ref = useRef(null)
    const b_box3_ref = useRef(null)
    const b_box3_ref_box3 = useRef(null)
    const b_box3_ref_val = useRef(null)

    const minus_btn = useRef(null)
    const plus_btn = useRef(null)

    
    // hooks
    const {searchBtn} = useMenuSearchBusiness(data, 
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
            {'b_box3_ref':b_box3_ref}, 
            {'b_box3_ref_box3':b_box3_ref_box3}, 
            {'b_box3_ref_val':b_box3_ref_val}
        ]))
    
    const {openDropdown} =  useMenuSearchStyle(undefined, 
        state_store([
            {
                'selectedDropdown':selectedDropdown,
                'setSelectedDropdown':setSelectedDropdown
            }
        ]))
    




    return(
        <div className="search-bottom-line">         
            <div className="bottom-line-box1">
                <input className="b-l-box1-title" ref={b_box1_ref} placeholder='여행지를 검색해 보세요' type='text' id={1} onClick={openDropdown}></input>
                <div className={`search-b-l-box1-dr ${selectedDropdown == 1 && 'drop_active'}`} >
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
                <input className="b-l-box2-title" id={2} onClick={openDropdown} value='날짜'></input>

                <div className={`search-b-l-box2-dr ${selectedDropdown == 2 && 'drop_active'}`}>
                    <DateCalendar></DateCalendar>
                </div>
            </div> 


            <div className="bottom-line-box3">
                <input ref={b_box3_ref} className="b-l-box3-title" id={3} onClick={openDropdown} value={2} type="text"></input>
                <div className={`search-b-l-box3-dr ${selectedDropdown == 3 && 'drop_active'}`}>
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
    )
})

export default Search