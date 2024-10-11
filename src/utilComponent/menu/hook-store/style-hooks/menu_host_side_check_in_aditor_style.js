import { useEffect } from "react"
import { split_text } from "@/util/function/util_function"

function UseMenuHostSideCheckInAditorStyle(data, states, refs, props){
    // =================================================
    // refs //
    const {text_area1_ref,
           text_area2_ref} = refs

    // =================================================
    // render sellect box output //
    function render_box_output(mapping_data, acc_data){

        // render
        if(mapping_data.name === '체크인'){
            return(
                <div className="host-side-aditor__sellect-box-check-in">
                    <div>
                        <span>시간 </span>
                        <span>·</span>
                        <span>
                            {acc_data.check_time && acc_data.check_time.check_in ? 
                                `${acc_data.check_time.check_in.time}:00 시` : mapping_data.default}
                        </span>
                    </div>
                    <div>
                        <span>체크인 방법</span>
                        <span>
                            {acc_data.check_method && acc_data.check_method.check_in ? 
                                `${acc_data.check_method.check_in.name}` : mapping_data.default}
                        </span>
                    </div>

                </div>
            )
        }
        else if(mapping_data.name === '찾아오는 방법'){
            return(
                <div className="host-side-aditor__sellect-box-custom-navigation">
                    <pre ref={text_area1_ref}
                              className="host-side-aditor__sellect-box-custom-navigation-text"
                    >    
                        {acc_data.custom_navigation ? acc_data.custom_navigation : mapping_data.default}                            
                    </pre>
                </div>
            )
        }
        else if(mapping_data.name === '와이파이 세부 정보'){
            return(
                <div className="host-side-aditor__sellect-box-wifi-information">
                    {acc_data.wifi_information ? 
                        <>
                            <span>아 이 디 · {acc_data.wifi_information.id}</span>
                            <span>비밀번호 · {acc_data.wifi_information.password}</span>
                        </>
                        : mapping_data.default}
                </div>
            )
        }
        else if(mapping_data.name === '숙소 메뉴얼'){
            return(
                <div className="host-side-aditor__sellect-box-manual">
                    <pre ref={text_area2_ref}
                              className="host-side-aditor__sellect-box-manual-text"
                    >        
                        {acc_data.manual ? acc_data.manual : mapping_data.default}                        
                    </pre>
                </div>
            )
        }
        else if(mapping_data.name === '체크아웃'){
            return(
                <div className="host-side-aditor__sellect-box-check-out">
                    <div>
                        <span>시간 </span>
                        <span>·</span>
                        <span>
                            {acc_data.check_time && acc_data.check_time.check_out ? 
                                `${acc_data.check_time.check_out.time}:00 시` : mapping_data.default}
                        </span>
                    </div>
                    <div>
                        <span>체크아웃 방법</span>
                        <div>
                            {acc_data.check_method && acc_data.check_method.check_out && acc_data.check_method.check_out.length ? 
                                acc_data.check_method.check_out.map((el,id)=>{
                                    return (
                                        <span key={id}>{el.name}</span> 
                                    )
                                }) : mapping_data.default}
                        </div>
                    </div>
                </div>
            )
        }
        else if(mapping_data.name === '커뮤니케이션'){
            return(
                <div className="host-side-aditor__sellect-box-comunication">
                    <span>
                        {acc_data.comunication ? 
                            acc_data.comunication.name : mapping_data.default}
                    </span>
                </div>
            )
        }
        else{
            console.log('logic check')
            return null
        }        
    }

    return {render_box_output}
}

export default UseMenuHostSideCheckInAditorStyle