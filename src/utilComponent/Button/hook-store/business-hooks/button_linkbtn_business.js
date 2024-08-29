import { useNavigate } from "react-router-dom"
import session_storage from "../../../../sessionStorage/session_storage"

function useButtonLinkbtnBusiness(data, states, refs, props){

    // =================================================
    // navigate //
    const navigate = useNavigate()

    // =================================================
    // states //
    const {fetch_handler, drop_data, index, fetch_state} = props

    // =================================================
    // const //
    const currnet_home = session_storage.load('house') || null

    // =================================================
    // 숙소 업데이트 실행 //
    async function click_link_btn(url){
        try{
            if(!url){
                console.log('url을 읽어들일 수 없습니다.')
                return
            }
            // acc data index값 최신화
            const current_index = currnet_home && index < currnet_home.acc_step ? currnet_home.acc_step : index

            // fetch하면서 다음페이지 가기
            if(fetch_handler && fetch_state){
                const server_state = await fetch_handler(drop_data, current_index)
                // fetch 완료
                if(server_state){
                    navigate(`/Acc_regist/${url}/${server_state.accomodation._id}`)
                }else{
                    console.log('서버로 부터 오류가 발생했습니다.')
                }
            }
            // 동일한 인풋값이어서 fetch 안하고 다음페이지 가기
            else if(fetch_handler && !fetch_state){
                if(!currnet_home){
                    console.log('logic check')
                    return
                }
                navigate(`/Acc_regist/${url}/${currnet_home._id}`)
            }
            // 뒤로가기
            else{
                if(!currnet_home){
                    console.log('logic check')
                    return
                }
                navigate(`/Acc_regist/${url}/${currnet_home._id}`)
            }
        }catch(e){
            console.log('logic check')
        }
    } 
    return {click_link_btn}
}
export default useButtonLinkbtnBusiness