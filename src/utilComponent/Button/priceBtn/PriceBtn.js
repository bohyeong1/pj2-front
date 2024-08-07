import React, {useRef, useState, useEffect} from "react";
import { useSearchParams } from "react-router-dom";
import './PriceBtn.css'
import { state_store, reference_store } from "../../../utilData/UtilFunction";
import useButtonPricebtnBusiness from "../hook-store/business-hooks/button-pricebtn-business";
import useButtonPricebtnStyle from "../hook-store/style-hooks/button-pricebtn-style";
import Swiper from 'swiper';
import 'swiper/swiper-bundle.css'



function PriceBtn({keyValue}){
    const price_text = useRef()
    const [SearchParams, setSearchParams] = useSearchParams()
    
    function moveRangebar(e){
        let gradient_value = 100 / e.target.attributes.max.value;
        e.target.style.background = 'linear-gradient(to right, black 0%, black '+gradient_value * e.target.value +'%, rgb(236, 236, 236) ' +gradient_value *  e.target.value + '%, rgb(236, 236, 236) 100%)';

        if(e.target.value ==='200000'){
            price_text.current.innerText = Number(e.target.value) + '원 이상' 
        }else{
            price_text.current.innerText = Number(e.target.value) + 30000 + '원 미만' 
        }       
    }

    function upRange(e){
        console.log(e.target.value)
        if(e.target.value === '200000'){
            SearchParams.set(keyValue, e.target.value +'%over')
            setSearchParams(SearchParams)
        }else{
            SearchParams.set(keyValue,Number(e.target.value)+30000)
            setSearchParams(SearchParams)
        }
    }


    return(
        <div className="PriceBtn-container">
            <div className="PriceBtn-box">
                <div className="PriceBtn-benchmark"></div>
                <div className="PriceBtn-bar-box">
                    <input type='range' min={20000} max={200000} step={30000} className="PriceBtn-bar" onInput={moveRangebar} onMouseUp={upRange}></input>
                </div>
            </div>            
            <div className="PriceBtn-text" ref={price_text}></div>
        </div>
    )
}

export default PriceBtn













// export const PriceSlider = () => {
//     const swiperRef = useRef(null); // Swiper 인스턴스를 담을 ref
//     const [value, setValue] = useState(20000); // 슬라이더의 현재 값


//     //최댓값
//     const max = 500000
//     // 슬라이더 단계
//     const steps = [0, 30000, 50000, 100000, 200000, 300000, 400000, 500000]

//     useEffect(() => {
//         // Swiper 인스턴스를 초기화
//         swiperRef.current = new Swiper('.swiper-container', {
//             slidesPerView: 'auto',
//             spaceBetween: 10,
//             freeMode: true,
//             on: {
//                 setTranslate: (swiper, translate) => {
//                     const index = Math.round(-translate / swiper.width * (steps.length - 1))
//                     setValue(steps[index])
//                 },
//                 touchEnd: (swiper) => {
//                     const index = Math.round(swiper.getTranslate() / swiper.width * (steps.length - 1))
//                     setValue(steps[index])
//                 }
//             }
//         })
//         // 클린업 함수로 컴포넌트 언마운트 시 Swiper 인스턴스를 제거
//         return () => {
//             if (swiperRef.current) {
//                 swiperRef.current.destroy()
//             }
//         }
//     }, [steps])




//     return (
//         <div className="PriceSlider-container">
//             <div className="swiper-container" ref={swiperRef}>
//                 <div className="swiper-wrapper">
//                     {steps.map((stepValue, index) => (
//                         <div key={index} className="swiper-slide">
//                             {stepValue}
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className="PriceSlider-text">
//                 {value.toFixed(2)}
//             </div>
//         </div>
//     )
// }

export const PriceSlider = () => {
    const swiperContainerRef = useRef(null);
    const swiperRef = useRef(null);
    const [steps, setSteps] = useState([1, 2, 3, 4, 5]); // 예시 데이터를 위해 추가
    const [value, setValue] = useState(steps[0]);
  
    useEffect(() => {
      if (swiperContainerRef.current) {
        // Swiper 인스턴스를 초기화
        swiperRef.current = new Swiper(swiperContainerRef.current, {
          slidesPerView: 'auto',
          spaceBetween: 10,
          freeMode: true,
          on: {
            setTranslate: (swiper, translate) => {
              const index = Math.round(-translate / swiper.width * (steps.length - 1));
              setValue(steps[index]);
            },
            touchEnd: (swiper) => {
              const index = Math.round(swiper.getTranslate() / swiper.width * (steps.length - 1));
              setValue(steps[index]);
            },
          },
        });
      }
  
      // 클린업 함수로 컴포넌트 언마운트 시 Swiper 인스턴스를 제거
      return () => {
        if (swiperRef.current) {
          swiperRef.current.destroy();
        }
      };
    }, [steps]);
  
    return (
      <div>
        <div className="swiper-container" ref={swiperContainerRef}>
          <div className="swiper-wrapper">
            {steps.map((step, index) => (
              <div className="swiper-slide" key={index}>
                Slide {step}
              </div>
            ))}
          </div>
        </div>
        <div>
          Current Value: {value}
        </div>
      </div>
    );
  };
