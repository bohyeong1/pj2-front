import React, {useRef} from "react";
import './Terms_homepage.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import Pri_side_menu from "../../../menu/pri-side-menu/Pri-side-menu";
import Footer from "../../../menu/footer/Footer";
import default_data from "../../../utilData/defaultData";

function Terms_homepage(){
    // 버튼 ref
    const terms_s_btn = useRef([])
    const terms_s_text = useRef([])         ////텍스트 ref

    // 버튼 클릭
    function clickBtn(index){
        console.log(terms_s_btn.current[index].style)
        for(let i=0; i<terms_s_btn.current.length; i++){
            if(i === index){
                if(!terms_s_btn.current[i].state){
                    terms_s_btn.current[i].style.transform += 'rotateZ(180deg)'
                    terms_s_text.current[i].style.display = 'block'
                    terms_s_btn.current[i].state = true
                }else{
                    terms_s_btn.current[i].style.transform += 'rotateZ(180deg)'
                    terms_s_text.current[i].style.display = 'none'
                    terms_s_btn.current[i].state = false
                }

            }else{
               terms_s_btn.current[i].style.transform = 'rotateZ(0deg)'
               terms_s_text.current[i].style.display = 'none'
               terms_s_btn.current[i].state = false
            }
        }


    }

    return(
        <div className="Terms_homepage-container">
            <Main_menu></Main_menu>
        
        
            <div className="Terms_homepage-content">
                <Pri_side_menu data={default_data.terms_sidemenu}></Pri_side_menu>
        
                <div className="Terms_homepage-con-main">
                    <div className="Terms_homepage-con-main-title">홈페이지 약관</div>
        
                    <div className="Terms_homepage-con-main-sec1">
                        {default_data.service_terms.map((el, id)=>{
                            return(
                                <div className="Terms_homepage-c-m-s1-b">
                                    <div className="Terms_homepage-c-m-s1-b-d" onClick={()=>{clickBtn(id)}}>
                                        <span>{el.title}</span>
                                        <img ref={(el)=>{terms_s_btn.current[id] = el}} src={default_data.d_imgs.down_arrow} state = {false}
                                       ></img>
                                    </div>

                                    <div className="Terms_homepage-c-m-s1-b-d2" ref={(el)=>{terms_s_text.current[id] = el}}>{el.text}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        
        
        
        
            <div className="Terms_homepage-footer">
                <Footer></Footer>
            </div>
         </div>
    )

}

export default Terms_homepage