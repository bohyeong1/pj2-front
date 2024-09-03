import './overay.scss'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import useModalOverayStyle from '../hook-store/style-hooks/modal-overay-style'
import { reference_store } from '../../../utilData/UtilFunction'
function Overay(){
    // redux state
    const overay_state = useSelector(state => state.overay.open_target_id)

    // refs
    const overay_container = useRef(null)

    ////////////////////////////////////
    ////////////// hooks ///////////////
    ////////////////////////////////////
    // style
    const {overlay_click} = useModalOverayStyle({
        'overay_state':overay_state
    },undefined,reference_store([
        {
            'overay_container':overay_container
        }
    ]))

    return(
        <div className={`overay ${overay_state ? 'overay-toggle':null}`} ref={overay_container}
        style={{zIndex : `${overay_state === 'search-toggle' ? 5 : 15}` }} onClick={overlay_click}>

        </div>
    )
}

export default Overay