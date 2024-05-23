import React from "react";
import { Link } from "react-router-dom";
import './side-menu.css'
import FilterBtn from "../../Button/filterBtn/FilterBtn";
import PriceBtn from "../../Button/priceBtn/PriceBtn";
import CheckBtn from "../../Button/checkBtn/CheckBtn";
import BooleanBtn from "../../Button/booleanBtn/BooleanBtn";

function Side_menu({default_data}){

    return(
        <div className="side-menu-container">
            <div className="side-menu-filter">필터</div>
            <div className="side-menu-content">
                <div className="side-content-category">
                    <div className="category-title">숙소유형</div>

                    <CheckBtn data={default_data.d_category} keyValue={'category'} c_name={'category-content'}></CheckBtn>


                </div>
                <div className="side-content-price">
                    <div className="price-title">가격</div>
                    <div className="price-content">
                       <PriceBtn keyValue='price'></PriceBtn>
                    </div>
                </div>
                <div className="side-content-grade">
                    <div className="grade-title">등급</div>
                    <CheckBtn data={default_data.d_grade} keyValue={'grade'} c_name={'grade-content'}></CheckBtn>
                </div>
                <div className="side-content-discount">
                    <div className="discount-title">할인</div>
                    <div className="discount-content">
                        <BooleanBtn text='할인 상품' keyValue={'discount'}></BooleanBtn>
                    </div>
                </div>
                <div className="side-content-facility">
                    <div className="facility-title">시설</div>
                    {default_data.d_service_facility.map((ele,id)=>{
                        return(
                           <FilterBtn key={id} text={ele} keyValue={'service_facility'}></FilterBtn>
                        )
                    })
                        
                    }

                </div>
            </div>
        </div>
    )
}

export default Side_menu
