import React ,{useRef} from "react";
import './img_regist_modal.scss'
import default_data from "../../../utilData/defaultData";
import useModalImgRegistModalBusiness from "../hook-store/business-hooks/modal_img_regist_modal_business";
import { useSelector } from "react-redux";
import '../../../manage_scss_style/commonness/commonness.scss'

function ImgRegistModal({mainState, deliverFile, img_modal_toggle, deliverModalState}){
    // =================================================
    // refs //
    const img_regist_modal_container = useRef(null)     //모달 컴포넌트 전체
    const main_img_input = useRef(null)                 //그림등록 main input
    const sub_img_input = useRef([])                    //그림등록 sub input
    const main_img_form = useRef(null)                  //메인 이미지 폼
    const sub_img_form = useRef(null)                   //서브 이미지폼
    const main_modal_img = useRef(null)                 //메인이미지 디스플레이
    const sub_modal_img = useRef([])                    //서브 이미지 디스플레이
    const modal_add_btn = useRef(null)                  //추가버튼

    // =================================================
    // redux state //
    const modal_state = useSelector(state => state.overay.open_target_id)

    // =================================================
    // hooks //
    // business
    const {} = useModalImgRegistModalBusiness()

    ///////이미지 onchange
    function displayModalImg(){       
        if(!mainState){
            const m_blob = new Blob([main_img_input.current.files[0]], { type: 'image/jpeg' });      
            const imageSrc  = URL.createObjectURL(m_blob)
            const mountDiv = main_modal_img
            mountDiv.current.src = imageSrc
        }else
         ////서브 이미지에 순차적으로 담기
        {
            const mountDiv = sub_modal_img
            const arrayMountDiv = Array.from(mountDiv.current)

            for(let div of arrayMountDiv){
                if(!(div.src)){
                    const index = arrayMountDiv.indexOf(div)
                    const m_blob = new Blob([sub_img_input.current[index].files[0]], { type: 'image/jpeg' });      
                    const imageSrc  = URL.createObjectURL(m_blob)

                    div.src = imageSrc

                    if(index===(arrayMountDiv.length-1)){
                        modal_add_btn.current.innerText = ''
                    }
                    break
                }
                else{
                    continue
                }
            }
        }
    }
    
        // 등록 버튼
    function imgRegiBtn(e){
        // e.stopPropagation()
        const mountInput = (!mainState?main_img_input:sub_img_input)

        if(!mainState){
            mountInput.current.click()
        }
        else
            // 서브 이미지 인풋 클릭
        {           
            const arrayMountInput = Array.from(mountInput.current)
            for(let input of arrayMountInput){
                // console.log(input.files.length)
                if((input.files.length === 0)){
                    input.click()
                    break
                }else{
                    continue
                }
            }
        }

    }


    ////////상위 컴포넌트로 이미지 파일 넘겨주기
    function setImgFile(e){
        // 메인이미지 파일 넘기기
        e.preventDefault()
        if(!mainState){
            const image = main_img_form.current.mainImg.files[0]
            console.log(main_img_form.current.mainImg.files)
            deliverFile(image)                   
            deliverModalState()       /////모달창 끄기
        }else
        // 서브이미지
        {
            try{
                const subimgInv = []
                for(let file of sub_img_form.current.subImg){
                    const image = file.files[0]
                    subimgInv.push(image)
                }
                // console.log(subimgInv)

                // 4개의 파일이 다 들어왔을 시
                if(!subimgInv.includes(undefined)){
                    deliverFile(subimgInv)
                    deliverModalState()/////모달창 끄기
                }else{
                    alert('이미지 4개를 모두 등록해 주세요')
                }
            }catch(e){
                console.log(e)
            }
        }
    }
    // modal-header
    return(
        modal_state === 'img-regist-modal' ? 
        <div className={'img-regist-modal__container'} ref={img_regist_modal_container}>
            {/* 이미지 인풋값 관리하는 form */}
            {/* 메인이미지 인풋 받는 form */}
            <div className="img-regist-modal__container-input">
                <form id="mainForm" ref={main_img_form}>
                    <input type='file' id="mainImg" ref={main_img_input} onChange={displayModalImg}></input>
                </form>
            </div>  
            {/* // 서브이미지 인풋 받는 form */}
            <div className="img-regist-modal__container-input">
                <form id="subForm" ref={sub_img_form}>
                    <input type='file' id="subImg" ref={(el)=>sub_img_input.current[0] = el} onChange={displayModalImg}></input>
                    <input type='file' id="subImg" ref={(el)=>sub_img_input.current[1] = el} onChange={displayModalImg}></input>
                    <input type='file' id="subImg" ref={(el)=>sub_img_input.current[2] = el} onChange={displayModalImg}></input>
                    <input type='file' id="subImg" ref={(el)=>sub_img_input.current[3] = el} onChange={displayModalImg}></input>
                </form>
            </div>  

            {/* header */}
            <div className="img-regist-modal__container-section1">
                <div className="img-regist-modal__container-section1-box1 modal-header">
                    <div className="img-regist-modal__container-section1-box1-part1" onClick={()=>{deliverModalState()}}>
                       <img src={default_data.d_imgs.close} onClick={img_modal_toggle}></img>
                    </div>
                    <div className="img-regist-modal__container-section1-box1-part2">사진 업로드</div>
                    <div className="img-regist-modal__container-section1-box1-part3" ref={modal_add_btn} onClick={imgRegiBtn}>추가</div>
                </div>
                <div className="img-regist-modal__container-section1-box2">{`선택된 파일`}</div>                
            </div>

            <div className="img-regist-modal__container-section2">
                {/* 메인이미지 */}
                <div className="img-regist-modal__container-section2-box1" id="main_ig_modal" style={{display:`${!mainState ? 'block' : 'none'}`}}>
                    <img className="img-regist-modal__container-section2-box1-part1" id="modal_dis_imgs" ref={main_modal_img}></img>
                    <div className="img-regist-modal__container-section2-box1-part2">
                        <img className="img-regist-modal__img" src={default_data.d_imgs.plus}></img>
                    </div>
                </div>                 

                {/* 서브이미지 */}                
                <div className="img-regist-modal__container-section2-box1"  style={{display:`${mainState ? 'block' : 'none'}`}}>
                    <img className="img-regist-modal__container-section2-box1-part1-g1" id="modal_dis_imgs" ref={(el)=>{sub_modal_img.current[0] = el}}></img>
                    <div className="img-regist-modal__container-section2-box1-part2">
                        <img className="img-regist-modal__img" src={default_data.d_imgs.plus}></img>
                    </div>
                </div>
                <div className="img-regist-modal__container-section2-box1" style={{display:`${mainState ? 'block' : 'none'}`}}>
                    <img className="img-regist-modal__container-section2-box1-part1-g2" id="modal_dis_imgs"ref={(el)=>{sub_modal_img.current[1] = el}}></img>
                    <div className="img-regist-modal__container-section2-box1-part2">
                        <img className="img-regist-modal__img" src={default_data.d_imgs.plus}></img>
                    </div>
                </div>
                <div className="img-regist-modal__container-section2-box1" style={{display:`${mainState ? 'block' : 'none'}`}}>
                    <img className="img-regist-modal__container-section2-box1-part1-g3" id="modal_dis_imgs" ref={(el)=>{sub_modal_img.current[2] = el}}></img>
                    <div className="img-regist-modal__container-section2-box1-part2">
                        <img className="img-regist-modal__img" src={default_data.d_imgs.plus}></img>
                    </div>
                </div>
                <div className="img-regist-modal__container-section2-box1" style={{display:`${mainState ? 'block' : 'none'}`}}>
                    <img className="img-regist-modal__container-section2-box1-part1-g4" id="modal_dis_imgs" ref={(el)=>{sub_modal_img.current[3] = el}}></img>
                    <div className="img-regist-modal__container-section2-box1-part2">
                        <img className="img-regist-modal__img" src={default_data.d_imgs.plus}></img>
                    </div>
                </div>
            </div>

            <div className="img-regist-modal__container-section3">
                <div className="img-regist-modal__container-section3-box1"></div>
                <button type="submit" form={mainState?`mainForm`:`subForm`} className="img-regist-modal__container-section3-box2" onClick={setImgFile}>등록</button>
            </div>
        </div>
        : null
    )
}

export default ImgRegistModal