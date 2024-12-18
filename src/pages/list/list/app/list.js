import ListLayout from "@/layout/list/list_layout/list_layout"
import ListContents from "../sections/list_contents/list_contents"
import ListSideBar from "../sections/list_side_bar/list_side_bar"
import ListSearchSection from "../sections/list_search_section/list_search_section"
import Main_menu from "@/util/component/menu/main-menu/main-menu"
import useListBusiness from "../hook_store/business_hooks/list_business"
import Loading from '@/util/component/material/loading/loading'
import { useRef } from "react"

function List({login_user}){

    // =================================================
    // refs //
    const search_menu = useRef(null)

    // =================================================
    // hooks //
    // business
    const {
        data, 
        isLoading, 
        isError, 
        refetch
    } = useListBusiness()

    if(isLoading){
        <Loading/>
    }

    if(isError){
        // redirect error page
    }

    if(data){
        return (
            <ListLayout>
                <Main_menu
                    search = {true} 
                    border = {false}
                    ref = {search_menu} 
                    scroll = {true} 
                    role = {'main_menu'}
                    login_user = {login_user}/>
                <ListSearchSection
                    role = {'search_menu'}/>
                <ListContents
                    data = {data}
                    role = {'main_content'}/>
                <ListSideBar
                    data = {data}
                    role = {'side_bar'}/>
            </ListLayout>
        )
    }

}

export default List