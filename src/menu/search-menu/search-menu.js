import React from "react";
import './search-menu.css';
import { Link } from "react-router-dom";
import Search from "./search/Search";

function Search_menu(){
    return(
        <div className="search-menu-container">
            <div className="video-box">
               <iframe className="innerVideo" width="1920" height="315" src="https://www.youtube.com/embed/viIhOorr11I?si=lDjDgGLrwl4pifQ2&autoplay=1&mute=1&controls=0&loop=1&playlist=viIhOorr11I"></iframe>
            </div>
            <div className="search-wrapper">
                <div className="search-menu-content">
                    <div className="search-content-text">
                        <div className="search-text-1">아름다운 한국</div>
                        <div className="search-text-2">여행은 보형짱 닷컴</div>
                    </div>
                    <Search></Search>
                </div>
            </div>
            
        </div>
    )
}

export default Search_menu