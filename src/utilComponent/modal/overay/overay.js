import './overay.css'
import { useSelector } from 'react-redux'

function Overay(){

    const overay_state = useSelector(state => state.overay.open_target_id)

    return(
        <div className={`overay ${overay_state ? 'overay-toggle':null}`}>

        </div>
    )
}

export default Overay