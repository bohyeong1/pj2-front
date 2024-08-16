import React from 'react';
import './original_img.scss'
import default_data from '../../utilData/defaultData';
import '../../manage_scss_style/commonness/commonness.scss'
// 기본 이미지
function Original_img({url, hover, handler}){

    const default_img = default_data.default_img

    return(
        <>
            <img className={`original-img ${hover ? 'original-img__hover' : ''} not-user-sellect`}
            src={url ? url : default_img} onClick={handler ? handler : undefined}></img>
        </> 

    )
}

export default Original_img