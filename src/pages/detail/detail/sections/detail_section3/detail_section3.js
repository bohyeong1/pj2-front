import './detail_section3.scss'
import default_data from "@/util/default_data/default_data";
import useDetailSection3Style from '../../hook_store/style_hooks/detail_section3_style';

function DetailSection3({evaluations, role}){

    // =================================================
    // hooks //
    // style
    const {get_collect_value} = useDetailSection3Style()
    
    return(
        <div className="detail-section3__container">
            {/* title */}
            <div className="detail-section3__title">
                <span>숙소 평가</span>
                <div className="detail-section3__board">
                    <div>
                        <img src={default_data.d_imgs.star}/>
                        <span>평점 {`${evaluations?.evaluations ? evaluations.evaluations.avgGrade.avg.toFixed(2) + '점' : '미평가'}`}</span>
                    </div>
                    <span>후기 {`${evaluations?.total_counts ? evaluations.total_counts : 0}명`}</span>
                </div>
            </div>
            {/* contents */}
            <div className='detail-section3__contents'>
                <div className='detail-section3__contents-part1 detail-section3-item'>
                    <div className='detail-section3__contents-part1-title'>
                        <span>전체 평점</span>
                    </div>
                    <div className='detail-section3__total-average-box'>
                        <div className='detail-section3__total-average-item'>
                            <span>5</span>
                            <div className='detail-section3__total-average-bar-container'>
                                <div className='detail-section3__total-average-bar'
                                     style={{width : evaluations?.evaluations ? 
                                             `${get_collect_value(evaluations.score_groups, 5) / evaluations.total_score_count * 100}%` : '0%'}}>
                                </div>
                            </div>
                        </div>
                        <div className='detail-section3__total-average-item'>
                            <span>4</span>
                            <div className='detail-section3__total-average-bar-container'>
                                <div className='detail-section3__total-average-bar'
                                     style={{width : evaluations?.evaluations ? 
                                             `${get_collect_value(evaluations.score_groups, 4) / evaluations.total_score_count * 100}%` : '0%'}}></div>
                            </div>
                        </div>
                        <div className='detail-section3__total-average-item'>
                            <span>3</span>
                            <div className='detail-section3__total-average-bar-container'>
                                <div className='detail-section3__total-average-bar'
                                     style={{width : evaluations?.evaluations ? 
                                             `${get_collect_value(evaluations.score_groups, 3) / evaluations.total_score_count * 100}%` : '0%'}}></div>
                            </div>
                        </div>
                        <div className='detail-section3__total-average-item'>
                            <span>2</span>
                            <div className='detail-section3__total-average-bar-container'>
                                <div className='detail-section3__total-average-bar'
                                     style={{width : evaluations?.evaluations ? 
                                             `${get_collect_value(evaluations.score_groups, 2) / evaluations.total_score_count * 100}%` : '0%'}}></div>
                            </div>
                        </div>
                        <div className='detail-section3__total-average-item'>
                            <span>1</span>
                            <div className='detail-section3__total-average-bar-container'>
                                <div className='detail-section3__total-average-bar'
                                     style={{width : evaluations?.evaluations ? 
                                             `${get_collect_value(evaluations.score_groups, 1) / evaluations.total_score_count * 100}%` : '0%'}}></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='detail-section3__contents-part1 detail-section3-item'>
                    <div>
                        <span>체크인</span>
                    </div>
                    <div className ='detail-section3-content-box'>
                        <span className= {`detail-section3-content-box ${evaluations.evaluations ? 'detail-section3-content-box-active' : ''}`}>
                            {evaluations.evaluations ? evaluations.evaluations.checkin.avg.toFixed(1) : '미평가'}
                        </span>
                        <img src={default_data.d_evaluation[1].url}/>
                    </div>
                </div>

                <div className='detail-section3__contents-part1 detail-section3-item'>
                    <div>
                        <span>청결도</span>
                    </div>
                    <div className = {`detail-section3-content-box ${evaluations.evaluations ? 'detail-section3-content-box-active' : ''}`}>
                        <span className= {`detail-section3-content-box ${evaluations.evaluations ? 'detail-section3-content-box-active' : ''}`}>
                            {evaluations.evaluations ? evaluations.evaluations.cleanliness.avg.toFixed(1) : '미평가'}
                        </span>
                        <img src={default_data.d_evaluation[0].url}/>
                    </div>
                </div>

                <div className='detail-section3__contents-part1 detail-section3-item'>
                    <div>
                        <span>의사소통</span>
                    </div>
                    <div className='detail-section3-content-box'>
                        <span className= {`detail-section3-content-box ${evaluations.evaluations ? 'detail-section3-content-box-active' : ''}`}>
                            {evaluations.evaluations ? evaluations.evaluations.communication.avg.toFixed(1) : '미평가'}
                        </span>
                        <img src={default_data.d_evaluation[2].url}/>
                    </div>
                </div>

                <div className='detail-section3__contents-part1 detail-section3-item'>
                    <div>
                        <span>위치</span>
                    </div>
                    <div className='detail-section3-content-box'>
                        <span className= {`detail-section3-content-box ${evaluations.evaluations ? 'detail-section3-content-box-active' : ''}`}>
                            {evaluations.evaluations ? evaluations.evaluations.locaiton.avg.toFixed(1) : '미평가'}
                        </span>
                        <img src={default_data.d_evaluation[3].url}/>
                    </div>
                </div>

                <div className='detail-section3__contents-part1 detail-section3-item'>
                    <div>
                        <span>만족도</span>
                    </div>
                    <div className='detail-section3-content-box'>
                        <span className= {`detail-section3-content-box ${evaluations.evaluations ? 'detail-section3-content-box-active' : ''}`}>
                            {evaluations.evaluations ? evaluations.evaluations.satisfaction.avg.toFixed(1) : '미평가'}
                        </span>
                        <img src={default_data.d_evaluation[4].url}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailSection3