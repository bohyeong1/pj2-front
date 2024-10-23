import SearchMenu from "@/utilComponent/menu/search-menu/search_menu"
import './main_search_modal_section.scss'
import useMainSearchModalSectionStyle from "../../hook_store/style_hooks/main_search_modal_section_style"
import { useSelector } from "react-redux"

function MainSearchModalSection({data}){

    // =================================================
    // redux state //
    const search_modal_state = useSelector(state => 
        state.search_modal.search_modal_state, 
        (prev, next) => prev === next
    )

    const {control_modal} = useMainSearchModalSectionStyle(
        {search_modal_state}
    )

    return (
        <>
            <div className="main-search-modal-section__container">
                <div className="main-search-modal-section__wrapper">
                    <SearchMenu
                        data = {data}
                        related_preview = {true}/>
                </div>
            </div>
            {search_modal_state &&
            <div 
                className="main-search-modal-section__overlay"
                onClick={control_modal}>

            </div>}
        </>
    )
}

export default MainSearchModalSection