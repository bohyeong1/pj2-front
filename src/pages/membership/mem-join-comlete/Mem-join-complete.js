import React, {useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import './Mem-join-complete.css'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Footer from "../../../utilComponent/menu/footer/Footer";
import default_data from "../../../utilData/defaultData";


function Mem_join_complete(){


    // state
    const [imgFile, setImgFile] = useState(null)
    const [imgUrl, setImgUrl] = useState(null)
    
    ///로그데이터
    const logData = sessionStorage.getItem('userData') || localStorage.getItem('userData')
    const logDataParse = JSON.parse(logData) || null

    // ref
    const userImg_display = useRef()
    const imgFile_form = useRef()
    const imgFile_input = useRef()

    // navigate
    const navigate = useNavigate()

    // 사진등록 버튼
    function addProfileImg(){
        imgFile_input.current.click()
    }

    // input value onchange
    function inputOnchange(){
        const m_blob = new Blob([imgFile_input.current.files[0]], { type: 'image/jpeg' });      
        const imageSrc  = URL.createObjectURL(m_blob)
        setImgUrl(imageSrc)
        if(imgFile_input.current.files[0]){
            setImgFile(imgFile_input.current.files[0])
        }
    }

    ///regist 이미지
    async function registProfileImg(e){

        console.log(imgFile)

        if(imgFile){
            let imgData = new FormData()
            imgData.append('userImg', imgFile, 'userImg')


            //////////////숙소의 ref 유저 데이터값
            const userInfo = new Blob([JSON.stringify(logDataParse._id)],{type:'application/json'})

            imgData.append('userData',userInfo)
            
            for(const pair of imgData){
                console.log(pair)
            }
            try{
                const result = await fetch((`${default_data.d_base_url}/api/users/userImg`),{
                    method: 'POST',
                    body: imgData
                })

                const copiedData = {...logDataParse, profileImg : result.imgUrls}

                sessionStorage.setItem('userData', JSON.stringify(copiedData))
                console.log(copiedData)

            }catch(e){
                alert('이미지 등록에 실패하셨습니다.')
            }

        }

        navigate('/')
    }



    return(
        <div className="Mem_join_complete-container">
            <Main_menu></Main_menu>
            <div className="Mem_join_complete-content">
                <div className="Mem_join_complete-content-sec1">
                    <div className="Mem_join_complete-content-sec1-s1">보형짱 닷컴</div>
                    <div className="Mem_join_complete-content-sec1-s2">
                        <div className="level-bar-lv4"></div>
                    </div>
                    <div className="Mem_join_complete-content-sec1-s3">다른사람에게 보여질 이미지를 등록해 주세요!</div>
                </div>
                <div className="Mem_join_complete-content-sec2">
                    <div className="Mem_join_complete-content-sec2-s1">
                        <div className="Mem_join_complete-content-sec2-s1-profile">
                            <img src={imgUrl ? imgUrl :  default_data.d_userImg.man} ref={userImg_display}></img>
                        </div>
                        <div className="Mem_join_complete-content-sec2-s1-profileBtn" onClick={addProfileImg}>사진 등록</div>
                    </div>
                    <div className="Mem_join_complete-content-sec2-s2">{`환영합니다 ${logDataParse.name} 님!`}</div>
                    <div className="Mem_join_complete-content-sec2-btn" onClick={registProfileImg}>시작하기</div>   
                </div>

                {/* 이미지 폼태그 */}
                <form className="Mem_join_complete-form" ref={imgFile_form} style={{display:'none'}}>
                    <input className="Mem_join_complete-input" type="file" id='userImg' ref={imgFile_input} onChange={inputOnchange}></input>
                </form>

            </div>
            <div className="Mem_join_complete-footer">
                <Footer></Footer>
            </div>

        </div>
    )
}

export default Mem_join_complete

