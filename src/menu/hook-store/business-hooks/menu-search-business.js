import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function useMenuSearchBusiness(data, states,refs){

    // console.log(states)
    // console.log(refs)

    //링크이동
    const navigate = useNavigate()

    // 도시 리스트 관리
    function push_city_name(citys){
        //도시 리스트
        const cityname = []
        if(citys){
            citys.map((ele)=>{
                if(cityname.includes(ele.city)){
                    return
                }else{
                    return cityname.push(ele.city)
                }
            })
            states.setCityName(cityname)
    
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
        }else{
            return
        }

    }

    useEffect(()=>{
        push_city_name(data)
    },[data])

    // 검색버튼 함수
    function searchBtn(){
        const city = refs.b_box1_ref.current.value
        const capacity = refs.b_box3_ref_val.current.innerText

        states.setSelectedDropdown(null)

        navigate(`/SubApp/${city}?capacity=${capacity}`)
    }

    return {searchBtn}
}

export default useMenuSearchBusiness
