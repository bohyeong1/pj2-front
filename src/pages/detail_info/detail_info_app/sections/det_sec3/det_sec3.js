import React, {useEffect} from "react";
import './det_sec3.scss'


function Det_sec3({data, avgdata}){
    
    console.log(data)

    ///받아온 데이터 순서 바꾸기 
    useEffect(()=>{
        if(avgdata){
            let index
            for(let i = 0; i < avgdata.length; i++){
                if(avgdata[i]._id.title === '전체 평점'){
                    index = i
                    break
                }
            }
            const totalAvg = avgdata[index]
            const subAvg = avgdata[0]
            avgdata[0] = totalAvg
            avgdata[index] = subAvg
        }

    },[avgdata])
    // console.log(avgdata)
    
    return(
        <div className="Det_sec3-container">
            <div className="Det_sec3-nodata"  style={{display:`${data?.length !== 0 ? 'none' : 'block'}`}}>
                <span style={{marginRight : '15px'}}>해당 숙소를 평가해 준 인원이 아직 없어요</span>
                <img className="Det_sec3-nodata-img" src="data:image/png;base64,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"></img>
            </div>
            
            <div className="Det_sec3-sec1"  style={{display:`${data?.length !== 0 ? 'block' : 'none'}`}}>
                <div className="Det_sec3-s1-b1">
                    <div className="Det_sec3-s1-b1-d1">{`${avgdata ? avgdata[0]?.average.toFixed(2) : ''}점`}</div>
                    <img className="Det_sec3-s1-b1-d2" src="data:image/png;base64,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"></img>
                </div>
                <div className="Det_sec3-s1-b2">
                    <div className="Det_sec3-s1-b2-d1">평가 인원</div>
                    <div className="Det_sec3-s1-b2-d2">{`${data?.length}명이 평가해주셨습니다!`}</div>
                </div>
            </div>

            <div className="Det_sec3-sec2">
                {avgdata?.map((el, id)=>{
                    return(
                        <div className="Det_sec3-sec2-categories" key={id}>
                            <div>{el?._id.title}</div>
                            <div>{el?.average.toFixed(1)}</div>
                            <div>
                                <img src={el?._id.url} style={{width:'60%'}}></img>
                            </div>
                            
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default Det_sec3