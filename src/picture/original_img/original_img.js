import React, {useState} from 'react';
import './original_img.scss'
import default_data from '../../utilData/defaultData';
import '../../manage_scss_style/commonness/commonness.scss'

// 기본 이미지
function OriginalImg({url, hover, handler}){

    // =================================================
    // states //
    const [load, setLoad] = useState(false)

    return(
        <>
            {!load && <div className='original-img__default'></div>}

            {/* 실제 이미지 */}
            {url ? <img className={`original-img ${hover ? 'original-img__hover' : ''} not-user-sellect`}
                src={url}
                loading="lazy"
                onClick={handler ? handler : undefined}
                onLoad={() => setLoad(true)}></img>
                : null}
        </> 

    )
}

export default OriginalImg