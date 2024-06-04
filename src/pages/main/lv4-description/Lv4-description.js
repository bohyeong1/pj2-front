import React from "react";
import { NavLink } from "react-router-dom";
import './Lv4-description.css'
import Midium_main from "../../../picture/midium-main/Midium-main";
import Rslide_btn from "../../../Button/slideBtn/Rslide-btn/Rslide_btn";
import Lslide_btn from "../../../Button/slideBtn/Lslide-btn/Lslide_btn";


function Lv4_description({title, data, imgurl}){
    // console.log(data)
    return(
        <div className="Lv4-description-container">
            <img className="lv4-des-con-backImg" src={`${imgurl ? imgurl : null}`} style={{display:`${imgurl ? 'block' : 'none'}`}}></img>
            <div className="lv4-des-con-wrapper">
                <div className="Lv4-description-title">{`자연과 하나 되는 ${title}`}</div>
                <div className="Lv4-description-content">
                    <div className="lv4-content-container">
                        {data ? data.map((ele,id)=>{  
                                            
                            return(
                            <NavLink to={`SubApp/Detail_infoApp/${ele._id}`} key={id} className="lv4-img-wrapper">
                                <div className="lv4-img-container">
                                    <Midium_main data={ele}></Midium_main>
                                </div>
                                <div className="lv4-img-text">
                                    <div className="lv4-img-tex1">{ele.category.name}</div>
                                    <div className="lv4-img-tex2">{ele.title}</div>
                                    <div className="lv4-img-tex3">{ele.search_adress}</div>
                                    <div className="lv4-img-tex4">{`${'평점'}`}</div>
                                    <div className="lv4-img-tex5">{`${ele.price}원`}</div>
                                </div>
                            </NavLink>
                            )                  
                                            
                        }) : null}
                    </div>                                                          
                </div>
                </div>
        </div>
    )
}

export default Lv4_description