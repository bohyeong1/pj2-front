import './detail_header.scss';

function DetailHeader({data, role}){

    if(data){
        return(
            <div className="detail-header__container">
                <div className="detail-header__section1">
                    <div className="detail-header__section1-part1">
                        {/* 숙소 제목 */}
                        <div className="detail-header__section1-part1-title">
                            <span>{`${data.category.name}`} · {`${data.space_category.name}`}</span>
                            <span>{`${data.title}`}</span>
                        </div>
                        <div className="detail-header__section1-part1-category">
                            <div className="detail-header__section1-part1-category-item">
                                <span className='detail-header__item-title'>기본 시설 &gt;</span>
                                <div className='detail-header__item-content-box1'></div>
                            </div>
                            <div className="detail-header__section1-part1-category-item">
                                <span className='detail-header__item-title'>서비스 시설 &gt;</span>
                                <div className='detail-header__item-content-box2'>
                                    {data.service_facility.slice(0,6).map((el, id)=>{
                                        return (
                                            <div key={id}>
                                                <img src={el.url}/>
                                                <span>{el.name}</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="detail-header__section1-part1-category-item">
                                <span className='detail-header__item-title'>위치 정보 &gt;</span>
                                <div className='detail-header__item-content-box3'>
                                    <span>숙소 구매 후 완전한 주소를 제공합니다.</span>
                                    <span>위치 · 대전</span>
                                </div>
                            </div>
                        </div>
                    </div>       
                </div>
            </div>
        )
    }

}

export default DetailHeader