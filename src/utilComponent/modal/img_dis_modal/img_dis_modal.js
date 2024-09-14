import React, {useRef} from "react";
import './img_dis_modal.scss'
import default_data from "../../../utilData/defaultData";
import Lslide_btn from "../../Button/slideBtn/Lslide-btn/Lslide_btn";
import Rslide_btn from "../../Button/slideBtn/Rslide-btn/Rslide_btn";
import { state_store, reference_store } from "../../../utilData/UtilFunction";
import useModalImgdismodalStyle from "../hook-store/style-hooks/modal_imgdismodal_style";
import { Swiper, SwiperSlide } from "swiper/react";
import Original_img from "../../../picture/original_img/original_img";
import { useSelector } from "react-redux"

function Img_dis_modal({data, imgs, img_modal_toggle}){

    // =================================================
    // refs //
    const target = useRef(null)
    const target_text = useRef(null)

    // =================================================
    // redux state //
    const modal_state = useSelector(state => state.overay.open_target_id)

    // =================================================
    // hooks //
    // style
    const { RbtnState, LbtnState, swiper_ref, moveRSlide, moveLslide, swiper_change} = useModalImgdismodalStyle(undefined, undefined,reference_store([
        {
            'target':target
        },
        {
            'target_text':target_text
        }
    ]),{
        'acc_data':data
    })

    return(
    modal_state === 'img-dis-modal'? 
    <div className="img-dis-modall">
        <div className="img-dis-modall__container">
            {/* header */}
            <div className="img-dis-modall__con-section1">
                <div className="img-dis-modall__container-section1-button">
                    <img src={default_data.d_imgs.close} onClick={img_modal_toggle}></img>
                </div>
                <div className="img-dis-modall__container-section1-part2">{data?.title}</div>
                <div className="img-dis-modall__container-section1-gurabox"></div>
            </div>
            {/* contents */}
            <div className="img-dis-modall__container-section2">
                {/* gurabox */}
                <div className="img-dis-modall__gurabox">
                   {/* left btn*/}
                    <Lslide_btn btnState={LbtnState} handleFunction = {moveLslide}></Lslide_btn>
                    {/* right btn*/}
                    <Rslide_btn btnState={RbtnState} handleFunction = {moveRSlide}></Rslide_btn>
                    {/* 상태 text */}
                    <div className="img-dis-modall__gurabox-text-container">
                        <span ref={target_text}>
                            {`${data.title} | 1`}
                        </span>
                        <span>
                            {`/${imgs.length}`}
                        </span>
                    </div>
                </div>
                {/* slider */}
                <div className="img-dis-modall__slider">
                    <Swiper ref={swiper_ref} spaceBetween={0} slidesPerView={1} onSwiper={(target)=>{swiper_ref.current=target}} onSlideChange={swiper_change}>
                        {imgs?.map((el, id) => {
                            return(
                                <SwiperSlide key={id}>
                                    <div className="img-dis-modall__img">
                                        <Original_img url={el}></Original_img>
                                    </div>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </div>

            {/* img list */}
            <div className="img-dis-modal__container-section3">
                <div className="img-dis-modal__list">
                    {imgs?.map((el,id)=>{
                        return(
                            <div className="img-dis-modal__list-item" key={id}>
                                <Original_img url={el}></Original_img>
                            </div>
                        )
                    })}
                </div>
                {/* target */}
                <div className="img-dis-modal__target" ref={target}></div>
            </div>
        </div>  
    </div>
    : null
    )

}

export default Img_dis_modal