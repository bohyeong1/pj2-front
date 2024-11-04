import './user_profile_img.scss'
import { useState } from 'react';
import useMaterialUserProfileImgStyle from '../hook-store/style-hooks/material_user_profile_img_style'
import { state_store } from "@/util/function/util_function";

function UserProfileImg({url, user_data, hover, handler}){

    // =================================================
    // states //
    const [load, setLoad] = useState(false)

    // =================================================
    // hooks //
    // style
    const {} = useMaterialUserProfileImgStyle(undefined,
        state_store([
            {load, setLoad}
        ]),
        undefined,
        {
            user_data
        }
    )

    return (
        <div className='usr-profile-img__container'>
            {!load && <div className='user-profile-img__loading'></div>}

            {/* 실제 이미지 */}
            {url && 
            <img 
                className={`user-profile-img ${hover ? 'user-profile-img__hover' : ''} not-user-sellect`}
                src={url}
                loading="lazy"
                onClick={handler ? handler : undefined}
                onLoad={() => setLoad(true)}/>}

            {/* default  */}
            {!url && 
            <div 
                className={`user-profile-img__default-profile ${hover ? 'user-profile-img__hover' : ''} not-user-sellect`}
                onClick={handler ? handler : undefined}
                style={{backgroundColor : user_data.defaultProfile}}>
                <span>{user_data.name.slice(0,1)}</span>
            </div>}
        </div> 
    )
}

export default UserProfileImg