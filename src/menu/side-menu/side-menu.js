import React, {useState} from "react";
import './side-menu.css'
import FilterBtn from "../../Button/filterBtn/FilterBtn";
import PriceBtn from "../../Button/priceBtn/PriceBtn";
import CheckBtn from "../../Button/checkBtn/CheckBtn";
import BooleanBtn from "../../Button/booleanBtn/BooleanBtn";
import { useNavigate, useLocation, useParams } from "react-router-dom";

function Side_menu({default_data}){
    
    const params = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    const [url, setUrl] = useState(location.pathname)


    // console.log(location.pathname.split('/')[1]+'/'+params.city)
    // console.log(params)

    return(
        <div className="side-menu-container">
            <div className="side-menu-filter">
                <div>필터</div>
                <button className="side-menu-fil-btn" onClick={()=>{navigate(`/${location.pathname.split('/')[1]+'/'+params.city}`)
                                                                    window.location.reload()}}>초기화</button>
            </div>

            <div className="side-menu-content">
                <div className="side-content-category">
                    <div className="category-title">숙소유형</div>
                    <CheckBtn data={default_data.d_category_icon} keyValue={'category'} c_name={'category-content'}></CheckBtn>
                </div>

                <div className="side-content-price">
                    <div className="price-title">가격</div>
                    <div className="price-content">
                       <PriceBtn keyValue='price'></PriceBtn>
                    </div>
                </div>

                <div className="side-content-grade">
                    <div className="grade-title">키워드</div>
                    {default_data.d_keyword.map((ele,id)=>{
                        return(
                           <FilterBtn key={id} text={ele.name} keyValue={'keywords'}></FilterBtn>
                        )
                    })                        
                    }
                </div>

                <div className="side-content-discount">
                    <div className="discount-title">할인</div>
                    <div className="discount-content">
                        <BooleanBtn text='할인 상품' keyValue={'discount'}></BooleanBtn>
                    </div>
                </div>
                
                <div className="side-content-facility">
                    <div className="facility-title">추가 시설</div>
                    {default_data.d_service_facility_icon.map((ele,id)=>{
                        return(
                           <FilterBtn key={id} text={ele.name} keyValue={'service_facility'}></FilterBtn>
                        )
                    })                        
                    }

                </div>
            </div>
        </div>
    )
}

export default Side_menu
