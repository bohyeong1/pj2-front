import './detail_header.scss';
import AlertModal from "@/utilComponent/modal/alert_modal/alert_modal";
import useDetailHeaderStyle from '../../hook_store/style_hooks/detail_header_style';

function DetailHeader({data}){

    // =================================================
    // hooks
    // style
    const {
        modal_toggle,
        click_map_target
    } = useDetailHeaderStyle()

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
                            <div 
                                className="detail-header__section1-part1-category-item"
                                onClick={()=>{modal_toggle('base-facility-alert')}}>
                                <span className='detail-header__item-title'>기본 시설 &gt;</span>
                                <div className='detail-header__item-content-box1'>
                                    {data.base_facility.slice(0,6).map((el, id)=>{
                                        return (
                                            <div key={id}>
                                                <img src={el.url}/>
                                                <span>{el.name} · {el.counts}개</span>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div 
                                className="detail-header__section1-part1-category-item"
                                onClick={()=>{modal_toggle('service-facility-alert')}}>
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
                            <div 
                                className="detail-header__section1-part1-category-item"
                                onClick={click_map_target}>
                                <span className='detail-header__item-title'>위치 정보 &gt;</span>
                                <div className='detail-header__item-content-box3'>
                                    <span>숙소 구매 후 완전한 주소를 제공합니다.</span>
                                    <span>위치 · 대전</span>
                                </div>
                            </div>
                        </div>
                    </div>       
                </div>

                {/* service facility modal */}
                <AlertModal
                    key_name = {'service-facility-alert'}
                    title = {'서비스 시설'}
                    modal_toggle = {modal_toggle}>
                    <div className='detail-header__alert-container'>
                        <span className='detail-header__alert-title'>숙소에서 제공되는 서비스 시설입니다.</span>
                        <div className='detail-header__alert-item-wrapper'>
                            {data.service_facility.map((el, id)=>{
                                return (
                                    <div 
                                        className='detail-header__item'
                                        key={id}>
                                        <img src={el.url}/>
                                        <span>{el.name}</span>
                                    </div>
                                )
                            })}
                        </div>
                        
                    </div>
                </AlertModal>
                {/* base facility modal */}
                <AlertModal
                    key_name = {'base-facility-alert'}
                    title = {'기본 시설'}
                    modal_toggle = {modal_toggle}>
                    <div className='detail-header__alert-container'>
                        <span className='detail-header__alert-title'>숙소에서 제공되는 기본 시설입니다.</span>
                        <div className='detail-header__alert-item-wrapper'>
                            {data.base_facility.map((el, id)=>{
                                return (
                                    <div 
                                        className='detail-header__item'
                                        key={id}>
                                        <img src={el.url}/>
                                        <span>{el.name} · {el.counts}개</span>
                                    </div>
                                )
                            })}
                        </div>
                        
                    </div>
                </AlertModal>
            </div>
        )
    }

}

export default DetailHeader