import { useNavigate } from "react-router-dom"

function useButtonLinkbtnBusiness(data, states, refs, props){

    // =================================================
    // navigate //
    const navigate = useNavigate()

    // =================================================
    // context state //
    const {
        host_acc,
        setHost_acc
    } = data

    // =================================================
    // states //
    const {
        fetch_handler, 
        drop_data, 
        index, 
        fetch_state
    } = props

    // =================================================
    // 숙소 업데이트 실행 //
    async function click_link_btn(url){
        try{
            if(!url){
                console.log('url을 읽어들일 수 없습니다.')
                return
            }

            // acc data index값 최신화
            const current_index = host_acc && index < host_acc.acc_step ? host_acc.acc_step : index

            // fetch하면서 다음페이지 가기
            if(fetch_handler && fetch_state){
                const response = await fetch_handler(drop_data, current_index)
                // fetch 완료
                if(response){
                    navigate(`/host/regist/${response.accomodation._id}/${url}`)
                }else{
                    // error page로 리다이랙션 나중에 시킬 것.
                    console.log('서버로 부터 오류가 발생했습니다.')
                }
            }
            // 동일한 인풋값이어서 fetch 안하고 다음페이지 가기
            else if(fetch_handler && !fetch_state){
                if(!host_acc){
                    console.log('logic check')
                    return
                }
                navigate(`/host/regist/${host_acc._id}/${url}`)
            }
            // 뒤로가기
            else{
                if(!host_acc){
                    console.log('logic check')
                    return
                }
                navigate(`/host/regist/${host_acc._id}/${url}`)
            }
        }catch(e){
            console.log('logic check')
        }
    } 
    return {click_link_btn}
}
export default useButtonLinkbtnBusiness