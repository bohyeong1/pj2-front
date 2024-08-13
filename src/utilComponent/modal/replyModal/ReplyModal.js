import React from "react";
import './ReplyModal.css'
import default_data from "../../../utilData/defaultData";


function ReplyModal({data, replyModalState,replyModal}){
    

    // console.log(data)

    return(
    <div className="ReplyModal" style={{display:`${replyModal ? 'block':'none'}`}}>
        <div className="ReplyModal-wrapper"></div>
        <div className="ReplyModal-container">
            <div className="ReplyModal-con-sec1">
                <div className="ReplyModal-con-s1-b1">
                    <img src={default_data.d_imgs.close} style={{cursor:'pointer'}} onClick={()=>{replyModalState()}}></img>
                </div>

                <div className="ReplyModal-con-s1-b2">{`${data?.writerid.name}님`}</div>
                <div style={{width:'40px'}}></div>
            </div>
            <textarea readOnly className="ReplyModal-con-sec2" value={data?.text}>
                


            </textarea>

        </div>  
    </div>

    )

}

export default ReplyModal