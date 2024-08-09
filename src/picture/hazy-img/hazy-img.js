import React from 'react';
import './hazy-img.css'

// 흐릿한 이미지 opacity = 0.55 & 호버 이벤트 없음
function Hazy_img({url}){


    const default_img = 'https://media.istockphoto.com/id/1357365823/ko/%EB%B2%A1%ED%84%B0/%EA%B8%B0%EB%B3%B8-%EC%9D%B4%EB%AF%B8%EC%A7%80-%EC%95%84%EC%9D%B4%EC%BD%98-%EB%B2%A1%ED%84%B0%EC%9E%85%EB%8B%88%EB%8B%A4-%EC%9B%B9-%EC%82%AC%EC%9D%B4%ED%8A%B8-%EB%94%94%EC%9E%90%EC%9D%B8-%EB%98%90%EB%8A%94-%EB%AA%A8%EB%B0%94%EC%9D%BC-%EC%95%B1%EC%97%90-%EB%8C%80%ED%95%9C-%EB%88%84%EB%9D%BD-%EB%90%9C-%EC%82%AC%EC%A7%84-%ED%8E%98%EC%9D%B4%EC%A7%80%EC%9E%85%EB%8B%88%EB%8B%A4-%EC%82%AC%EC%9A%A9%ED%95%A0-%EC%88%98-%EC%9E%88%EB%8A%94-%EC%82%AC%EC%A7%84%EC%9D%B4-%EC%97%86%EC%8A%B5%EB%8B%88%EB%8B%A4.jpg?s=1024x1024&w=is&k=20&c=kQnevkWDi-KhzvWzLwkYe4ERud1_7_rzkBBpvjQPb2g='

    return(
        <>
            <img className='hazy-img'  src={url ? url : default_img}></img>
        </>           
    )
}

export default Hazy_img