import React, {useState, useEffect, useRef} from "react";
import {  useSearchParams, useNavigate } from "react-router-dom";
import './Search.css'
import DateCalendar from "../../../utilData/dateCalendar/DateCalendar";
import defaultData from '../../../utilData/defaultData'


function Search({data, shadow, subtitle}){
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

    //링크이동
    const navigate = useNavigate()

    useEffect(()=>{
        //도시 리스트
        const cityname = []
        data?.map((ele)=>{
            if(cityname.includes(ele.city)){
                return
            }else{
                return cityname.push(ele.city)
            }
        })
        setCityName(cityname)

        //////////////////////////////////지역만으로 검색 제한시키면 필요없고, 숙소이름까지 포함하면 필요함 but 숙소 이름 포함하려면 전체 데이터를 fetch해야함 생각해봐야할 부분
        /////////////////////////////////////////              or 검색창에 숙소이름 입력시 fetch해서 백엔드에서 필터링해서 보내준다면? but 연관검색어나 검색어 자동완성기능 넣을 시
        // //////////////////////////////////////               프론트에서 처리가 아닌 백엔드에서 처리해야함. 한글자 칠때마다 fetch해서 연관검색어를 찾는다?
        //제목 리스트
        // const titleList = []
        // data?.map((ele)=>{
        //     if(titleList.includes(ele.title)){
        //         return
        //     }else{
        //         return titleList.push(ele.title)
        //     }
        // })
        // settitle(titleList)
    },[data])



    // 검색버튼 함수
    function searchBtn(){
        const city = b_box1_ref.current.value
        const capacity = b_box3_ref_val.current.innerText
        // console.log(city, capacity)

        setSelectedDropdown(null)

        navigate(`/SubApp/${city}?capacity=${capacity}`)
    }

    ////드롭다운 토글함수
    const openDropdown = (e) => {
        e.stopPropagation()
            if(e.target.id === selectedDropdown){
                setSelectedDropdown(null)
            }
            else{
                setSelectedDropdown(e.target.id)
            }
    }

    ////////////////////////////윈도우 전역에 이벤트 주기 (협업에서 이렇게 하면 욕처먹을듯// 임포트 할 수 있는 유틸함수로 뺄것)
    // window.addEventListener('click',(e)=>{
    //     // console.log('확인')
    //     e.stopPropagation()
    //     if(e.target.classList.contains('b-l-box1-title') || e.target.classList.contains('wraper') || e.target.classList.contains('b-l-box3-title')){
    //         return
    //     }else{
    //         setSelectedDropdown(null)
    //     }
    // })


    // 플러스 버튼 눌렀을 때
    function clickPlus(e){
        e.stopPropagation()

        b_box3_ref_val.current.innerText = Number(b_box3_ref_val.current.innerText)+1
        b_box3_ref_box3.current.value= `인원수 ${b_box3_ref_val.current.innerText}명`
        b_box3_ref.current.value= `${b_box3_ref_val.current.innerText}`
        if(b_box3_ref_val.current.innerText==='10'){
         e.target.disabled = true
        }else{
         const lb_btn = document.querySelector('.search-b-l-box3-dr-box2-lb')
         lb_btn.disabled=false
        }
    }
    // 마이너스 버튼 눌렀을 때
    function clickMinus(e){
        e.stopPropagation()

        b_box3_ref_val.current.innerText = Number(b_box3_ref_val.current.innerText)-1
        console.log(b_box3_ref.current)
        b_box3_ref_box3.current.value= `인원수 ${b_box3_ref_val.current.innerText}명`
        b_box3_ref.current.value= `${b_box3_ref_val.current.innerText}`
        if(b_box3_ref_val.current.innerText==='0'){
         e.target.disabled = true
        }else{
         const rb_btn = document.querySelector('.search-b-l-box3-dr-box2-rb')
         rb_btn.disabled=false
        }
    }


    return(
        <div className={`search-content-search ${shadow ? 'search-shadow' : ''}`}>
            <div className="search-top-line" style={{display:`${subtitle ? 'block' : 'none'}`}}>
                <div className="top-line-text1">
                    <span>어디로 떠나고 싶으세요?</span>
                </div>

            </div>

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
                            <button className="search-b-l-box3-dr-box2-lb" onClick={clickMinus}>
                                <img   style={{width:'100%', height:'100%'}} src={defaultData.d_imgs.minus}></img>
                            </button>

                            <span ref={b_box3_ref_val} className="b_box3_ref_val">2</span>

                            <button className="search-b-l-box3-dr-box2-rb" onClick={clickPlus}>
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
    )

}

export default Search