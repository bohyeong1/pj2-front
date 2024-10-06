import React ,{useRef, useState, useContext} from "react";
import './img_regist_modal.scss'
import useModalImgRegistModalBusiness from "../hook-store/business-hooks/modal_img_regist_modal_business";
import useModalImgRegistModalStyle from "../hook-store/style-hooks/modal_img_regist_modal_style";
import { state_store, reference_store, get_img_url } from "@/util/function/util_function";
import { useSelector } from "react-redux";
import default_data from "@/util/default_data/default_data";
import Loading from '@/utilComponent/material/loading/loading'
import '@/manage_scss_style/commonness/commonness.scss'

const ImgRegistModal = React.memo(({img_modal_toggle, drop_img_state, setDrop_img_state, target_id}) => {
    // =================================================
    // refs //
    const img_input = useRef(null)                               

    // =================================================
    // redux state //
    const modal_state = useSelector(state => state.overay.open_target_id)

    // =================================================
    // states //
    const [img_state, setImg_state] = useState(null)
    const [img_url_state, setImg_url_state] = useState(null)
    const [loading, setLoading] = useState(null)

    // =================================================
    // hooks //
    // business
    const {set_img_file, regist_button} = useModalImgRegistModalBusiness(undefined,
        state_store([
            {
                'img_state' : img_state,
                'setImg_state' : setImg_state
            },
            {
                'loading' : loading,
                'setLoading' : setLoading
            }
        ]),
        reference_store([
            {
                'img_input' : img_input
            }
        ]),
            {
                'img_modal_toggle' : img_modal_toggle,    
                'drop_img_state' : drop_img_state,
                'setDrop_img_state' : setDrop_img_state,
                'target_id' : target_id        
            }
    )

    // style
    const {display_img, modal_close, delete_button, errors, register} = useModalImgRegistModalStyle(undefined,
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
                'img_input' : img_input
            }
        ]),
            {
                'img_modal_toggle' : img_modal_toggle,    
                'drop_img_state' : drop_img_state,
                'setDrop_img_state' : setDrop_img_state,
                'target_id' : target_id       
            }
    )

    // =================================================
    // hook form api에서 ref 설정 필요한 필드 //
    const {ref, onChange, ...rest} = register('image')

    return(
        modal_state === target_id ? 
        loading === false ? <Loading part = {true}></Loading> :
        <div className={'img-regist-modal__container'}>
            {/* 이미지 인풋값 관리하는 form */}
            <div className="img-regist-modal__container-input">
                <form id="mainForm">
                    <input type='file' 
                           ref={img_input} 
                           onChange={display_img}
                           {...rest}>
                    </input>
                </form>
            </div>  

            {/* header */}
            <div className="img-regist-modal__container-section1">
                <div className="img-regist-modal__container-section1-box1 modal-header">
                    <div className="img-regist-modal__container-section1-box1-part1">
                        <img src={default_data.d_imgs.close} 
                             onClick={modal_close}>                                
                        </img>
                    </div>
                    <div className="img-regist-modal__container-section1-box1-part2">사진 업로드</div>
                    <div className="img-regist-modal__container-section1-box1-part3" 
                         onClick={regist_button}>
                            추가
                    </div>
                </div>
                <div className="img-regist-modal__container-section1-box2">
                    {img_state ? `${img_state.name}` : '선택된 파일'}
                </div>                
            </div>

            {/* 이미지 */}
            <div className="img-regist-modal__container-section2">
                <div className="img-regist-modal__container-section2-box1">
                    {/* img */}
                    {img_state ? <img className="img-regist-modal__container-section2-box1-part1" 
                                      src={img_url_state ? img_url_state : null}>
                    </img> : null}
                    {/* 추가 버튼 */}
                    {!img_state ? <div className="img-regist-modal__container-section2-box1-part2" 
                                       onClick={regist_button}>
                        <img className="img-regist-modal__img" 
                             src={default_data.d_imgs.plus}>
                        </img>
                    </div> : null}
                    {/* 삭제 버튼 */}
                    {img_state ? <div className="img-regist-modal__container-section2-box1-part3">
                        <img className="img-regist-modal__img" 
                             src={default_data.d_imgs.transh_can} 
                             onClick={delete_button}>
                        </img>
                    </div> : null}
                    {/* error */}
                    {errors.image && <span className="input-alert-text">{errors.image.message}</span>}
                </div>                 
            </div>

            {/* footer */}
            <div className="img-regist-modal__container-section3">
                <div className="img-regist-modal__container-section3-box1"></div>
                <button type="submit" 
                        form={'mainForm'} 
                        className="img-regist-modal__container-section3-box2" 
                        onClick={set_img_file}>
                            등록
                </button>
            </div>
        </div>
        : null
    )
})

export default ImgRegistModal