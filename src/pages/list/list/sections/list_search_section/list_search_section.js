import SearchMenu from "@/utilComponent/menu/search-menu/search_menu"
import './list_search_section.scss'
import useListSearchSection from "../../hook_store/style_hooks/list_search_section_style"
import { useSelector } from "react-redux"

function ListSearchSection({data}){

    // =================================================
    // redux state //
    const search_modal_state = useSelector(state => 
        state.search_modal.search_modal_state, 
        (prev, next) => prev === next
    )

    const {control_modal} = useListSearchSection(
        {search_modal_state}
    )

    return (
        <>
            <div className="list-search-section__container">
                <div className="list-search-section__wrapper">
                    <SearchMenu
                        data = {data}
                        related_preview = {true}/>
                </div>
            </div>
            {search_modal_state &&
            <div 
                className="list-search-section__overlay"
                onClick={control_modal}>

            </div>}
        </>
    )
}

export default ListSearchSection