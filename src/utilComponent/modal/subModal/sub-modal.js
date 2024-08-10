import React, {forwardRef, useRef} from "react";
import default_data from "../../../utilData/defaultData";
import './sub-modal.css'
import Side_menu from "../../menu/side-menu/side-menu";
import SubList from "../../../pages/sub/subList/SubList";

import { state_store, reference_store } from "../../../utilData/UtilFunction";
import useModalSubModalBusiness from "../hook-store/business-hooks/modal-submodal-business";
import useModalSubModalStyle from "../hook-store/style-hooks/modal-submodal-style";

const Sub_modal = forwardRef((props, ref) => {

    // ref
    const modal_ref = useRef(null)

    // props
    const {data} = props
    
    ////////////////////////////////////
    ////////////// hooks ///////////////
    ////////////////////////////////////
    // business
    const {} = useModalSubModalBusiness()

    // style
    const {close_btn} =  useModalSubModalStyle(undefined,undefined,
        reference_store([
            {
                'modal_ref':modal_ref
            }
        ]),
        {
            handle_ref:ref
        })


    return (
        <div className="sub-modal__wrapper" ref={modal_ref}>
            {/* header */}
            <div className="sub-modal__container">
                <div className="sub-modal__header">
                    <button className="sub-modal__closebtn" onClick={close_btn}>
                        <img className="sub-modal__closebtn-img" src={default_data.d_imgs.close}></img>
                    </button>
                    <div>지도</div>
                    <div className="sub-modal__gurabox1"></div>
                </div>

                {/* contents */}
                <div className="sub-modal__contents-container">
                    {/* filter section */}
                    <div className="sub-modal__filter">
                        <div className="sub-modal__filter-container">
                            <Side_menu modal={true}></Side_menu>
                        </div>
                    </div>
                    {/* display accomodations */}
                    <div className="sub-modal__display">
                        <SubList modal={true} data={data}></SubList>
                    </div>
                    {/* map */}
                    <div className="sub-modal__map">

                    </div>
                </div>
            </div>
        </div>

    )
})

export default Sub_modal