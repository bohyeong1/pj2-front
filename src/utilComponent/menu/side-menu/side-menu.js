import React, {forwardRef} from "react";
import './side-menu.css'
import FilterBtn from "../../Button/filterBtn/FilterBtn";
import PriceBtn from "../../Button/priceBtn/PriceBtn";
import CheckBtn from "../../Button/checkBtn/CheckBtn";
import BooleanBtn from "../../Button/booleanBtn/BooleanBtn";
import default_data from "../../../utilData/defaultData";
import Hazy_img from "../../../picture/hazy-img/hazy-img";

// import { state_store, reference_store } from "../../../utilData/UtilFunction";
import useMenuSideBusiness from "../hook-store/business-hooks/menu-side-business";
import useMenuSideStyle from "../hook-store/style-hooks/menu-side-style";


const Side_menu = forwardRef((props, ref) => {    

    // props
    const {modal} = props

    ////////////////////////////////////
    ////////////// hooks ///////////////
    ////////////////////////////////////
    // business
    const {initial_page} = useMenuSideBusiness()

    // style
    const {handle_modal} =  useMenuSideStyle(undefined,undefined,undefined,{
        handle_ref : ref
    })




    return(
        <div className="side-menu-container">
            {!modal ? 
            <div className="side-menu__map-container">
                <div className="side-menu__map-img-container">
                   <Hazy_img url={default_data.d_imgs.map}></Hazy_img>
                </div>
                <button className="side-menu__map-button" onClick={handle_modal}>
                    <span className="side-menu__map-button-text">지도 보기</span>
                </button>
            </div> : null}
            <div className="side-menu-filter">
                <div>필터</div>
                <button className="side-menu-fil-btn" onClick={initial_page}>초기화</button>
            </div>
            <div className="side-menu-content">
                <div className="side-content-category">
                    <div className="category-title">숙소유형</div>
                    <CheckBtn data={default_data.d_category_icon} keyValue={'category'} c_name={'category-content'}></CheckBtn>
                </div>

                <div className="side-content-price">
                    <div className="price-title">가격</div>
                    <div className="price-content">
                       <PriceBtn keyValue1='price-min' keyValue2='price-over'></PriceBtn>
 
                    </div>
                </div>

                <div className="side-content-grade">
                    <div className="grade-title">#키워드</div>
                    <div className="side-menu__grade-container">
                        {default_data.d_keyword.map((ele,id)=>{
                            return(
                            <FilterBtn key={id} text={ele.name} keyValue={'keywords'}></FilterBtn>
                            )
                        })                        
                        }
                    </div>
                </div>

                <div className="side-content-discount">
                    <div className="discount-title">할인</div>
                    <div className="discount-content">
                        <BooleanBtn text='할인 상품' keyValue={'discount'}></BooleanBtn>
                    </div>
                </div>
                
                <div className="side-content-facility">
                    <div className="facility-title">추가 시설</div>
                    <div className="side-menu__facility-container">
                        {default_data.d_service_facility_icon.map((ele,id)=>{
                            return(
                            <FilterBtn key={id} text={ele.name} keyValue={'service_facility'}></FilterBtn>
                            )
                        })                        
                        }
                    </div>
                </div>
            </div>
        </div>
    )
})

export default Side_menu
