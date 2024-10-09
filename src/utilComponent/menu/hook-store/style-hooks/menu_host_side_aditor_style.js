import { useEffect } from "react"
import { split_text } from "@/util/function/util_function"

function useMenuHostSideAditorStyle(data, states, refs, props){

    // =================================================
    // refs //
    const {text_area_ref} = refs

    const {filtered_text,
           setFiltered_text} = states

    // =================================================
    // props //
    const {acc_data} = props

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
                    <span>
                        {acc_data.discount ? `${acc_data.discount.date.date}일 이상 예약 시 ${acc_data.discount.rate}% 할인` : '할인 설정'}
                    </span>
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
                    <textarea ref={text_area_ref} 
                              readOnly 
                              className="host-side-aditor__sellect-box-summary-text"
                              value={!filtered_text ? acc_data.summary : filtered_text}></textarea>
                </div>
            )
        }
        else if(mapping_data === '이용 규칙'){
            return(
                <div className="host-side-aditor__sellect-box-rules">
                    {acc_data.rules.slice(0,4).map((el, id) => {
                        return (
                            <div key={id}>
                                <span>{el.text}</span>
                                <span style={{color : el.state ? '#1273E4' : '#C13515'}}>{el.state ? '허용' : '비허용'}</span>
                            </div>
                        )
                    })}
                </div>
            )
        }
        else{
            console.log('logic check')
            return null
        }        
    }

    // =================================================
    // text split //
    useEffect(()=>{
        if(text_area_ref && acc_data){
            split_text(3, text_area_ref.current, setFiltered_text)
        }
    },[acc_data])

    return {render_box_output}
}

export default useMenuHostSideAditorStyle