import React from "react";
import './search-menu.css';
import { Link } from "react-router-dom";
import Search from "./search/Search";

function Search_menu(){
    return(
        <div className="search-menu-container">
            <div className="img-box">
               <img className="innerImg" src="https://img.freepik.com/free-photo/beautiful-shot-sea-with-mountains-distance-blue-sky_181624-22886.jpg?t=st=1717468961~exp=1717472561~hmac=37f12e1603f7f000036bc88314b265d7c8ca3803063f30bc6c3007314ca958ac&w=1380"></img>
            </div>
            <div className="search-wrapper">
                <div className="search-menu-content">
                    <div className="search-content-text">
                        <div className="search-text-1">그린 아트 학원</div>
                        <div className="search-text-2">여행은 보형짱 닷컴</div>
                    </div>
                    <Search></Search>
                </div>
            </div>            
        </div>
    )
}

export default Search_menu