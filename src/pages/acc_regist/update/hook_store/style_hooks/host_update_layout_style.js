import { useNavigate, useParams } from "react-router-dom"

function useHostUpdateLayoutStyle(data, states, refs, props){

    // =================================================
    // navigate //
    const navigate = useNavigate()

    // =================================================
    // parameter //
    const param = useParams()

    // =================================================
    // props //
    const {acc_data} = props

    // =================================================
    // side menu optional render //
    function optional_side_menu_render(option, {render1 : Render1, render2 : Render2}){
        if(option === 'accomodation'){
            return (
                <Render1 acc_data = {acc_data}></Render1>
            )
        }
        else if(option === 'check'){
            return (
                <Render2 acc_data = {acc_data}></Render2>
            )
        }
        else{
            return null
        }
    }

    return {optional_side_menu_render}
}

export default useHostUpdateLayoutStyle