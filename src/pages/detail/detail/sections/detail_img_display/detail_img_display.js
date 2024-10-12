import OriginalImg from "@/picture/original_img/original_img"
import './detail_img_display.scss'

function DetailImgDisplay({click_handler, data}){

    return (
        <div className="detail-img-display__img">
            <div className="detail-img-display__img-box1" 
                 onClick={click_handler}>
                <OriginalImg url={data?.main_img} 
                             hover={true}/>                                    
            </div>
            <div className="detail-img-display__img-box2">
                {data?.sub_img.slice(0,4).map((el, id)=>{
                    return(
                        <div className="detail-img-display__img-item" 
                            key={id} 
                            onClick={click_handler}>
                            <OriginalImg url={el} 
                                         hover={true}/>                                                
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default DetailImgDisplay