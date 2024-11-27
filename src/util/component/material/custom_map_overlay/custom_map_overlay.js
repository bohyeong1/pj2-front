import './custom_map_overlay.scss'
import { useSelector } from 'react-redux'
import useMaterialCustomMapOverlayStyle from '../hook-store/style-hooks/material_custom_map_overlay_style'

function CustomMapOverlay({text, initial, background_color, class_name}){

    // =================================================
    // redux state //
    const target_state = useSelector(state => state.target_class.target_class)

    // =================================================
    // hooks //
    // business
    const {mouse_enter_overlay} = useMaterialCustomMapOverlayStyle()

    return (
        <div 
            className={`custom-map-overlay__container ${target_state && class_name !== target_state ? 'custom-map-overlay__unactive' : ''}`}
            onMouseEnter={() =>{mouse_enter_overlay(class_name)}}
            onMouseLeave={() =>{mouse_enter_overlay(null)}}
            style={{backgroundColor : background_color}}>
            <span>{text === '출발지' ? initial : text}</span>
        </div>
    )
}

export default CustomMapOverlay