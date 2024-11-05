import './detail_section1.scss';
import default_data from "@/util/default_data/default_data";
import { get_date_difference } from "@/util/function/util_function";
import AlertModal from "@/utilComponent/modal/alert_modal/alert_modal";
import useDetailSection1Style from '../../hook_store/style_hooks/detail_section1_style';
import checkin_icon from '@/assets/icon/checkin-icon.png'
import checkout_icon from '@/assets/icon/checkout-icon.png'
import human_icon from '@/assets/icon/human-icon.png'

function DetailSection1({data, user, evaluations}){

    // =================================================
    // hooks //
    // style  
    const {
        modal_toggle
    } = useDetailSection1Style()

    if(data){
        return(
            <div className="detail-section1__container">
                {/* 섹션 1 */}
                <div className="detail-section1__section1">
                    <div className="detail-section1__section1-part1">
                        {/* 호스트 */}
                        <div className="detail-section1__section1-part1-host">
                            {/* 호스트 이미지 */}
                            <div>
                                <img src={data.seller.profileImg ? data.seller.profileImg : ''}
                                     style={{backgroundColor : data.seller.profileImg ? '' : data.seller.defaultProfile}}/>
                            </div>
                            {/* 호스트 소개 */}
                            <div>
                                <span>호스트 · {data.seller.nickname ? data.seller.nickname : data.seller.name}님</span>
                                <span>호스팅 경력 · {get_date_difference(user.host_text.createAt)}</span>
                                {/* 숙소 평점 */}
                                <div className="detail-section1__section1-part1-evaluation">
                                    <div className="detail-section1__star-box">
                                        <img src={default_data.d_imgs.star}/>
                                        <span>{`${evaluations.evaluations ? evaluations.evaluations.avgGrade.avg.toFixed(2) : '미평가'}`}</span>
                                    </div>
                                    <span>{`${evaluations.evaluations ? `후기 ${evaluations.total_counts}개` : '후기 0개'}`}</span>
                                </div>                            
                            </div>
                        </div>
                    </div>            
                </div>
                {/* 섹션 2 */}
                <div className="detail-section1__section2">
                    <span>숙소 메뉴얼</span>
                    <div>
                        <button>자세히 보기</button>
                        <pre>
                            {data.manual}
                        </pre>
                    </div>
                </div>

                {/* 섹션 3 */}
                <div className="detail-section1__section3">
                    <div className="detail-section1__section3-title">
                        <img src={'/imgs/logo.png'}/>
                        <span>{data.title}</span>
                    </div>
                    <div className="detail-section1__section3-part1">
                        <span>키워드#</span>
                        <div>
                            {data.keywords.slice(0,6).map((el, id)=>{
                                return (
                                    <div key={id}>
                                        <img src={el.url}/>
                                        <span>{el.name}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div> 
                    <div className="detail-section1__section3-part2">
                        <span>기본 시설</span>
                        <div>
                            숙소 인원, 공간 카테고리, 베이스 퍼실리티 넣을 것.
                        </div>
                    </div>
                    <div className="detail-section1__section3-part3">
                        <span>서비스 시설</span>
                        <div>
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

                    {/* 섹션 4 */}
                    <div className="detail-section1__section4">
                        <span>교통 수단</span>
                        {data.navigation_data.navigation_data.length ? 
                        <div className="detail-section1__section4-wrapper">
                            {data.navigation_data.navigation_data.map((el, id)=>{
                                return (
                                    <div className="detail-section1__section4-item"
                                         key={id}>
                                        <div>
                                            <img src={el.name.includes('터미널') ? default_data.d_imgs.bus : default_data.d_imgs.subway}/>
                                            <span>{el.name}</span>
                                        </div>
                                        <div>
                                            <span>이동 거리 · 약 {Math.round((el.distance / 1000) * 10) / 10} Km</span>
                                            <span>이동 시간 · 약 {Math.round(el.duration / 60)}분</span>
                                            <span>택시 이용 시 요금 · {el.fare.taxi}원 소요</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div> : 
                        <span className="detail-section1__section4-default">주변에 이용 가능한 대중교통이 없습니다. 택시나, 도보를 이용해 주세요!</span>}
                    </div>   

                    {/* 섹션 5 */}
                    <div className="detail-section1__section3-part5">
                        <span>체크인 · 아웃</span>
                        <div>
                            <div 
                                className="detail-section1__section3-part5-checkin-box"
                                onClick={()=>{modal_toggle('detail-section1-checkin')}}>
                                <div className="detail-section1__section3-part5-checkin-title">
                                    <img src={checkin_icon}/>
                                    <div>
                                        <span>체크인</span>
                                        <span>·</span>
                                        <span>{data.check_time.check_in.name}</span>
                                    </div>
                                </div>
                                <div className="detail-section1__section3-part5-checkin-content">
                                    <div>
                                        <img src={human_icon}/>
                                        <div>
                                            <span>체크인 방법</span>
                                            <span>{data.check_method.check_in ? '·' + data.check_method.check_in.name : ''}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="detail-section1__section3-part5-checkin-content-summary">
                                            <img src={default_data.d_imgs.quotes_left}
                                                 className="detail-section1__section3-part5-left-img"/>
                                            <pre>
                                                {data.check_method.check_in ? data.check_method.check_in.text : '추후 메세지를 통해 전달'}
                                            </pre>
                                            <img  src={default_data.d_imgs.quotes_right}
                                                  className="detail-section1__section3-part5-right-img"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div 
                                className="detail-section1__section3-part5-checkout-box"
                                onClick={()=>{modal_toggle('detail-section1-checkout')}}>
                                <div className="detail-section1__section3-part5-checkout-title">
                                    <img src={checkout_icon}/>
                                    <div>
                                        <span>체크아웃</span>
                                        <span>·</span>
                                        <span>{data.check_time.check_out.name}</span>
                                    </div>
                                </div>
                                <div className="detail-section1__section3-part5-checkout-content">
                                    <div>
                                        <img src={human_icon}/>
                                        <div>
                                            <span>체크아웃 방법</span>
                                        </div>
                                    </div>
                                    <div>
                                        {data.check_method.check_out.length ? data.check_method.check_out.slice(0,4).map((el,id)=>{
                                            return (
                                                <span className="detail-section1__section3-part5-checkout-content-item"
                                                      key={id}>
                                                    {el.name}
                                                </span>
                                            )
                                        }) : 
                                        <span className="detail-section1__section3-part5-checkout-content-item">추후 메세지를 통해 전달</span>}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                    {/* 섹션 6 */}
                    <div className="detail-section1__section3-part6">
                        <span>숙소 설명</span>
                        <pre>
                            {data.summary}
                        </pre>
                    </div>
                </div>

                {/* modal */}
                {/* checkin modal */}
                <AlertModal
                    key_name = {'detail-section1-checkin'}
                    title = {'체크인'}
                    modal_toggle = {modal_toggle}>
                    <div className='detail-section1__checkin-modal-container'>
                        <div className='detail-section1__checkin-modal-part1 detail-section1__modal-border'>
                            <p>
                                <img src={checkin_icon}/>
                                <span>체크인</span>
                            </p>
                            <span>{data.check_time.check_in.name}</span>
                        </div>
                        <div className='detail-section1__checkin-modal-part2'>
                            <p>
                                <img src={human_icon}/>
                                <span>체크인 방법</span>
                            </p>
                            {data.check_method.check_in && 
                            <span className='detail-section1__checkin-modal-part2-title'>{data.check_method.check_in.name}</span>}
                            <span>{data.check_method.check_in ? data.check_method.check_in.text : '호스트가 체크인 방법을 설정하지 않았습니다. 추후 메세지를 통해 정보를 요청하세요.'}</span>
                        </div>
                    </div>
                </AlertModal>
                {/* checkout modal */}
                <AlertModal
                    key_name = {'detail-section1-checkout'}
                    title = {'체크아웃'}
                    modal_toggle = {modal_toggle}>
                    <div className='detail-section1__checkout-modal-container'>
                        <div className='detail-section1__checkout-modal-part1 detail-section1__modal-border'>
                            <p>
                                <img src={checkout_icon}/>
                                <span>체크아웃</span>
                            </p>
                            <span>{data.check_time.check_out.name}</span>
                        </div>
                        <div className='detail-section1__checkout-modal-part2'>
                            <p>
                                <img src={human_icon}/>
                                <span>체크아웃 방법</span>
                            </p>
                            <div className='detail-section1__checkout-modal-part2-item-wrapper'>
                                {data.check_method.check_out.length ? data.check_method.check_out.map((el,id)=>{
                                    return (
                                        <div key={id}>
                                            <div className='detail-section1__checkout-modal-box-wrapper'>
                                                <img src={el.url}/>
                                                <span>{el.name}</span>
                                            </div>
                                            <span>{el.text}</span>
                                        </div>
                                    )
                                }) : 
                                <span>호스트가 체크아웃 방법을 설정하지 않았습니다. 추후 메세지를 통해 정보를 요청하세요.</span>}
                            </div>
                        </div>
                    </div>
                </AlertModal>
            </div>
        )
    }

}

export default DetailSection1