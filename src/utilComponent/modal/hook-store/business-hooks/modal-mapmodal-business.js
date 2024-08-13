import { useEffect } from "react"
import { useSelector } from "react-redux"
import default_data from "../../../../utilData/defaultData"
import { make_query_obj } from "../../../../utilData/UtilFunction"
import connectData from "../../../../utilData/UtilFunction"
import { useLocation } from "react-router-dom"

function useModalMapModalBusiness(data, states, refs, props){
    
    // redux state
    const modal_data = useSelector(state => state.modaldata.modal_data)
    const overay_state = useSelector(state => state.overay.open_target_id)

    // states
    const {filter_data, setFilter_data} = states

    // props
    const {city} = props

    // hash
    const location = useLocation()
    const hash_url = location.hash

    // 데이터 패치 lazy loading
    useEffect(()=>{
        if(overay_state){
            console.log('확인')
            // 스테이트 -> 서버로 보내는 쿼리 객체로 변환
            const {final_key} = make_query_obj(modal_data)
            const limit = 30    //30개 데이터 맵 출력
            console.log(final_key)
            connectData(`${default_data.d_base_url}/api/common/submodal?limit=${limit}`,'POST',{
                city:city,
                filters:final_key
            })
            .then(result => {
                // console.log(result)
                if(result.code === 200){
                    // 숙소 데이터 저장
                    setFilter_data(result.accomodations)
                }else{
                    throw new Error(states.message)
                }
            }).catch(e => {
                console.log(e)
            })
        }   

    },[modal_data])

    return {}
}
export default useModalMapModalBusiness