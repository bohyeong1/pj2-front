import React from "react";
import './card.scss'
import { pop_three_texts } from '@/util/function/util_function';
import OriginalImg from "@/picture/original_img/original_img"
import default_data from "@/util/default_data/default_data";
import { useSelector } from "react-redux";
import useMaterialCardBusiness from '../hook-store/business-hooks/material-card-business'
import useMaterialCardStyle from '../hook-store/style-hooks/material-card-style'

function Card({data, custom_overlay}){

    // console.log('렌더링회수')

    // =================================================
    // redux states //
    const map_state = useSelector(state => state.map.map_target[data._id])
    const list_hover_state = useSelector(state => state.listhover.listhover_target[data._id])

    // =================================================
    // hooks //
    // business
    const {} = useMaterialCardBusiness()
    // style
    const {
        custom_overlay_click, 
        custom_overlay_hover, 
        custom_overlay_out
    } = useMaterialCardStyle(  
        {
            map_state,
            list_hover_state
        },
        undefined, undefined,
        {
            custom_overlay
        }
    )

    return(
        <div className="card-container">
            <div 
                className={`card-title ${map_state === data._id ? 'card-title__active' : ''} ${!map_state && list_hover_state === data._id ? 'card-title__hover' : ''} ${map_state !== data._id ? 'card-title__hover-on' : ''}`}
                data-key={data._id} 
                onClick={custom_overlay_click} 
                onMouseEnter={custom_overlay_hover} 
                onMouseLeave={custom_overlay_out}>
                {data ? `${pop_three_texts(data.price)}원` : ''}
            </div>
            <div className={`card-contents ${map_state === data._id ? 'card-contents__active' : ''}`}>
                <div className="card-contents__img">
                    <OriginalImg url={data?.main_img}/>
                </div>
                <div className='card-contents__text'>
                    {/* 숙소분류 */}
                    <div className="card-contents__tex1">{`${data?.category.name}`}</div>
                    {/* 제목 */}
                    <div className="card-contents__tex2">{data?.title}</div>
                    {/* 숙소평가 */}
                    <div className="card-contents__evaluation">
                        <div className="card-contents__star-box">
                            <img src={default_data?.d_imgs.star}></img>
                            <span>{`${data.average ? data.average.toFixed(2) : '미평가'}`}</span>
                        </div>
                        <span>{`${data?.counts_review !== 0 ? `${data.counts_review}명 평가` : ''}`}</span>
                    </div>
                    {/* 숙소주소 */}
                    <div className="card-contents__tex3">{data?.search_adress}</div>
                    {/* 가격 */}
                    <div className="card-contents__tex4">
                        <span>{data ? `${pop_three_texts(data.price)}`:''}</span>
                        <span>원</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card