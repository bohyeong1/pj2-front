import React, {useState,useEffect} from "react";
import './Acc_regist.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import Footer from '../../../menu/footer/Footer'
import { useNavigate } from "react-router-dom";
import UserImg from "../../../utilData/userImg/UserImg";
import default_data from "../../../utilData/defaultData";
import connectData from "../../../utilData/Utildata";
import History_main from "../../../picture/history-main/History-main";

function Acc_regist(){
    ///로그데이터
    const logData = sessionStorage.getItem('userData') || localStorage.getItem('userData')
    const logDataParse = JSON.parse(logData) || null

    //////////숙소 데이터 state
    const [reservData, setReservDataState] = useState(null)


    async function getData(){
        const homeData = await connectData(`${default_data.d_base_url}/api/reserv/host`, 'POST',{
            userId : logDataParse._id
        })
        if(homeData){
            setReservDataState(homeData)
        }else{
            alert('데이터를 받아오는데 실패하셨습니다')
        }
    }

    useEffect(()=>{
        getData()
    },[])

    console.log(reservData)



    const navigator = useNavigate()

    return(
        <div className="Acc_registApp">
            <Main_menu></Main_menu>
            
            <div className="Acc_regist-container">
                <div className="Acc_regist-sec1">
                    <div className="Acc_regist-s1-b1">{`${logDataParse.name} 님, 반갑습니다!`}</div>
                    <div className="Acc_regist-s1-b2">
                        <div className="Acc_regist-s1-b2-b1">
                            <div className="Acc_regist-s1-b2-b1-t1">호스팅 정책</div>
                            <div className="Acc_regist-s1-b2-b1-t2">보형짱 닷컴의 호스팅 정책을 꼭 확인해 주세요</div>
                            <div className="Acc_regist-s1-b2-b1-t3" onClick={()=>{navigator('/Terms_host')}}>이동하기</div>
                        </div>
                        <div className="Acc_regist-s1-b2-b2">
                            <div className="Acc_regist-s1-b2-b2-t1">호스트 소개하기</div>
                            <div className="Acc_regist-s1-b2-b2-t2">게스트들에게 자신을 소개하는 글을 작성해 보세요!</div>
                            <div className="Acc_regist-s1-b2-b2-t3" onClick={()=>{navigator('/Acc_regist/Acc_regist_intro')}}>이동하기</div>
                        </div>

                    </div>
                </div>

                <div className="Acc_regist-sec2">
                    <div className="Acc_regist-s2-b1">
                    </div>
                    <div className="Acc_regist-s2-b2">
                        <div className="Acc_regist-s2-b2-d1">
                            <UserImg data={logDataParse}></UserImg>
                        </div>
                        <div className="Acc_regist-s2-b2-d2">
                            <div className="Acc_regist-nodata"  style={{display:`${logDataParse.hostText ? 'none' : 'block'}`}}>
                                <span style={{marginRight : '15px'}}>게스트에게 보여줄 내용을 작성해 주세요!</span>
                                <img className="Acc_regist-nodata-img" src={default_data.d_imgs.smile}></img>
                            </div>
                            <textarea style={{display:`${!logDataParse.hostText ? 'none' : 'block'}`}} readOnly className="Acc_regist-s2-b2-d2-text" spellCheck={false}
                            value={logDataParse.hostText ? logDataParse.hostText : ''}></textarea>
                            
                        </div>
                    </div>

                </div>

                <div className="Acc_regist-sec3">
                    <div className="Acc_regist-s3-b1">예약</div>
                    <div className="Acc_regist-s3-b2">
                        <div className="Acc_regist-s3-b2-t1"></div>
                        <div className={`Acc_regist-s3-b2-t2 ${'reserve_active'}`}>
                            {reservData?.length != 0 ? 
                            <div className="Acc_regist-s3-b2-t2-d1">
                                {reservData?.map((el, id)=>{
                                    return(
                                        <div key={id} className="Acc_regist-s3-b2-t2-d1-a1" 
                                        style={{borderBottom : `${id === reservData?.length - 1 ? 'none' : 'solid 1px rgb(210, 210, 210)'}`}}> 
                                            <div>
                                                <History_main data={el}></History_main>
                                            </div>
                                            <div className="Acc_regist-s3-b2-t2-d1-a1-b1">
                                                <div>                                            
                                                    <span>숙소 이름</span>
                                                    <span>{el.title}</span>
                                                </div>
                                                <div>
                                                    <span>구매자</span>
                                                    <span>{el.buyer.name}</span>
                                                </div>
                                                <div>
                                                    <span>수입</span>
                                                    <span>{`${el.totalPrice}원`}</span>
                                                </div>
                                                <div>
                                                    <span>숙박 일수</span>
                                                    <span>{el.restDay}</span>
                                                </div>
                                                <div>
                                                    <span>숙박 시작일</span>
                                                    <span>{`${new Date(el.createAt).getFullYear()}년 ${new Date(el.createAt).getMonth()}월 ${new Date(el.createAt).getDate()}일`}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                  })}

                        </div>                        
                            : '예약된 숙소가 없습니다'}
                        </div>
                    </div>
                </div>

            </div>
            <div className="Acc_regist-footer">
                <Footer></Footer>
            </div>
        </div>

    )

}

export default Acc_regist