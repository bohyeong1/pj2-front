import React from "react";
import './search-menu.css';
import { Link } from "react-router-dom";
import Search from "./search/Search";

function Search_menu({shadow , subtitle, data}){
    // console.log(shadow)
    return(
        <div className="search-menu-container">
            <div className="img-box">
               <img className="innerImg" src="https://cdn.pixabay.com/photo/2018/01/28/08/49/sunset-3113049_1280.jpg"></img>
            </div>
            <div className="search-wrapper">
                <div className="search-menu-content">
                    <div className="search-content-text">
                        <span className="search-text-1">그린 아트 학원</span>
                        <span className="search-text-2">여행은 보형짱 닷컴</span>
                    </div>
                    <Search shadow={shadow} subtitle={subtitle} data={data}></Search>
                </div>
            </div>            
        </div>
    )
}

export default Search_menu