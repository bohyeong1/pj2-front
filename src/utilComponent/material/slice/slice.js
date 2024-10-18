import './slice.scss'

function Slice({url, img, title, text1, text2}){

    return(
        <div className="slice__container" onClick={()=>{window.open(`${url}`)}}>
            <div className="slice__img-box">
                <img className="slice__img" src={img}></img>
            </div>

            <div className="slice__content">
                <div className="slice__content-title">{title}</div>
                <span className="slice__content-text1">{text1}</span>
                <span className="slice__content-text1">{text2}</span>
            </div>
        </div>
    )
}

export default Slice

