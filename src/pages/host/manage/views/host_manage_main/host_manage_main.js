import './host_manage_main.scss'
import { useNavigate } from "react-router-dom";
import host_background from '@/assets/background/host-main-back.png'
import { UserContext } from '@/context/user_context/config/user_context';
import { useContext } from 'react';

function HostManageMain(){

    // =================================================
    // context states //
    const {user_data, setUser_data} = useContext(UserContext)

    const navigator = useNavigate()

    return(
        <div className="host-manage-main__app">           
            <div className="host-manage-main__container">
                <div className="host-manage-main__sec1">
                    <div className="host-manage-main__s1-b1">{`${user_data.name} 님, 반갑습니다!`}</div>
                    <div className="host-manage-main__s1-b2">
                        <div className="host-manage-main__s1-b2-b1">
                            <div className="host-manage-main__s1-b2-b1-t1">호스팅 정책</div>
                            <div className="host-manage-main__s1-b2-b1-t2">보형짱 닷컴의 호스팅 정책을 꼭 확인해 주세요</div>
                            <div className="host-manage-main__s1-b2-b1-t3" onClick={()=>{navigator('/Terms_host')}}>이동하기</div>
                        </div>
                        <div className="host-manage-main__s1-b2-b2">
                            <div className="host-manage-main__s1-b2-b2-t1">호스트 소개하기</div>
                            <div className="host-manage-main__s1-b2-b2-t2">게스트들에게 자신을 소개하는 글을 작성해 보세요!</div>
                            <div className="host-manage-main__s1-b2-b2-t3" onClick={()=>{navigator('/Acc_regist/Acc_regist_intro')}}>이동하기</div>
                        </div>
                    </div>
                </div>

                <div className="host-manage-main__sec2">
                    <img 
                        className="host-manage-main__s2-b1"
                        src={host_background}/>
                    <div className="host-manage-main__s2-b2">
                        <div className="host-manage-main__s2-b2-d1">
                            <span className='host-manage-main-title'>다음 단계</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    )

}

export default HostManageMain