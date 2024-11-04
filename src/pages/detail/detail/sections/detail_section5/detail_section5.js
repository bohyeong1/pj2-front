import React from "react";
import './detail_section5.scss'
import { get_date_difference, state_store } from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";

function DetailSection5({seller, role}){    
    
    return(
        <div className="detail-section5__container">
            <div className="detail-section5__container-title">
                <span>호스트 소개</span>
            </div>
            <div className="detail-section5__container-contents">
                {/* user profile */}
                <div className="detail-section5__container-contents-user-profile box-shadow-lv2">
                    <div className='detail-section5__container-contents-box1-item1'>
                        <div className='detail-section5__container-contents-box1-profile'>
                            {seller.profileImg ? null : <span>{seller.name.slice(0,1)}</span>}
                            <img src={seller.profileImg ? seller.profileImg : undefined}></img>
                        </div>
                        <div className='detail-section5__container-contents-box1-name'>
                            <span>{seller.name} 님</span>
                        </div>
                    </div>

                    <div className='detail-section5__container-contents-box1-item2'>
                        <div>
                            <span>후기</span>
                            <div>
                                <span>0</span>
                                <span>개</span>
                            </div>
                        </div>
                        <div>
                            <span>평점</span>
                            <div>
                                <span>미평가</span>
                                <img ></img>
                            </div>
                        </div>
                        <div>
                            <span>호스팅 경력</span>
                            <div>
                                <span>{get_date_difference(seller.host_text.createAt)}</span>
                            </div>
                        </div>
                    </div>                    
                </div>

                {/* 인증 정보 */}
                <div className='detail-section5__container-contents-box2'>
                    <div>
                        <span>{seller.name} </span>
                        <span>님의 인증 정보</span>
                    </div>
                    <div className='detail-section5__container-contents-box2-text'>
                        <div>
                            <img src={seller.email ? default_data.d_imgs.check : default_data.d_imgs.no_check}></img>
                            <span>이메일 주소</span>
                        </div>
                        <div>
                            <img src={default_data.d_imgs.no_check}></img>
                            <span>휴대폰 번호</span>
                            <span>(추후 인증 서비스 도입)</span>
                        </div>
                        <div>
                            <span>안전한 체크인을 위해 보형짱닷컴 웹사이트의 '대화하기' 기능 이외에 대화를 자제해주세요.</span>
                        </div>
                    </div>
                </div>

                {/* introduce */}
                <div className='detail-section5__container-contents-box3'>
                    <div>
                        <span>소개</span>
                    </div>
                    <div className="detail-section5__container-contents-box3-introduce">
                        <pre>
                            {seller.host_text.host_text}
                        </pre>
                        {/* <button>자세히 보기</button> */}
                    </div>
                </div>

            </div>

        </div>
    )
}


export default DetailSection5