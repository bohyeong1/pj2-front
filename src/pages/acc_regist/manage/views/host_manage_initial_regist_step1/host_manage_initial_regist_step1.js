import React from "react";
import './host_manage_initial_regist_step1.scss'
import { useState } from "react";
import { state_store } from "@/util/function/util_function";
import useHostManageInitialRegistStep1Business from "../../hook_store/business_hooks/host_manage_initial_regist_step1_business";
import Loading from "@/utilComponent/material/loading/loading";

function HostManageInitialRegistStep1(){

    // =================================================
    // states //
    const [loading, setLoading] = useState(null)
    const [user_state, setUser_state] = useState(null)

    // =================================================
    // hooks //  
    // business  
    const {host_regist_click} = useHostManageInitialRegistStep1Business(undefined, 
        state_store([
            {loading, setLoading},
            {user_state, setUser_state}
        ])
    )

    return (
        !loading ? <Loading></Loading> : 
        <div className="host-manage-initial-regist-step1">
            <div className="host-manage-initial-regist-step1__container">
                <div className="host-manage-initial-regist-step1__container-section1">
                    {/* pigma img */}
                    <img 
                        src="/imgs/regist_initial.png" 
                        className="host-manage-initial-regist-step1__deapyo-img"/>
                    <div className="host-manage-initial-regist-step1__container-section1-part1">
                        <span>{`${user_state.userId} 님 반갑습니다!`}</span>
                        <div className="host-manage-initial-regist-step1__container-section1-part1-box1">
                            <button onClick={host_regist_click}>호스트 등록하기</button>
                        </div>
                    </div>
                </div>

                <div className="host-manage-initial-regist-step1__container-section2">
                    <div>
                        <span>호스트 등록</span>
                        <div>
                            <div>
                                <span>1.</span>
                                <span>호스트 등록하기 버튼을 클릭해 주세요.</span>
                            </div>
                            <div>
                                <span>2.</span>
                                <span>이메일 인증을 해주셔야 호스트를 등록할 수 있습니다.</span>
                            </div>
                            <div>
                                <span>3.</span>
                                <span>학습 및 취업을 목적으로 제작된 사이트이므로 자세한 주소 기입은 지양해 주세요.</span>
                            </div>
                            <div>
                                <span>4.</span>
                                <span>실제 현금이 아닌 홈페이지 자체적인 마일리지를 통해서 숙소 구입 및 호스팅 시스템을 사용할 수 있습니다.</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span>호스트 정보 기입</span>
                        <div>
                            <div>
                                <span>1.</span>
                                <span>게스트들에게 자신을 소개해 주세요!</span>
                            </div>
                            <div>
                                <span>2.</span>
                                <span>이메일 인증을 해주셔야 호스트를 등록할 수 있습니다.</span>
                            </div>
                            <div>
                                <span>3.</span>
                                <span>학습 및 취업을 목적으로 제작된 사이트이므로 자세한 주소기입은 지양해 주세요.</span>
                            </div>
                            <div>
                                <span>4.</span>
                                <span>게스트들에게 자신을 대표하는 이미지를 등록해 주세요!</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <span>숙소 등록</span>
                        <div>
                            <div>
                                <span>1.</span>
                                <span>간단한 절차를 통해서 숙소를 등록하실 수 있습니다.</span>
                            </div>
                            <div>
                                <span>2.</span>
                                <span>호스트 등록과 호스트 정보기입을 끝마쳐야 숙소를 등록하실 수 있어요.</span>
                            </div>
                            <div>
                                <span>3.</span>
                                <span>학습 및 취업을 목적으로 제작된 사이트이므로 자세한 주소 기입은 지양해 주세요.</span>
                            </div>
                            <div>
                                <span>4.</span>
                                <span>한 아이디 당 숙소의 등록은 5회로 제한되어 있습니다.</span>
                            </div>                     
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HostManageInitialRegistStep1