import ListLayout from "@/layout/list/list_layout/list_layout"
import ListContents from "../sections/list_contents/list_contents"
import ListSideBar from "../sections/list_side_bar/list_side_bar"
import Main_menu from "@/utilComponent/menu/main-menu/main-menu"

function List({login_user}){

    return (
        <ListLayout>
            <Main_menu
                role = {'main_menu'}
                login_user = {login_user}/>
            <ListContents
                role = {'main_content'}/>
            <ListSideBar
                role = {'side_bar'}/>
        </ListLayout>
    )
}

export default List