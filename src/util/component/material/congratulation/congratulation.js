import './congratulation.scss'
import { useRef } from 'react'
import useMaterialCongratulationStyle from '../hook-store/style-hooks/material_congratulation_style'
import { reference_store } from "@/util/function/util_function";


function Congratulation(){
    
    // =================================================
    // ref //
    const confetti_ref = useRef(null)

    // =================================================
    // hooks //
    const {} = useMaterialCongratulationStyle(undefined,undefined,
        reference_store([
            {confetti_ref}
        ])
    )

    return (
        <div className='congratulation-app'>
            <canvas 
                ref={confetti_ref} 
                style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}/>
        </div>
    )
}

export default Congratulation