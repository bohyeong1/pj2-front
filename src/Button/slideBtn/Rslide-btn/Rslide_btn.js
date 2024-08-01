import React from "react";
import './Rslide_btn.css'

function Rslide_btn({handleFunction, btnState}){
    // console.log(btnState)
    return(
        <div className={'Rslide_btn-container'} onClick={handleFunction} style={{display: `${btnState ? 'none' : 'block' }`
        }}>
            <img className="Rslide_btn-con-img" 
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA+ElEQVR4nO3YO0oEQRQF0IMgIiYaGmqkK3ABugHNXIVbcAuGpuIG3IAfUAxE9zChmWAyoPhkoE0GBHukne7nO3Djrlv9qypKKaWUUv69Szxhe+gzEU1ecShBkWhyhmUJigQesSlBkcALDiQoMskHTrBo4EW+coN1CYoEnrEnQZHAO46xMOvF7lpesOtcYK3rWfurjLCToUhgjKMMRaLJOVYyFAncVxHzvwuR5dEaZ3jZR7N8fm97MPCY+iGu6pk2Bd5+u0TpUptF464e+0mJ66Ev41NsrCZb3X0D8t3hw4aBiamcYskARZYDuis8YGveAymllFJK0b1PWPYJBNI2YFUAAAAASUVORK5CYII="/>
        </div>
    )
}

export default Rslide_btn