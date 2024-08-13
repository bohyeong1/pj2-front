import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom"
import { set_modaldata, delete_modaldata } from "../../../../redux/modules/modaldataSlice";

function useButtonCheckbtnBusiness(data,states,refs,props){

    const [SearchParams,setSearchParams] = useSearchParams()

    // refs
    const {check_btn_input} = refs

    // props 
    const {modal, keyValue} = props



    // dispatch
    const dispatch = useDispatch()

    //////////////////////////////////////////
    //////////////// url 방식 ////////////////
    /////////////////////////////////////////
    // on인풋
    function check_input_url(e){
        if(e.target.checked){
            SearchParams.set(keyValue, e.target.value)
            setSearchParams(SearchParams)
        }else{
            SearchParams.delete(keyValue)
            setSearchParams(SearchParams)
        }
    }

    // 인풋 클릭
    function check_click_url(e){
        check_btn_input.current.forEach((ele)=>{
            if(ele !== e.target){
                ele.checked = false
            }
        })
    }



    //////////////////////////////////////////
    ////////////////state 방식////////////////
    /////////////////////////////////////////
    // on인풋
    function check_input_state(e){

        if(e.target.checked){
            dispatch(set_modaldata({key:'category', value:e.target.value}))
        }else{
            dispatch(delete_modaldata({key:'category'}))
        }
    } 

    // 인풋 클릭
    function check_click_state(e){
        check_btn_input.current.forEach((ele)=>{
            if(ele !== e.target){
                ele.checked = false
            }
        })
    }


    return {check_input_url, check_click_url, check_click_state, check_input_state}
}

export default useButtonCheckbtnBusiness