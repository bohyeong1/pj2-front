import React ,{useRef, useState, useContext} from "react";
import { ImgContext } from "../../../context/img_context/config/img_context";
import './img_regist_modal.scss'
import default_data from "../../../utilData/defaultData";
import useModalImgRegistModalBusiness from "../hook-store/business-hooks/modal_img_regist_modal_business";
import useModalImgRegistModalStyle from "../hook-store/style-hooks/modal_img_regist_modal_style";
import { state_store, reference_store } from "../../../utilData/UtilFunction";
import { useSelector } from "react-redux";
import { get_img_url } from "../../../utilData/UtilFunction";
import '../../../manage_scss_style/commonness/commonness.scss'

function ImgRegistModal({img_modal_toggle}){
    // =================================================
    // refs //
    const main_img_input = useRef(null)               
    const main_img_form = useRef(null)                 

    // =================================================
    // context states //
    const { main_img_state, setMain_img_state } = useContext(ImgContext)

    // =================================================
    // redux state //
    const modal_state = useSelector(state => state.overay.open_target_id)

    // =================================================
    // states //
    const [img_state, setImg_state] = useState(null)
    const [img_url_state, setImg_url_state] = useState(main_img_state ? get_img_url(main_img_state) : null)

    // =================================================
    // hooks //
    // business
    const {set_img_file, regist_button} = useModalImgRegistModalBusiness({
            'main_img_state' : main_img_state,
            'setMain_img_state' : setMain_img_state
        },
        undefined,
        reference_store([
            {
                'main_img_input' : main_img_input
            },
            {
                'main_img_form' : main_img_form
            }
        ]),
        {
            'img_modal_toggle' : img_modal_toggle
        }
    )

    // style
    const {display_img, modal_close, delete_button} = useModalImgRegistModalStyle({
        'main_img_state' : main_img_state,
        'setMain_img_state' : setMain_img_state
        },
        state_store([
            {
                'img_url_state' : img_url_state,
                'setImg_url_state' : setImg_url_state
            },
            {
                'img_state' : img_state,
                'setImg_state' : setImg_state
            }
        ]),
        reference_store([
            {
                'main_img_input' : main_img_input
            }
        ]),
        {
            'img_modal_toggle' : img_modal_toggle
        }
    )

    return(
        modal_state === 'img-regist-modal' ? 
        <div className={'img-regist-modal__container'}>
            {/* 이미지 인풋값 관리하는 form */}
            <div className="img-regist-modal__container-input">
                <form id="mainForm" ref={main_img_form}>
                    <input type='file' id="mainImg" ref={main_img_input} onChange={display_img}></input>
                </form>
            </div>  

            {/* header */}
            <div className="img-regist-modal__container-section1">
                <div className="img-regist-modal__container-section1-box1 modal-header">
                    <div className="img-regist-modal__container-section1-box1-part1">
                       <img src={default_data.d_imgs.close} onClick={modal_close}></img>
                    </div>
                    <div className="img-regist-modal__container-section1-box1-part2">사진 업로드</div>
                    <div className="img-regist-modal__container-section1-box1-part3" onClick={regist_button}>추가</div>
                </div>
                <div className="img-regist-modal__container-section1-box2">
                    {img_state ? `${img_state.name}` : '선택된 파일'}
                </div>                
            </div>

            {/* 메인이미지 */}
            <div className="img-regist-modal__container-section2">
                <div className="img-regist-modal__container-section2-box1">
                    {img_state ? <img className="img-regist-modal__container-section2-box1-part1" src={img_url_state ? img_url_state : null}>
                    </img> : null}
                    {/* 추가 버튼 */}
                    {!img_state ? <div className="img-regist-modal__container-section2-box1-part2" onClick={regist_button}>
                        <img className="img-regist-modal__img" src={default_data.d_imgs.plus}></img>
                    </div> : null}
                    {/* 삭제 버튼 */}
                    {img_state ? <div className="img-regist-modal__container-section2-box1-part3">
                        <img className="img-regist-modal__img" src={default_data.d_imgs.transh_can} onClick={delete_button}></img>
                    </div> : null}
                </div>                 
            </div>

            {/* footer */}
            <div className="img-regist-modal__container-section3">
                <div className="img-regist-modal__container-section3-box1"></div>
                <button type="submit" form={'mainForm'} className="img-regist-modal__container-section3-box2" onClick={set_img_file}>등록</button>
            </div>
        </div>
        : null
    )
}

export default ImgRegistModal