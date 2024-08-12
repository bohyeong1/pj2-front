import { useEffect } from "react"
import { useSelector } from "react-redux"
import default_data from "../../../../utilData/defaultData"

function useModalMapModalBusiness(data, states, refs, props){
    
    // redux state
    const modal_data = useSelector(state => state.modaldata.modal_data)

    console.log(modal_data)


    // fetch
    // // 데이터 패치
    // useEffect(()=>{
    //     const page = 1      
    //     const limit = 30    //30개 데이터 맵 출력

    //     connectData(`${default_data.d_base_url}/api/common/sub?page=${page}&limit=${limit}`,'POST',{
    //         city:select_city,
    //         filters:final_key
    //     })
    //     .then(result => {
    //         // console.log(result)
    //         if(result.code === 200){
    //             // 숙소 데이터 저장
    //             states.setList(result.accomodations)
    //         }else{
    //             throw new Error(states.message)
    //         }
    //     }).catch(e => {
    //         console.log(e)
    //     })

    // },[modal_data])

    return {}
}
export default useModalMapModalBusiness