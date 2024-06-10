import React from "react";
import './search-menu.css';
import { Link } from "react-router-dom";
import Search from "./search/Search";

function Search_menu({shadow , subtitle, data}){
    // console.log(shadow)
    return(
        <div className="search-menu-container">
            <div className="img-box">
               <img className="innerImg" src="https://img.freepik.com/free-photo/umbrella-chair-around-outdoor-swimming-pool-resort-hotel-vacation-leisure_74190-14754.jpg?t=st=1717503613~exp=1717507213~hmac=9ec3825949f7eaf01a7c44df35d56f683d82a985d9656197d03cbe55bd5552a5&w=1380"></img>
            </div>
            <div className="search-wrapper">
                <div className="search-menu-content">
                    <div className="search-content-text">
                        <div className="search-text-1">그린 아트 학원</div>
                        <div className="search-text-2">여행은 보형짱 닷컴</div>
                    </div>
                    <Search shadow={shadow} subtitle={subtitle} data={data}></Search>
                </div>
            </div>            
        </div>
    )
}

export default Search_menu