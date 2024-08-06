import { useParams, useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import connectData from "../../../../utilData/UtilFunction"
import default_data from "../../../../utilData/defaultData"
import util_hooks from "../../../../utilData/utilHook"
import { useSelector, useDispatch } from "react-redux";
import { set_search_data } from "../../../../redux/modules/searchSlice"
import my_session_storage from "../../../../sessionStorage/session_storage"

function useSubSubAppBusiness(data,states,refs){
    // parameter, querystring
    const params = useParams()              //파라미터
    const [SearchParams, setSearchParams] = useSearchParams()   //쿠ㅡ리스트링

    // url로부터 받아온 쿼리데이터 훅
    const final_key = util_hooks.useJoinUrl()

    // 리덕스 디스패치
    const dispatch = useDispatch()

    // redux state
    let search_state = useSelector((state) => {return state.search.search_data || my_session_storage.load('search')}) 

    // 데이터 패치
    useEffect(()=>{
        const select_city = params.city
        const page = states.current_page
        const limit = states.count_number

        // 검색어 데이터 없을 때
        if(!search_state){
            Promise.all([
                connectData(`${default_data.d_base_url}/api/common`,'POST',{
                    filter:'city'
                }),
                connectData(`${default_data.d_base_url}/api/common/sub?page=${page}&limit=${limit}`,'POST',{
                    city:select_city,
                    filters:final_key
                })                
            ]).then(result => {
                const [search_data, accomodations_data] = result

                // 검색어 데이터(사용자가 메인페이지 거치지 않고 바로 서브페이지 url로 들어왔을 때 전역스테이트 저장)
                if(search_data.code === 200){
                    // 스테이트 저장
                    states.setSearch_keyword(search_data.search) 
                    // 세션 스토리지 저장
                    my_session_storage.save('search',search_data.search)
                    // 리덕스에 저장
                    dispatch(set_search_data(search_data.search))
                }else{
                    console.log(search_data.message)
                }
                // 숙소데이터
                if(accomodations_data.code === 200){
                    states.setList(accomodations_data.accomodations)
                    states.setTotal_count(accomodations_data.total_counts)
                    states.setTotal_page(accomodations_data.total_pages)
                }else{
                    console.log(states.message)
                }
            }).catch(e => {
                console.log(e)
            })
        }
        // 검색어 데이터 있을 때
        else{
            connectData(`${default_data.d_base_url}/api/common/sub?page=${page}&limit=${limit}`,'POST',{
                city:select_city,
                filters:final_key
            })
            .then(result => {
                // console.log(result)
                if(result.code === 200){
                    // 숙소 데이터 저장
                    states.setList(result.accomodations)
                    states.setTotal_count(result.total_counts)
                    states.setTotal_page(result.total_pages)
                    // 검색어 데이터 스테이트 저장
                    states.setSearch_keyword(search_state.search)
                }else{
                    console.log(states.message)
                }
            }).catch(e => {
                console.log(e)
            })
        }

        // 스크롤 초기화
        window.scrollTo(0, 0)
    },[SearchParams.toString(), params.city, states.current_page])

    // 도시이름
    const city = params.city

    return {city}
}

export default useSubSubAppBusiness