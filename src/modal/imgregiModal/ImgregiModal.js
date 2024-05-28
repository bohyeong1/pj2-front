import React ,{useRef} from "react";
import './ImgregiModal.css'

function ImgregiModal({mainState, deliverFile, modalState, deliverModalState}){

    const imgModalComponent = useRef()     //////모달 컴포넌트 전체
    const mainimgInput = useRef()  ////그림등록 main input
    const subimgInput = useRef([])  ////그림등록 sub input
    const mainimgForm = useRef()       /////메인 이미지 폼
    const subimgForm = useRef()                     /////////서브 이미지폼
    const main_modal_img = useRef() ////메인이미지 디스플레이
    const sub_modal_img = useRef([])  ////////서브 이미지 디스플레이
    const modal_add_btn = useRef()    //////추가버튼




        ///////이미지 onchange
    function displayModalImg(){       
        if(!mainState){
            const m_blob = new Blob([mainimgInput.current.files[0]], { type: 'image/jpeg' });      
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
                    const m_blob = new Blob([subimgInput.current[index].files[0]], { type: 'image/jpeg' });      
                    const imageSrc  = URL.createObjectURL(m_blob)

                    div.src = imageSrc

                    if(index===(arrayMountDiv.length-1)){
                        modal_add_btn.current.innerText = ''
                    }
                    break
                } else{
                    continue
                }
            }
        }


    }
    
        // 등록 버튼
    function imgRegiBtn(e){
        // e.stopPropagation()
        const mountInput = (!mainState?mainimgInput:subimgInput)

        if(!mainState){
            mountInput.current.click()
        }
        else
            // 서브 이미지 인풋 클릭
        {           
                 console.log(mountInput.current)
            const arrayMountInput = Array.from(mountInput.current)
            // console.log(typeof arrayMountInput)
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
            const image = mainimgForm.current.mainImg.files[0]
            console.log(mainimgForm.current.mainImg.files)
            deliverFile(image)                   
            deliverModalState()       /////모달창 끄기
        }else
        // 서브이미지
        {
            // console.log(subimgForm.current.subImg)
            try{
                const subimgInv = []
                for(let file of subimgForm.current.subImg){
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

    return(
        <div className={`ImgregiModal-container ${modalState?'modalAc':''}`} ref={imgModalComponent}>

                {/* 이미지 인풋값 관리하는 html */}
                {/* 메인이미지 인풋 받는 html */}

            <div className="ImgregiModal-con-input">
                <form id="mainForm" ref={mainimgForm}>
                    <input type='file' id="mainImg" ref={mainimgInput} onChange={displayModalImg}></input>
                </form>
            </div>  
            {/* // 서브이미지 인풋 받는 html */}
            <div className="ImgregiModal-con-input">
                <form id="subForm" ref={subimgForm}>
                    <input type='file' id="subImg" ref={(el)=>subimgInput.current[0] = el} onChange={displayModalImg}></input>
                    <input type='file' id="subImg" ref={(el)=>subimgInput.current[1] = el} onChange={displayModalImg}></input>
                    <input type='file' id="subImg" ref={(el)=>subimgInput.current[2] = el} onChange={displayModalImg}></input>
                    <input type='file' id="subImg" ref={(el)=>subimgInput.current[3] = el} onChange={displayModalImg}></input>
                </form>
            </div>  
   




                {/* 디스플레이 되는 컴포넌트 */}
            <div className="ImgregiModal-con-sec1">
                <div className="ImgregiModal-con-s1-b1">
                    <div className="ImgregiModal-con-s1-b1-d1" onClick={()=>{deliverModalState()}}>X</div>
                    <div className="ImgregiModal-con-s1-b1-d2">사진 업로드</div>
                    <div className="ImgregiModal-con-s1-b1-d3" ref={modal_add_btn} onClick={imgRegiBtn}>추가</div>
                </div>
                <div className="ImgregiModal-con-s1-b2">{`선택된 파일`}</div>
            </div>




            <div className="ImgregiModal-con-sec2">
                {/* 메인이미지 */}
                <div className="ImgregiModal-con-s2-b1" style={{display:`${!mainState ? 'block' : 'none'}`}}>
                    <img className="ImgregiModal-con-s2-b1-d1" id="modal_dis_imgs" ref={main_modal_img}></img>
                    <div className="ImgregiModal-con-s2-b1-d2">
                        <span className="ImgregiModal-text">메인</span>
                    </div>
                </div> 
                

                {/* 서브이미지 */}
                
                    <div className="ImgregiModal-con-s2-b1" id="ig_modal1" style={{display:`${mainState ? 'block' : 'none'}`}}>
                        <img className="ImgregiModal-con-s2-b1-d1-g1" id="modal_dis_imgs" ref={(el)=>{sub_modal_img.current[0] = el}}></img>
                        <div className="ImgregiModal-con-s2-b1-d2">
                            <span className="ImgregiModal-text">+</span>
                        </div>
                    </div>
                    <div className="ImgregiModal-con-s2-b1" id="ig_modal2" style={{display:`${mainState ? 'block' : 'none'}`}}>
                        <img className="ImgregiModal-con-s2-b1-d1-g2" id="modal_dis_imgs"ref={(el)=>{sub_modal_img.current[1] = el}}></img>
                        <div className="ImgregiModal-con-s2-b1-d2">
                            <span className="ImgregiModal-text">+</span>
                        </div>
                    </div>
                    <div className="ImgregiModal-con-s2-b1" id="ig_modal3" style={{display:`${mainState ? 'block' : 'none'}`}}>
                        <img className="ImgregiModal-con-s2-b1-d1-g3" id="modal_dis_imgs" ref={(el)=>{sub_modal_img.current[2] = el}}></img>
                        <div className="ImgregiModal-con-s2-b1-d2">
                            <span className="ImgregiModal-text">+</span>
                        </div>
                    </div>
                    <div className="ImgregiModal-con-s2-b1" id="ig_modal4" style={{display:`${mainState ? 'block' : 'none'}`}}>
                        <img className="ImgregiModal-con-s2-b1-d1-g4" id="modal_dis_imgs" ref={(el)=>{sub_modal_img.current[3] = el}}></img>
                        <div className="ImgregiModal-con-s2-b1-d2">
                            <span className="ImgregiModal-text">+</span>
                        </div>
                    </div>


            </div>

            <div className="ImgregiModal-con-sec3">
                <div className="ImgregiModal-con-s3-b1"></div>
                <button type="submit" form={mainState?`mainForm`:`subForm`} className="ImgregiModal-con-s3-b2" onClick={setImgFile}>등록</button>
            </div>
        </div>
    )
}

export default ImgregiModal