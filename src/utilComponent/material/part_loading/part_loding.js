import React from "react";
import './part_loading.scss'
import useMaterialLoadingStyle from "../hook-store/style-hooks/material_loading_style";

function PartLoading({part = null}){

    const {} = useMaterialLoadingStyle()

    return (
        <div className={`part-loading__container ${part ? 'part-loading-part-style' : 'part-loading-default-style'}`}>
            {/* {part ? <div className="part-loading__overay"></div> : null} */}
            <div className="part-loading__circle">
                <div className="part-loading__item-1">
                    <div className="part-loading__bar"></div>
                </div>
                <div className="part-loading__item-2">
                    <div className="part-loading__bar"></div>
                </div>
                <div className="part-loading__item-3">
                    <div className="part-loading__bar"></div>
                </div>
                <div className="part-loading__item-4">
                    <div className="part-loading__bar"></div>
                </div>
                <div className="part-loading__item-5">
                    <div className="part-loading__bar"></div>
                </div>
                <div className="part-loading__item-6">
                    <div className="part-loading__bar"></div>
                </div>
                <div className="part-loading__item-7">
                    <div className="part-loading__bar"></div>
                </div>
                <div className="part-loading__item-8">
                    <div className="part-loading__bar"></div>
                </div>
                <div className="part-loading__item-9">
                    <div className="part-loading__bar"></div>
                </div>
                <div className="part-loading__item-10">
                    <div className="part-loading__bar"></div>
                </div>
            </div>
        </div>
    )
}

export default PartLoading