import React from "react";
import './Search.css'

function Search(){

    return(
        <div className="search-content-search">
            <div className="search-top-line">
                <div className="top-line-text1">숙박</div>
                <div className="top-line-text2">대실</div>
            </div>
            <div className="search-bottom-line">
                <div className="bottom-line-box1">지역</div>
                <div className="bottom-line-box2">날짜</div>
                <div className="bottom-line-box3">인원</div>
                 <div className="bottom-line-box4">검색</div>
            </div>
        </div>
    )
}

export default Search