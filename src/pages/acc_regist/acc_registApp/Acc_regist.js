import React, {useState,useEffect} from "react";
import './acc_regist.scss'
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import Footer from '../../../utilComponent/menu/footer/Footer'
import { useNavigate } from "react-router-dom";
import default_data from "../../../utilData/defaultData";
import connectData from "../../../utilData/UtilFunction";
import History_main from "../../../picture/history-main/History-main";
import host_background from '@/assets/background/host-main-back.png'

function Acc_regist({login_user}){


    // =================================================
    // states //
    const [reserve_data, setReserve_dataState] = useState(null)


    async function get_data(){
        const home_data = await connectData(`${default_data.d_base_url}/api/reserv/host`, 'POST',{
            userId : login_user._id
        })
        if(home_data){
            setReserve_dataState(home_data)
        }else{
            console.log('데이터를 받아오는데 실패하셨습니다')
        }
    }

    useEffect(()=>{
        get_data()
    },[])

    const navigator = useNavigate()

    return(
        <div className="Acc-regist__pp">
            <Main_menu login_user={login_user} host = {true}></Main_menu>
            
            <div className="Acc-regist__container">
                <div className="Acc-regist__sec1">
                    <div className="Acc-regist__s1-b1">{`${login_user.name} 님, 반갑습니다!`}</div>
                    <div className="Acc-regist__s1-b2">
                        <div className="Acc-regist__s1-b2-b1">
                            <div className="Acc-regist__s1-b2-b1-t1">호스팅 정책</div>
                            <div className="Acc-regist__s1-b2-b1-t2">보형짱 닷컴의 호스팅 정책을 꼭 확인해 주세요</div>
                            <div className="Acc-regist__s1-b2-b1-t3" onClick={()=>{navigator('/Terms_host')}}>이동하기</div>
                        </div>
                        <div className="Acc-regist__s1-b2-b2">
                            <div className="Acc-regist__s1-b2-b2-t1">호스트 소개하기</div>
                            <div className="Acc-regist__s1-b2-b2-t2">게스트들에게 자신을 소개하는 글을 작성해 보세요!</div>
                            <div className="Acc-regist__s1-b2-b2-t3" onClick={()=>{navigator('/Acc_regist/Acc_regist_intro')}}>이동하기</div>
                        </div>
                    </div>
                </div>

                <div className="Acc-regist__sec2">
                    <img 
                        className="Acc-regist__s2-b1"
                        src={host_background}/>
                    <div className="Acc-regist__s2-b2">
                        <div className="Acc-regist__s2-b2-d1">
                            <span className='acc-regist-title'>다음 단계</span>
                        </div>
                    </div>
                </div>

                <div className="Acc-regist__sec3">
                    <div className="Acc-regist__s3-b1">예약</div>
                    <div className="Acc-regist__s3-b2">
                        <div className="Acc-regist__s3-b2-t1"></div>
                        <div className={`Acc-regist__s3-b2-t2 ${'reserve_active'}`}>
                            {reserve_data?.length != 0 ? 
                            <div className="Acc-regist__s3-b2-t2-d1">
                                {reserve_data?.map((el, id)=>{
                                    return(
                                        <div key={id} className="Acc-regist__s3-b2-t2-d1-a1" 
                                        style={{borderBottom : `${id === reserve_data?.length - 1 ? 'none' : 'solid 1px rgb(210, 210, 210)'}`}}> 
                                            <div>
                                                <History_main data={el}></History_main>
                                            </div>
                                            <div className="Acc-regist__s3-b2-t2-d1-a1-b1">
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
            <div className="Acc-regist__footer">
                <Footer></Footer>
            </div>
        </div>

    )

}

export default Acc_regist