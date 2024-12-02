import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom"
import { set_modaldata, delete_modaldata } from "@/redux/modules/modaldataSlice";

function useButtonCheckbtnBusiness(data,states,refs,props){

    // =================================================
    // querystring //
    const [SearchParams,setSearchParams] = useSearchParams()

    // =================================================
    // refs //
    const {check_btn_input} = refs

    // =================================================
    // props //
    const {value} = props

    // =================================================
    // dispatch //
    const dispatch = useDispatch()

    // =================================================
    // on input //
    function check_input_url(e){
        if(e.target.checked){
            SearchParams.set(value, e.target.value)
            setSearchParams(SearchParams)
        }else{
            SearchParams.delete(value)
            setSearchParams(SearchParams)
        }
    }

    return {
        check_input_url
    }
}

export default useButtonCheckbtnBusiness