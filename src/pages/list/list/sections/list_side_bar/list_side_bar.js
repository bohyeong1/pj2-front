import './list_side_bar.scss'
import HazyImg from '@/picture/hazy-img/hazy_img'
import default_data from "@/util/default_data/default_data";
import CheckButton from '@/util/component/button/check_button/check_button'
import PriceButton from '@/util/component/button/price_button/price_button';
import FilterButton from '@/util/component/button/filter_button/filter_button'
import BooleanButton from '@/util/component/button/boolean_button/boolean_button'
import useListSideBarStyle from '../../hook_store/style_hooks/list_side_bar_style';
import MapModal from '@/util/component/modal/mapModal/map_modal';

function ListSideBar({data}){

    // =================================================
    // hooks //
    const {modal_toggle} = useListSideBarStyle()

    return (
        <div className="list-side-bar__container">
            <div className="side-menu__map-container">
                <div className="side-menu__map-img-container">
                   <HazyImg url={default_data.d_imgs.map}/>
                </div>
                <button 
                    className="side-menu__map-button" 
                    onClick={()=>{modal_toggle('list-map-modal')}}>
                    <span className="side-menu__map-button-text">지도 보기</span>
                </button>
            </div>
            <div className="side-menu-filter">
                <div>필터</div>
                <button 
                    className="side-menu-fil-btn" 
                    // onClick={initial_page}
                    >
                        초기화
                </button>
            </div>
            <div className="side-menu-content">
                <div className="side-content-category">
                    <div className="category-title">숙소유형</div>
                    <CheckButton 
                        data={default_data.d_category_icon} 
                        keyValue={'category'} 
                        c_name={'category-content'}/>
                </div>

                <div className="side-content-price">
                    <div className="price-title">가격</div>
                    <div className="price-content">
                       <PriceButton 
                            key_value1='price-min' 
                            key_value2='price-max'/>
                    </div>
                </div>

                <div className="side-content-grade">
                    <div className="grade-title">#키워드</div>
                    <div className="side-menu__grade-container">
                        {default_data.d_keyword.map((ele,id)=>{
                            return(
                            <FilterButton 
                                key={id} 
                                text={ele.name} 
                                keyValue={'keywords'}/>
                            )
                        })                        
                        }
                    </div>
                </div>

                <div className="side-content-discount">
                    <div className="discount-title">할인</div>
                    <div className="discount-content">
                        <BooleanButton 
                            text='할인 상품' 
                            keyValue={'discount'}/>
                    </div>
                </div>
                
                <div className="side-content-facility">
                    <div className="facility-title">추가 시설</div>
                    <div className="side-menu__facility-container">
                        {default_data.d_service_facility_icon.map((ele,id)=>{
                            return(
                            <FilterButton 
                                key={id} 
                                text={ele.name} 
                                keyValue={'service_facility'}/>
                            )
                        })                        
                        }
                    </div>
                </div>
            </div>
            <MapModal
                key_name = {'list-map-modal'}
                data = {data}
                modal_toggle = {modal_toggle}/>
        </div>
    )
}

export default ListSideBar