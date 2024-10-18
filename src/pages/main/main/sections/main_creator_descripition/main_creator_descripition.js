import './main_creator_descripition.scss'
import default_data from "@/util/default_data/default_data";
import useMainCreatorDescriptionBusiness from '../../hook_store/business_hooks/main_creator_description_business';

function MainCreatorDescription(){

    // =================================================
    // hooks //
    // business
    const {click_box} = useMainCreatorDescriptionBusiness()

    return(
        <div className="main-creator-description__container">
            <div className="main-creator-description__box1">
                <div className="main-creator-description__box1-part1">홈페이지 이용을 위해서 회원가입을 해주세요!</div>
                <div className="main-creator-description__box1-part2">마일리지를 통해 숙소를 등록, 구매할 수 있습니다</div>
                <div className="main-creator-description__box1-part3">
                    <button className="main-creator-description__box1-part3-button1" 
                            onClick={()=>{click_box('.Login')}}>
                                회원가입
                    </button>
                    <button className="main-creator-description__box1-part3-button2" 
                            onClick={()=>{click_box('/Terms_homepage')}}>
                                약관 보러가기
                    </button>
                </div>
            </div>
            <div className="main-creator-description__box2">
                <img className="main-creator-description__box2-part1" 
                     src={default_data.d_imgs.main_home1}></img>
                <div className="main-creator-description__box2-part2">
                    <span>보형짱 닷컴</span>
                </div>
                <img className="main-creator-description__box2-part3" 
                     src={default_data.d_imgs.main_home2}></img>
                <img className="main-creator-description__box2-part4" 
                     src={default_data.d_imgs.main_home3}></img>
            </div>
        </div>
    )

}

export default MainCreatorDescription