import Reactm, {useState, useEffect} from "react";
import './LinkBtn.css'
import { useNavigate } from "react-router-dom";

function LinkBtn({text, url, fetchHandlerFun, dropData, index}){
    // console.log(fetchHandlerFun, dropData, '인덱스 :', index)



    const navigate = useNavigate()

    async function clicklinkBtn(url){

        try{
            await fetchHandlerFun(dropData)
            console.log('패치완료')
            if(!url){
                alert('url을 읽어들일 수 없습니다.')
                return
            }else{
                navigate(`/Acc_regist/${url}`)
            }
        }catch(e){
            console.log('데이터없는 링크이동')
            if(!url){
                alert('url을 읽어들일 수 없습니다.')
                return
            }else{
                navigate(`/Acc_regist/${url}`)
            }
        }
    } 


    return(
        <button  style={{opacity : `${!url ? '0' : '1'}`, cursor: `${!url ? 'initial' : 'pointer'}`}} disabled={!url} className="link-btn" onClick={()=>{clicklinkBtn(url)}}>{text}</button>
    )
}

export default LinkBtn