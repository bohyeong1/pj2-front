import React from "react";
import './search-menu.css';
import Search from "./search/Search";
import { forwardRef } from "react";
import background_img from '@/assets/background/rending.webp'

const Search_menu = forwardRef((props, ref)=>{
    const { subtitle, shadow, data } = props
    // console.log(props)
    
    return(
        <div className="search-menu-container">
            <div className="img-box">
               <img className="innerImg" src={background_img}/>
            </div>
            <div className="search-wrapper">
                <div className="search-menu-content">
                    <div className="search-content-text">
                        <span className="search-text-1">그린 아트 학원</span>
                        <span className="search-text-2">여행은 보형짱 닷컴</span>
                    </div>

                    <div className={`search-content-search ${shadow ? 'search-shadow' : ''}`} 
                         ref={ref}>
                        <div className="search-top-line" 
                             style={{display:`${subtitle ? 'block' : 'none'}`}}>
                            <div className="top-line-text1">
                                <span>어디로 떠나고 싶으세요?</span>
                            </div>
                        </div>
                        <div className="search-bottom-line-wrapper">
                            <Search data={data}/>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    )
})

export default Search_menu