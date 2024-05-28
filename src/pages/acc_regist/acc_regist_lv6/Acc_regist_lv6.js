import React, {useRef,useState, useEffect} from "react";
import './Acc_regist_lv6.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import Host_footer from "../../../menu/host-footer/Host-footer";
import default_data from "../../../utilData/defaultData";
import ImgregiModal from "../../../modal/imgregiModal/ImgregiModal";

function Acc_regist_lv6(){

    const [mainImgState, setMainImgState] = useState(false)           /////////메인 이미지 등록 여부
    const [mainImgFile, setMainImgFile] = useState(null)            ////////메인 이미지 파일 
    const [modalState, setModalState] = useState(false)             ///////모달창 키고 끄기
    const [subImgFile, setSubImgFile] = useState([])             ///////////서브 이미지 파일

    ////////ref
    const lv6_mainImg = useRef()
    const lv6_subImg = useRef([])

    useEffect(()=>{
        if(mainImgFile){
            // 메인이미지 등록
            setMainImgState(true)
            console.log(mainImgFile)
            const blob = new Blob([mainImgFile], { type: 'image/jpeg' });        
            console.log( URL.createObjectURL(blob))          
            lv6_mainImg.current.src  = URL.createObjectURL(blob)

        }

        if(subImgFile.length != 0){
            for(let file of subImgFile){
                const index = subImgFile.indexOf(file)


                const blob = new Blob([file], { type: 'image/jpeg' });        
                console.log(lv6_subImg.current[index])          
                lv6_subImg.current[index].src = URL.createObjectURL(blob)
            }
        }
    },[mainImgFile,subImgFile])

    // style={{display:`${mainImgState ? 'none' : 'block'}`}}     btn 이미지 사라졋다 나타낫다 하기

    /////////////////하위 컴포넌트에서 상위 컴포넌트로 이미지 파일 넘기기
    function deliverFile(file){
        if(file){
            if(!mainImgState){
                setMainImgFile(file)
            }else{                
                setSubImgFile(file)
            }

            // console.log(mainImgFile)
        }else{
            console.log('파일이 오지 않았어ㅠ')
        }
    }

    ///////하위 컴포넌트에서 모달 스테이트값 관리하기
    function deliverModalState(){
        setModalState(!modalState)
    }




    //////////////////이미지 폼데이터로 전환 후 서버로 패치/////////fetch를 쓸 경우 hearders꼮꼬꼬꼬꼬꼮 날리지말것 ---->이미지 하나
//     async function singleImgfetch(e){
//         e.preventDefault()
//         if(e.target.imgFile.files && e.target.imgFile.files[0]){

//             const image = e.target.imgFile.files[0]
//             let imgData = new FormData()
//             imgData.append('mainImage', image, 'mainImage')


//             // 폼데이터 콘솔확인

//             // for (const pair of imgData) {
//             //     console.log(pair); 
//             // }

//             try{
//                 const result = await fetch((`${default_data.d_base_url}/api/accomodation/img`),{
//                     headers:{
//                     //   'Content-Type':'multipart/form-data',
//                     //   'Authorization': `${token? 'Bearer' + token : ''}`, 
//                     },
//                     method: 'POST',
//                     body: imgData
//                   })


//                   const blob = new Blob([e.target.imgFile.files[0]], { type: 'image/jpeg' });                  
//                   displayImg.src  = URL.createObjectURL(blob)
//             }
//             catch(e){
//                 alert('이미지 등록에 실패하셨습니다.')
//             }
//         }        
//     }



// ///////////////////////////////이미지 여러개 등록
//     async function multiImgfetch(e){
//         e.preventDefault()
//         const files = Array.from(e.target.imgFile)        ///////유사배열 -> 배열로 변환
//         const filteredFiles = files.filter((ele)=>{return ele.files.length !== 0})        /////////등록한 이미지 필터링
//         // console.log(filteredFiles)

//         if(filteredFiles.length === 4){
//             let imgData = new FormData()
//             for(const file of filteredFiles){
//                 imgData.append('homeImage', file.files[0], 'homeImage')
//             }

//             ///////////////////////이미지 폼데이터 console확인
//             // for (const pair of imgData) {                             
//             //     console.log(pair); 
//             // }

//             try{
//                 const result = await fetch((`${default_data.d_base_url}/api/accomodation/imgs`),{
//                     headers:{
//                     //   'Content-Type':'multipart/form-data',
//                     //   'Authorization': `${token? 'Bearer' + token : ''}`, 
//                     },
//                     method: 'POST',
//                     body: imgData

//                   })

//                 // console.log(filteredFiles[0].files[0])


//             }
//             catch(e){
//                 console.log(e)
//             }
//         }        
//     }




    return(
        <div className="Acc_regist_lv6-container">
            <Main_menu></Main_menu>

            <div className="Acc_regist_lv6">
                <div className="Acc_regist_lv6-con-title">
                    숙소를 대표하는 이미지를 등록해주세요
                    <div className="Acc_regist_lv6-con-title-s1">최소 5장을 등록하셔야 합니다</div>
                </div>

                <div className="Acc_regist_lv6-con-sec2">
                    <div className="Acc_regist_lv6-con-s2-b1">
                        <img className="Acc_regist_lv6-con-s2-b1-d1" ref={lv6_mainImg}></img>
                        <button className="Acc_regist_lv6-con-s2-b1-btn" onClick={()=>{setModalState(!modalState)}}>사진 등록</button>
                    </div>
                    {/* 서브이미지 디스플레이 */}
                    <div className="Acc_regist_lv6-con-s2-b2" >
                        <div className="Acc_regist_lv6-con-s2-b2-d1" style={{display:`${!mainImgState ? 'none' : 'block'}`}}>
                            <img className="Acc_regist_lv6-subimg" ref={(ele)=>{lv6_subImg.current[0] = ele}}></img>
                        </div>
                        <div className="Acc_regist_lv6-con-s2-b2-d1" style={{display:`${!mainImgState ? 'none' : 'block'}`}}>
                            <img className="Acc_regist_lv6-subimg" ref={(ele)=>{lv6_subImg.current[1] = ele}}></img>
                        </div>
                        <div className="Acc_regist_lv6-con-s2-b2-d1" style={{display:`${!mainImgState ? 'none' : 'block'}`}}>
                            <img className="Acc_regist_lv6-subimg" ref={(ele)=>{lv6_subImg.current[2] = ele}}></img>
                        </div>
                        <div className="Acc_regist_lv6-con-s2-b2-d1" style={{display:`${!mainImgState ? 'none' : 'block'}`}}>
                            <img className="Acc_regist_lv6-subimg" ref={(ele)=>{lv6_subImg.current[3] = ele}}></img>
                        </div>
                    </div>
                </div>

            </div>

            <div className="Acc_regist_lv6-footer">
                <Host_footer></Host_footer>
            </div>

            <ImgregiModal mainState={mainImgState} mainImgFile={mainImgFile}  deliverFile={deliverFile} modalState={modalState}
                            deliverModalState={deliverModalState}></ImgregiModal>
        </div>
    )
}

export default Acc_regist_lv6