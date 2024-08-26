import './congratulation.scss'
import { useRef } from 'react'
import useMaterialCongratulationStyle from '../hook-store/style-hooks/material_congratulation_style'
import { reference_store } from '../../../utilData/UtilFunction'

function Congratulation(){

    // =================================================
    // piece //
    const ddong_ga_ru = Array.from({length : 80})   
    
    // =================================================
    // ref //
    const items = useRef([])

    // =================================================
    // hooks //
    const {} = useMaterialCongratulationStyle(undefined,undefined,
        reference_store([
            {
                'items' : items
            }
        ])
    )

    return (
        <div className='congratulation-app'>
            {ddong_ga_ru.map((el, id)=>{
                return(
                    <div key={id} className='congratulation-app__item' ref={(el)=>{items.current[id] = el}}></div>
                )
            })}
        </div>
    )
}

export default Congratulation