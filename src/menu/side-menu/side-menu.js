import React from "react";
import { Link } from "react-router-dom";
import './side-menu.css'

function Side_menu(){
    return(
        <div className="side-menu-container">
            <div className="side-menu-filter">필터</div>
            <div className="side-menu-content">
                <div className="side-content-category">
                    <div className="category-title">숙소유형</div>
                    <div className="category-content">내용</div>
                </div>
                <div className="side-content-price">
                    <div className="price-title">가격</div>
                    <div className="price-content">내용</div>
                </div>
                <div className="side-content-grade">
                    <div className="grade-title">등급</div>
                    <div className="grade-content">내용</div>
                </div>
                <div className="side-content-discount">
                    <div className="discount-title">할인</div>
                    <div className="discount-content">내용</div>
                </div>
                <div className="side-content-facility">
                    <div className="facility-title">시설</div>
                    <div className="facility-content">내용</div>
                </div>
            </div>
        </div>
    )
}

export default Side_menu
