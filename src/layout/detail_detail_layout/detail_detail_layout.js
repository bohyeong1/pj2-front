import './detail_detail_layout.scss'
import '@/manage_scss_style/commonness/commonness.scss'
import React from 'react'

function DetailDetailLayout({children}){
    // =================================================
    // mapping children //    
    const children_object = {}
    React.Children.forEach(children, (el)=>{
        if(el.props.role){
            children_object[el.props.role] = el
        }
    })

    return (
        <div className="detail-detail-layout__container">
            {/* 이미지 디스플레이 */}
            <section className="detail-detail-layout__img">
                {children_object.img_display}
            </section>

            {/* 숙소 정보 헤더 */}
            <section className='detail-detail-layout__header'>
                {children_object.header}
            </section>
            {/* 요약 숙소 정보 섹션 */}
            <section className="detail-detail-layout__section1">
                <div className="detail-detail-layout__section1-part1">
                    {children_object.summary}
                </div>
                <div className="detail-detail-layout__section1-part2">
                    {children_object.payment}
                </div>
            </section>
            {/* 지도 */}
            <section className="detail-detail-layout__section2">
                {children_object.map}
            </section>

            {/* 숙소 평점 */}
            <section className="detail-detail-layout__section3">
                {children_object.evaluation}
            </section>

            {/* 댓글목록 페이지네이션으로 구성하기 */}
            <section className="detail-detail-layout__section4">
                {children_object.reply}
            </section>

            {/* 호스트 정보 */}
            <section className="detail-detail-layout__section5">
                {children_object.host_information}
            </section>

            {/* 이용규칙 */}
            <section className="detail-detail-layout__section6">
                {children_object.rule}
            </section>
        </div>
    )
}

export default DetailDetailLayout