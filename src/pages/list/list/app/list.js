import ListLayout from "@/layout/list/list_layout/list_layout"
import ListContents from "../sections/list_contents/list_contents"
import ListSideBar from "../sections/list_side_bar/list_side_bar"
import Main_menu from "@/utilComponent/menu/main-menu/main-menu"
import useListBusiness from "../hook_store/business_hooks/list_business"
import Loading from '@/utilComponent/material/loading/loading'

function List({login_user}){

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
                    role = {'main_menu'}
                    login_user = {login_user}/>
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