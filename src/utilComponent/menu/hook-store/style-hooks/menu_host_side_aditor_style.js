
function useMenuHostSideAditorStyle(data, states, refs, props){

    // =================================================
    // render sellect box output //
    function render_box_output(mapping_data, acc_data){
        if(!acc_data){
            console.log('check front logic')
            return  null
        }

        // switch case, if else, 더좋은 방법?
        if(mapping_data === '이름'){
            return(
                <div className="host-side-aditor__sellect-box-name">
                    <span>{acc_data.title}</span>
                </div>
            )
        }
        else if(mapping_data === '숙소 유형'){
            return(
                <div className="host-side-aditor__sellect-box-category">
                    <span>{acc_data.space_category.name} · {acc_data.category.name}</span>
                </div>
            )
        }
        else if(mapping_data === '편의 시설'){
            return(
                <div className="host-side-aditor__sellect-box-service-facility">
                    {acc_data.service_facility.slice(0,3).map((el,id) => {
                        return (
                            <div key={id}>
                                <img src={el.url}></img>
                                <span>{el.name}</span>
                            </div>
                        )
                    })}
                    {acc_data.service_facility.length > 3 ? 
                    <span className="host-side-aditor__sellect-box-service-facility-alram">외 {acc_data.service_facility.length - 3}개</span>
                    : null}
                </div>
            )
        }
        else if(mapping_data === '포토'){
            return(
                <div className="host-side-aditor__sellect-box-photo">
                    <div className="host-side-aditor__img-main">
                        <img src={acc_data.main_img}></img>
                    </div>
                    <div className="host-side-aditor__img-sub1">
                        <img src={acc_data.sub_img[0]}></img>
                    </div>
                    <div className="host-side-aditor__img-sub2">
                        <img src={acc_data.sub_img[1]}></img>
                    </div>                    
                </div>
            )
        }
        else if(mapping_data === '키워드'){
            return(
                <div className="host-side-aditor__sellect-box-keyword">
                    {acc_data.keywords.slice(0,3).map((el,id) => {
                        return (
                            <div key={id}>
                                <img src={el.url}></img>
                                <span>{el.name}</span>
                            </div>
                        )
                    })}
                    {acc_data.service_facility.length > 3 ? 
                    <span className="host-side-aditor__sellect-box-keyword-alram">외 {acc_data.keywords.length - 3}개</span>
                    : null}
                </div>
            )
        }
        else if(mapping_data === '요금 책정'){
            return(
                <div className="host-side-aditor__sellect-box-price">
                    <span>1박당 - {acc_data.price}원</span>
                    <span>할인 설정</span>
                </div>
            )
        }
        else if(mapping_data === '게스트 수'){
            return(
                <div className="host-side-aditor__sellect-box-capacity">
                    <span>게스트 {acc_data.capacity}명</span>
                </div>
            )
        }
        else if(mapping_data === '설명'){
            return(
                <div className="host-side-aditor__sellect-box-summary"> 
                    <span>{acc_data.summary}</span>
                </div>
            )
        }
        else if(mapping_data === '숙소 이용규칙'){
            return(
                <div className="host-side-aditor__sellect-box-rules">
                    {/* <span>체크인 : {acc_data.check_time.check_in}</span>
                    <span>체크아웃 : {acc_data.check_time.check_out}</span> */}
                    db logic check 해야할 곳
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

export default useMenuHostSideAditorStyle