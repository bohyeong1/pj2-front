import React, {useRef,useState, useEffect} from "react";
import './Acc_regist_lv6.css'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Host_footer from "../../../utilComponent/menu/host-footer/Host-footer";
import default_data from "../../../utilData/defaultData";
import ImgregiModal from "../../../utilComponent/modal/imgregiModal/ImgregiModal";

function Acc_regist_lv6(){

    const userData = JSON.parse(sessionStorage.getItem('userData')) ///유저데이터
    //현재 등록중인 숙소 데이터
    const registData = JSON.parse(sessionStorage.getItem('registData'))


    const [mainImgState, setMainImgState] = useState(false)           /////////메인 이미지 등록 여부
    const [mainImgFile, setMainImgFile] = useState(null)            ////////메인 이미지 파일 
    const [modalState, setModalState] = useState(false)             ///////모달창 키고 끄기
    const [subImgFile, setSubImgFile] = useState([])             ///////////서브 이미지 파일
    
    
    const [sellectData, setSellectData] = useState({main:'', sub:''})         // 선택된 카테고리의 data값 state

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
                // console.log(lv6_subImg.current[index])          
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
                setSellectData({
                    main:file,
                    sub:sellectData.sub
                    
                })
            }else{                
                setSubImgFile(file)
                setSellectData({
                    main:sellectData.main,
                    sub:file
                })
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

    ///////////////////////////////이미지 한방에 여러개 등록
    async function multiImgfetch(imgdata){
        const file = imgdata.main
        const files = Array.from(imgdata.sub)        ///////유사배열 -> 배열로 변환

        console.log(file, files)

        if(files.length === 4 && file){
            let imgDatas = new FormData()   ///sub, main 이미지 통합으로 관리 // 이름은 다르게 ㅇㅇ
            imgDatas.append('mainImg',file,'mainImg') //메인 이미지 어펜드


            // 서브이미지 어펜드 ㅇ
            for(const file of files){
                imgDatas.append('subImg', file, 'subImg')
            }

            //////////////숙소의 ref 유저 데이터값
            const userInfo = new Blob([JSON.stringify(userData._id)],{type:'application/json'})
            ////////////////숙소 _id값
            const home_id = new Blob([JSON.stringify(registData._id)],{type:'application/json'})

            imgDatas.append('userData',userInfo)
            imgDatas.append('homeid', home_id)

            ///////////////////////이미지 폼데이터 console확인

            for (const pair of imgDatas) {                             
                console.log(pair); 
            }

            try{
                const token = localStorage.getItem('log')
                const result = await fetch((`${default_data.d_base_url}/api/accomodation/imgs`),{
                    headers:{
                        'Authorization': `${token? 'Bearer' + token : ''}`
                    },
                    method: 'POST',
                    body: imgDatas
                  })

            }
            catch(e){
                console.log(e)
            }
        }        
    }

    return(
        <div className="Acc_regist_lv6-container">
            <Main_menu></Main_menu>

            <div className="Acc_regist_lv6">
                <div className="Acc_regist_lv6-con-title">
                    숙소를 대표하는 이미지를 등록해주세요
                    <div className="Acc_regist_lv6-con-title-s1">5장을 등록하셔야 합니다</div>
                </div>

                <div className="Acc_regist_lv6-con-sec2">
                    <div className="Acc_regist_lv6-con-s2-b1">
                        <img className="Acc_regist_lv6-con-s2-b1-d1" ref={lv6_mainImg}></img>
                        <button className="Acc_regist_lv6-con-s2-b1-btn" style={{display:`${mainImgFile ? 'none' : 'block'}`}} 
                        onClick={()=>{setModalState(!modalState)}}>사진 등록</button>
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
                        <button className="Acc_regist_lv6-con-s2-b2-btn" style={{display:`${mainImgFile && subImgFile.length === 0 ? 'block' : 'none'}`}} 
                        onClick={()=>{setModalState(!modalState)}}>사진 등록</button>
                    </div>
                </div>

            </div>

            <div className="Acc_regist_lv6-footer">
                <Host_footer fetchHandlerFun = {multiImgfetch} dropData = {sellectData}></Host_footer>
            </div>

            <ImgregiModal mainState={mainImgState} mainImgFile={mainImgFile}  deliverFile={deliverFile} modalState={modalState}
                            deliverModalState={deliverModalState}></ImgregiModal>
        </div>
    )
}

export default Acc_regist_lv6