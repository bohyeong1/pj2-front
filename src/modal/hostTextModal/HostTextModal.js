import React, {useRef} from "react";
import './HostTextModal.css';
import default_data from "../../utilData/defaultData";
import connectData from "../../utilData/UtilFunction";


function HostTextModal({data, hostModal, hostModalState}){

    const userData = JSON.parse(sessionStorage.getItem('userData')) ///유저데이터

    // text 상태 div Ref
    const host_modal_stringstate = useRef()  ///글자개수
    const host_modal_alert = useRef()          ///경고 text
    const host_modal_input = useRef()

    function HostModalTextInputChange(){
        const length = host_modal_input.current.value.length
        host_modal_stringstate.current.innerText = `${length}/150`
        if(length>150){
            host_modal_alert.current.style.display = 'block'
        }else{
            host_modal_alert.current.style.display = 'none'
        }
    }

    // 호스트 텍스트 수정
    async function submitHostdata(){
        const hostData = await connectData(`${default_data.d_base_url}/api/users/host`,'PUT',{
            userId : userData.userId,
            hostText : host_modal_input.current.value
        })
        sessionStorage.setItem('userData', JSON.stringify(hostData.updatedUser))
        hostModalState()
    }



    return(
        <div className="HostTextModal"  style={{display:`${hostModal ? 'block':'none'}`}}>
            <div className="HostTextModal-wrapper"></div>
            <div className="HostTextModal-container">
                <div className="HostTextModal-con-sec1">
                    <div className="HostTextModal-con-s1-b1">
                        <img src={default_data.d_imgs.close} style={{cursor:'pointer'}} onClick={()=>{hostModalState()}}></img>
                    </div>    
                    <div className="HostTextModal-con-s1-b2">{`${data?.name}님`}</div>
                    <button className="HostTextModal-con-s1-b3" onClick={submitHostdata}>수정하기</button>
                </div>

                <textarea className="HostTextModal-con-sec2" ref={host_modal_input} spellCheck={false} placeholder={data.text ? data.text : '게스트에게 자신을 소개해 주세요!'}
                onChange={HostModalTextInputChange}>           
        
                </textarea>

                <div className="HostTextModal-con-sec3">
                    <div ref={host_modal_stringstate} className="HostTextModal-con-s3-b1">0/400</div>
                    <div ref={host_modal_alert} className="HostTextModal-con-s3-b2" style={{color:'red', display:'none'}}>400자 까지 입력할 수 있습니다</div>
                </div>
            </div>  
        </div>
    )


}

export default HostTextModal