import './detail_fix_menu.scss'
import useDetailFixMenuStyle from '../../hook_store/style_hooks/detail_fix_menu_style'
import star_icon from '@/assets/icon/star-icon.png'
import {pop_three_texts} from "@/util/function/util_function";
import '@/manage_scss_style/commonness/commonness.scss'

function DetailFixMenu({data, evaluations}){

    // =================================================
    // hooks
    // style
    const {
        scroll_to_photo,
        scroll_to_location,
        scroll_to_reply,
        scroll_to_summary,
        scroll_to_reservation
    } = useDetailFixMenuStyle()

    return(
        <div className="detail-fix-menu__container">
            <div className='detail-fix-menu__section1'>
                <button onClick={scroll_to_photo}>사진</button>
                <button onClick={scroll_to_location}>위치</button>
                <button onClick={scroll_to_reply}>후기</button>
                <button onClick={scroll_to_summary}>개요</button>
            </div>
            <div className='detail-fix-menu__section2'>
                <div className='detail-fix-menu__section2-contents'>
                    <p className='detail-fix-menu__section2-contents-part1'>
                        <span>{pop_three_texts(data.price)}</span>
                        <span> /박</span>
                    </p>
                    <div className='detail-fix-menu__section2-contents-part2'>
                        <span>
                            <img src={star_icon}/>
                            {`${evaluations.evaluations ? evaluations.evaluations.avgGrade.avg.toFixed(2) : '미평가'}`}
                        </span>
                        <span>{`${evaluations.evaluations ? `후기 ${evaluations.total_counts}개` : '후기 0개'}`}</span>
                    </div>
                </div>
                <button 
                    className='button-enable'
                    onClick={scroll_to_reservation}>
                        예약하기
                </button>
            </div>
        </div>
    )
    
}

export default DetailFixMenu