import './join_prev1.scss'
import '../../../manage_scss_style/commonness/commonness.scss'
import Main_menu from '../../../utilComponent/menu/main-menu/main-menu'

function Join_prev1(){
    return(
        <div className='join_prev1-app'>
            <Main_menu></Main_menu>
            <div className='join_prev1-app__container'>
                <div className="join_prev1-app__container-section1">
                    <div className="join_prev1-app__container-section1-part1">이메일 인증</div>
                    <div className="join_prev1-app__container-section1-part2">
                        <div className="level-bar-lv2"></div>
                    </div>
                    <div className="join_prev1-app__container-section1-part3">
                        이메일 인증 절차를 완료해 주세요!
                    </div>
                    <div className="agree-app__container-section1-part4">
                        <div className="agree-app_section-box-container">
                            <span>1일 이메일 인증 요청 회수 3회 제한</span>
                            <div className="agree_section-box">
                                <div></div>
                            </div>
                        </div>                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Join_prev1