import { useNavigate } from "react-router-dom"

function useButtonLinkbtnBusiness(data, states, refs, props){

    // =================================================
    // navigate //
    const navigate = useNavigate()

    // =================================================
    // states //
    const {fetch_handler, drop_data, index} = props


    // =================================================
    // 숙소 업데이트 실행 //
    async function click_link_btn(url){
        try{
            await fetch_handler(drop_data)
            console.log('패치완료')

            if(!url){
                console.log('url을 읽어들일 수 없습니다.')
            }else{
                navigate(`/Acc_regist/${url}`)
            }
        }catch(e){
            console.log('logic check')
        }
    } 
    return {click_link_btn}
}
export default useButtonLinkbtnBusiness