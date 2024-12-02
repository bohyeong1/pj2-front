import background_img from '@/assets/background/rending.webp'
import './main_search_board.scss'
import SearchMenu from '@/util/component/menu/search-menu/search_menu'

function MainSearchBoard({data}){
    return (
        <div className="main-search-board__container">
            <div className="main-search-board__img-box">
               <img 
                    className="main-search-board__img" 
                    src={background_img}/>
            </div>
            <div className="main-search-board__wrapper">
                <div className="main-search-board__menu-content">
                    <div className="main-search-board__content-text">
                        <span className="main-search-board__text-1">그린 아트 학원</span>
                        <span className="main-search-board__text-2">여행은 보형짱 닷컴</span>
                    </div>

                    <div className={`main-search-board__content-search search-shadow`} 
                         >
                        <div className="main-search-board__top-line">
                            <div className="main-search-board__top-line-text1">
                                <span>어디로 떠나고 싶으세요?</span>
                            </div>
                        </div>
                        <div className="main-search-board__bottom-line">
                            <SearchMenu
                                data = {data}
                                preview_form = {false}
                                related_preview = {false}/>
                        </div>
                    </div>
                </div>
            </div>          
        </div>
    )
}

export default MainSearchBoard