import React from "react";
import { NavLink } from "react-router-dom";
import './Lv2-description.css'
import Midium_main from "../../../picture/midium-main/Midium-main";
import Rslide_btn from "../../../Button/slideBtn/Rslide-btn/Rslide_btn";
import Lslide_btn from "../../../Button/slideBtn/Lslide-btn/Lslide_btn";


function Lv2_description({title, data}){
    // console.log(data)
    return(
        <div className="lv2-description-container">
                <div className="lv2-description-title">{title}</div>
                <div className="lv2-description-content">
                    <div className="lv2-content-container">
                        {data ? data.map((ele,id)=>{  
                                            
                            return(
                            <NavLink to={`SubApp/Detail_infoApp/${ele._id}`} key={id} className="lv2-img-wrapper">
                                <div className="lv2-img-container">
                                    <Midium_main data={ele}></Midium_main>
                                </div>
                                <div className="lv2-img-text">
                                    <div className="lv2-img-tex1">{ele.category.name}</div>
                                    <div className="lv2-img-tex2">{ele.title}</div>
                                    <div className="lv2-img-tex3">{ele.search_adress}</div>
                                    <div className="lv2-img-tex4">{`${'평점'}`}</div>
                                    <div className="lv2-img-tex5">{`${ele.price}원`}</div>
                                </div>
                            </NavLink>
                            )                  
                                            
                        }) : null}
                    </div>                                                          
                </div>
        </div>
    )
}

export default Lv2_description