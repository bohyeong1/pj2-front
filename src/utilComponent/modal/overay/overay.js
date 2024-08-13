import './overay.css'
import { useSelector } from 'react-redux'
import useModalOverayStyle from '../hook-store/style-hooks/modal-overay-style'

function Overay(){
    // redux state
    const overay_state = useSelector(state => state.overay.open_target_id)

    ////////////////////////////////////
    ////////////// hooks ///////////////
    ////////////////////////////////////
    // style
    const {} = useModalOverayStyle({
        'overay_state':overay_state
    })

    return(
        <div className={`overay ${overay_state ? 'overay-toggle':null}`} style={{zIndex : `${overay_state === 'search-toggle' ? 5 : 15}` }}>

        </div>
    )
}

export default Overay