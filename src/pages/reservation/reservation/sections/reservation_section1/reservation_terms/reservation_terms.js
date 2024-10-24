import './reservation_terms.scss'
import { useRef, useState } from 'react'
import arrow_icon from '@/assets/icon/arrow-icon.png'
import useReservationTermsStyle from '../../../hook_store/style_hooks/reservation_terms_style'
import { state_store, reference_store } from '@/util/function/util_function'
import default_data from '@/util/default_data/default_data'

function ReservationTerms({setIs_button}){

    // =================================================
    // state //
    const [is_open, setIs_open] = useState(false)
    const [all_checked, setAll_checked] = useState(false)
    const [checkbox_state, setCheckbox_state]=useState(() => {
        const obj = {}
        default_data.reservation_terms.forEach((_, index) => {
            obj[`terms${index + 1}`] = false
        })
        return obj
    })

    // =================================================
    // refs //
    const toggle_button = useRef(null)

    // =================================================
    // hooks //
    // style
    const {
        sellect_check_box, 
        open_terms,
        all_check_box
    } = useReservationTermsStyle(
            undefined,
            state_store([
                {all_checked, setAll_checked},
                {checkbox_state, setCheckbox_state},
                {is_open, setIs_open}
            ]),
            reference_store([
                {toggle_button}
            ]),
            {setIs_button}
        )

    return (
        <div className='reservation-terms__container'>
            <div className='reservation-terms__select-title'>
                <div className="reservation-terms__select-box-container">
                    <input 
                        type="checkbox" 
                        className="reservation-terms__checkbox-daepyo" 
                        checked={all_checked} 
                        onChange={all_check_box}
                        />
                    <label className='reservation-terms__text'>약관 전체동의</label>
                </div>                     
                <img 
                    className="reservation-terms__select-img"
                    onClick={open_terms}
                    src={arrow_icon}
                    ref={toggle_button}/>
            </div>
            {is_open && 
            <div className='reservation-terms__select-content'>
                {default_data.reservation_terms.map((el, id)=>{
                    return (
                        <div 
                            key={id}
                            className='reservation-terms__select-content-wrapper'>
                            <div className="reservation-terms__select-box-container">
                                <input 
                                    type="checkbox" 
                                    className="reservation-terms__checkbox-sub" 
                                    name={`terms${id + 1}`}
                                    checked={checkbox_state[`terms${id + 1}`]} 
                                    onChange={sellect_check_box}
                                    />
                                <label className='reservation-terms__sub-text'>{el.title}</label>
                            </div>                     
                            <img 
                                className="reservation-terms__select-sub-img"
                                // onClick={open_terms}
                                src={arrow_icon}/>
                        </div>
                    )
                })

                }
            </div>}
        </div>
    )
}

export default ReservationTerms