import React from "react";
import './loading.scss'
import useMaterialLoadingStyle from "../hook-store/style-hooks/material_loading_style";


function Loading({part = null}){

    const {} = useMaterialLoadingStyle()

    return(
        <div className={`loading__container ${part ? 'loading-part-style' : 'loading-default-style'}`}>
            {/* {part ? <div className="loading__overay"></div> : null} */}
            <div className="loading__circle">
                <div className="loading__item-1">
                    <div className="loading__bar"></div>
                </div>
                <div className="loading__item-2">
                    <div className="loading__bar"></div>
                </div>
                <div className="loading__item-3">
                    <div className="loading__bar"></div>
                </div>
                <div className="loading__item-4">
                    <div className="loading__bar"></div>
                </div>
                <div className="loading__item-5">
                    <div className="loading__bar"></div>
                </div>
                <div className="loading__item-6">
                    <div className="loading__bar"></div>
                </div>
                <div className="loading__item-7">
                    <div className="loading__bar"></div>
                </div>
                <div className="loading__item-8">
                    <div className="loading__bar"></div>
                </div>
                <div className="loading__item-9">
                    <div className="loading__bar"></div>
                </div>
                <div className="loading__item-10">
                    <div className="loading__bar"></div>
                </div>
            </div>
        </div>
    )
}

export default Loading