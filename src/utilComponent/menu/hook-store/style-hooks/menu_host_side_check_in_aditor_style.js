
function UseMenuHostSideCheckInAditorStyle(data, states, refs, props){

    // =================================================
    // props //
    const {acc_data} = props

    // =================================================
    // render sellect box output //
    function render_box_output(mapping_data){
        if(!acc_data){
            console.log('check front logic')
            return  null
        }

        // render
        if(mapping_data.name === '체크인'){
            return(
                <div className="host-side-aditor__sellect-box-check-in">
                    <span>
                        {acc_data.check_time && acc_data.check_time.check_in ? 
                            `${acc_data.check_time.check_in}:00 시` : mapping_data.default}
                    </span>
                </div>
            )
        }
        else if(mapping_data.name === '체크인 방법'){
            return(
                <div className="host-side-aditor__sellect-box-check-in-method">
                    <span>
                        {acc_data.check_method && acc_data.check_method.check_in ? 
                            acc_data.check_method.check_in : mapping_data.default}
                    </span>
                </div>
            )
        }
        else if(mapping_data.name === '찾아오는 방법'){
            return(
                <div className="host-side-aditor__sellect-box-custom-path">
                    <span>
                        {acc_data.custom_navigation ? 
                            acc_data.custom_navigation : mapping_data.default}
                    </span>
                </div>
            )
        }
        else if(mapping_data.name === '와이파이 세부 정보'){
            return(
                <div className="host-side-aditor__sellect-box-wifi-information">
                    {acc_data.wifi_information ? 
                        <>
                            <span>네트워크 : {acc_data.custom_navigation.name}</span>
                            <span>비밀번호 : {acc_data.custom_navigation.password}</span>
                        </>
                        : mapping_data.default}
                </div>
            )
        }
        else if(mapping_data.name === '숙소 메뉴얼'){
            return(
                <div className="host-side-aditor__sellect-box-manual">
                     <span>
                        {acc_data.manual ? 
                            acc_data.manual : mapping_data.default}
                    </span>
                </div>
            )
        }
        else if(mapping_data.name === '체크아웃'){
            return(
                <div className="host-side-aditor__sellect-box-check-out">
                    <span>
                        {acc_data.check_time && acc_data.check_time.check_out ? 
                            `${acc_data.check_time.check_out}:00 시` : mapping_data.default}
                    </span>
                </div>
            )
        }
        else if(mapping_data.name === '체크아웃 방법'){
            return(
                <div className="host-side-aditor__sellect-box-check-out-method"> 
                    <span>
                        {acc_data.check_method && acc_data.check_method.check_out ? 
                            acc_data.check_method.check_out : mapping_data.default}
                    </span>
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