import React from "react";
import './Lslide_btn.css'

function Lslide_btn({moveSlide, btnState, direction, distance, left, px, top}){
    


    return(
        <div className={`Lslide_btn-container ${direction ? 'btn-left' : 'btn-right'}`} onClick={(e) => moveSlide(distance)}  
        style={{display: `${!left && !btnState ? 'none' :`${btnState ? 'none' : 'block' }`}`, left : `${px+'px'}`, top:`${top + 'px'}`}}>
            
            <img className="Lslide_btn-con-img" 
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA+ElEQVR4nO3YO0oEQRQF0IMgIiYaGmqkK3ABugHNXIVbcAuGpuIG3IAfUAxE9zChmWAyoPhkoE0GBHukne7nO3Djrlv9qypKKaWUUv69Szxhe+gzEU1ecShBkWhyhmUJigQesSlBkcALDiQoMskHTrBo4EW+coN1CYoEnrEnQZHAO46xMOvF7lpesOtcYK3rWfurjLCToUhgjKMMRaLJOVYyFAncVxHzvwuR5dEaZ3jZR7N8fm97MPCY+iGu6pk2Bd5+u0TpUptF464e+0mJ66Ev41NsrCZb3X0D8t3hw4aBiamcYskARZYDuis8YGveAymllFJK0b1PWPYJBNI2YFUAAAAASUVORK5CYII="/>
        </div>
    )
}

export default Lslide_btn