import React, {forwardRef, useRef, useState} from "react";
import default_data from "../../../utilData/defaultData";
import './map-modal.scss'
import Side_menu from "../../menu/side-menu/side-menu";
import SubList from "../../../pages/sub/subList/SubList";
import Kakaomap from "../../material/kakaomap/Kakaomap";

import { state_store, reference_store } from "../../../utilData/UtilFunction";
import useModalMapModalBusiness from "../hook-store/business-hooks/modal-mapmodal-business";
import useModalMapModalStyle from "../hook-store/style-hooks/modal-mapmodal-style";

const Sub_modal = forwardRef((props, ref) => {

    // ref
    const modal_ref = useRef(null)
    const filter_ref = useRef(null)
    const list_ref = useRef(null)

    // props
    const {data, city} = props
 
    // state
    const [filter_data, setFilter_data] = useState(null)
  
    ////////////////////////////////////
    ////////////// hooks ///////////////
    ////////////////////////////////////
    // business
    const {} = useModalMapModalBusiness(undefined,
        state_store([
            {
                'filter_data':filter_data,
                'setFilter_data':setFilter_data
            }
        ]), undefined,
        {
            'city':city
        }
    )

    // style
    const {close_btn} =  useModalMapModalStyle(undefined,undefined,
        reference_store([
            {
                'modal_ref':modal_ref
            },
            {
                'filter_ref':filter_ref
            },
            {
                'list_ref':list_ref
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
                    <div className="sub-modal__filter" ref={filter_ref}>
                        <div className="sub-modal__filter-container">
                            <Side_menu modal={true}></Side_menu>
                        </div>
                    </div>
                    {/* display accomodations */}
                    <div className="sub-modal__display" ref={list_ref}>
                        <SubList modal={true} data={filter_data ? filter_data : data} city={city}></SubList>
                    </div>
                    {/* map */}
                    <div className="sub-modal__map">
                        <Kakaomap 
                        city = {city} 
                        type = {'default'}
                        data={filter_data ? filter_data : data}/>
                    </div>
                </div>
            </div>
        </div>

    )
})

export default Sub_modal