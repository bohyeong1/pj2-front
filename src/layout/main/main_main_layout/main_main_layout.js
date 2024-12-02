import Footer from "@/utilComponent/menu/footer/Footer"
import './main_main_layout.scss'
import React from "react"
import { useRef } from "react"

function MainMainLayout({children}){
    // =================================================
    // mapping children //    
    const children_object = {}
    React.Children.forEach(children, (el)=>{
        if(el.props.role){
            children_object[el.props.role] = el
        }
    })

    // =================================================
    // refs //    
    const main_app_ref = useRef(null)

    return (
        <div className="main-main-layout__container"
             ref={main_app_ref}>
            <nav className="main-main-layout__header not-user-sellect">
                <div className="main-main-layout__header-menu-container">
                    {children_object.main_menu}
                </div>
            </nav>
            <main className="main-main-layout__main">
                {/* 검색 보드 */}
                <section className="main-main-layout__section-search">
                    {children_object.search_board}
                </section>
                {/* 이벤트 */}
                <section>
                    {children_object.event}
                </section>
                {/* 지역별 숙소 리스트 이동 */}
                <section>
                    {children_object.local}
                </section>
                {/* category 별 분류 1 */}
                <section>
                    {children_object.category1}
                </section>
                {/* category 별 분류 2 */}
                <section>
                    {children_object.category2}
                </section>
                {/* 홈페이지 소개 섹션 */}
                <section>
                    {children_object.introduce}
                </section>
                {/* 공간 유형 별 숙소 */}
                <section className="main-main-layout__section-space-category">
                    {children_object.space}
                </section>
                {/* 강조할 category 숙소 */}
                <section>
                    {children_object.category_highlight}
                </section>
                {/* 할인 숙소 */}
                <section>
                    {children_object.discount}
                </section>
                {/* 키워드 별 분류 */}
                <section>
                    {children_object.keyword}
                </section>
            </main>
            <footer className="main-main-layout__footer">
                <Footer></Footer>
            </footer>
        </div>
    )

}
export default MainMainLayout