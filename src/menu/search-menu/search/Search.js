import React, {useState, useEffect, useRef} from "react";
import { NavLink, useSearchParams, useNavigate } from "react-router-dom";
import CalendarData from "../../../utilData/calendar/Calendar";
import './Search.css'


function Search({data, tg_value}){
    const [cityName, setCityName] = useState()
    const [title, settitle] = useState()
    // 드롭다운 토글 스테이트
    const [dr1_state, setDr1_state]=useState(false)
    const [dr2_state, setDr2_state]=useState(false)
    const [dr3_state, setDr3_state]=useState(false)

    const [selectedDropdown, setSelectedDropdown] = useState(null)

    //드롭다운 ref
    const b_box1_ref = useRef()
    const b_box2_ref = useRef()
    const b_box3_ref = useRef()
    const b_box3_ref_box3 = useRef()
    const b_box3_ref_val = useRef()

    ///쿼리스트링
    const [SearchParams,setSearchParams] = useSearchParams()

    //링크이동
    const navigate = useNavigate()

    useEffect(()=>{
        //도시 리스트
        const cityname = []
        data?.map((ele)=>{
            if(cityname.includes(ele.cityName)){
                return
            }else{
                return cityname.push(ele.cityName)
            }
        })
        setCityName(cityname)
        //제목 리스트
        const titleList = []
        data?.map((ele)=>{
            if(titleList.includes(ele.title)){
                return
            }else{
                return titleList.push(ele.title)
            }
        })
        settitle(titleList)
    },[data])



    // 검색버튼 함수
    function searchBtn(){
        const city = b_box1_ref.current.value
        const capacity = b_box3_ref_val.current.innerText
        console.log(city, capacity)

        setSelectedDropdown(null)

        navigate(`/SubApp/${city}?capacity=${capacity}`)
    }

    // NavLink to={`/SubApp/${ele}`}

    ////드롭다운 토글함수
    const openDropdown = (e) => {
        console.log('서치')
        e.stopPropagation()
            if(e.target.id === selectedDropdown){
                setSelectedDropdown(null)
            }
            else{
                setSelectedDropdown(e.target.id)
            }
    }
    ////////////////////////////윈도우 전역에 이벤트 주기 (협업에서 이렇게 하면 욕처먹을듯// 임포트 할 수 있는 유틸함수로 뺄것)
    window.addEventListener('click',(e)=>{
        console.log('확인')
        e.stopPropagation()
        if(e.target.classList.contains('b-l-box1-title') || e.target.classList.contains('b-l-box2-title') || e.target.classList.contains('b-l-box3-title')){
            return
        }else{
            setSelectedDropdown(null)
        }
    })

    
    // function ToggleComponent(cname){        

    //     if(e.target.classList.contains('b-l-box1-title') || e.target.classList.contains('b-l-box2-title') || e.target.classList.contains('b-l-box3-title')){
    //         return
    //     }else{
    //         setSelectedDropdown(null)
    //     }
    // }


    return(
        <div className="search-content-search">
            <div className="search-top-line">
                <div className="top-line-text1">숙박</div>
                <div className="top-line-text2">대실</div>
            </div>

            <div className="search-bottom-line">         
                <div className="bottom-line-box1">
                    <input className="b-l-box1-title" ref={b_box1_ref} placeholder='지역' type='text' id={1} onClick={openDropdown}></input>
                    <div className={`search-b-l-box1-dr ${selectedDropdown == 1 && 'drop_active'}`} >
                        <div className="search-b-l-box1-dr-title">보형짱닷컴 검색 순위</div>
                        {cityName?.map((ele,id)=>{
                                return(
                                    <div onClick={(e)=>{
                                        e.stopPropagation()
                                        b_box1_ref.current.value=ele    
                                        setSelectedDropdown(`${Number(selectedDropdown)+1}`)
                                    }} className="search-b-l-box1-dr-list" key={id} value={ele}>{`${id+1}. ${ele}`}</div>
                                )
                        })}
                    </div>
                </div> 

                <div className="bottom-line-box2">
                   <input className="b-l-box2-title" id={2} onClick={openDropdown} value='날짜'></input>

                    <div className={`search-b-l-box2-dr ${selectedDropdown == 2 && 'drop_active'}`}>
                        <CalendarData></CalendarData>
                    </div>
                </div> 



                <div className="bottom-line-box3">
                    <div ref={b_box3_ref} className="b-l-box3-title" id={3} onClick={openDropdown} >2</div>
                    <div className={`search-b-l-box3-dr ${selectedDropdown == 3 && 'drop_active'}`}>
                        <div className="search-b-l-box3-dr-box1">
                            <div className="search-b-l-box3-dr-box1-title">인원</div>
                            <div className="search-b-l-box3-dr-box1-text">유아 및 아동도 포함해 주세요</div>
                        </div>
                        <div className="search-b-l-box3-dr-box2">
                            <button className="search-b-l-box3-dr-box2-lb" onClick={(e)=>{
                                        e.stopPropagation()

                               b_box3_ref_val.current.innerText = Number(b_box3_ref_val.current.innerText)-1
                               b_box3_ref_box3.current.innerText= `인원수 ${b_box3_ref_val.current.innerText}명`
                               b_box3_ref.current.innerText= `${b_box3_ref_val.current.innerText}`
                               if(b_box3_ref_val.current.innerText==='0'){
                                e.target.disabled = true
                               }else{
                                const rb_btn = document.querySelector('.search-b-l-box3-dr-box2-rb')
                                rb_btn.disabled=false
                               }
                            } 
                            }>-</button>

                            <span ref={b_box3_ref_val} className="b_box3_ref_val">2</span>

                            <button className="search-b-l-box3-dr-box2-rb" onClick={(e)=>{
                                        e.stopPropagation()

                               b_box3_ref_val.current.innerText = Number(b_box3_ref_val.current.innerText)+1
                               b_box3_ref_box3.current.innerText= `인원수 ${b_box3_ref_val.current.innerText}명`
                               b_box3_ref.current.innerText= `${b_box3_ref_val.current.innerText}`
                               if(b_box3_ref_val.current.innerText==='10'){
                                e.target.disabled = true
                               }else{
                                const lb_btn = document.querySelector('.search-b-l-box3-dr-box2-lb')
                                lb_btn.disabled=false
                               }
                            }
 
                            }>+</button>
                        </div>
                        <div ref={b_box3_ref_box3} className="search-b-l-box3-dr-box3">인원수 2명</div>
                    </div>
                </div>

                <div className="bottom-line-box4">
                    <div className="b-l-box4-title" onClick={searchBtn}>검색</div>
                </div>
            </div>
        </div>
    )

}

export default Search