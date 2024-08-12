import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom"
import { set_modaldata, delete_modaldata } from "../../../../redux/modules/modaldataSlice";

function useButtonCheckbtnBusiness(data,states,refs,props){

    const [SearchParams,setSearchParams] = useSearchParams()

    // refs
    const {check_btn_input} = refs

    // props 
    const {modal, keyValue} = props

    // redux states
    const modal_data = useSelector(state => modal ? state.modaldata.modal_data : null)

    // dispatch
    const dispatch = useDispatch()

    ///////////////////////////////////////////////////////
    //////////////////modal false/////////////////////////
    /////////////////////////////////////////////////////
    // on인풋
    function check_input(e){
        if(e.target.checked){
            SearchParams.set(keyValue, e.target.value)
            setSearchParams(SearchParams)
        }else{
            SearchParams.delete(keyValue)
            setSearchParams(SearchParams)
        }
    }

    // 인풋 클릭
    function check_click(e){
        check_btn_input.current.forEach((ele)=>{
            if(ele !== e.target){
                ele.checked = false
            }
        })
    }

    ///////////////////////////////////////////////////////
    //////////////////////modal true//////////////////////
    /////////////////////////////////////////////////////
    // on인풋
    function check_input_modal(e){

        if(e.target.checked){
            dispatch(set_modaldata({key:'category', value:e.target.value}))
        }else{
            dispatch(delete_modaldata({key:'category'}))
        }
    } 

    // 인풋 클릭
    function check_click_modal(e){
        check_btn_input.current.forEach((ele)=>{
            if(ele !== e.target){
                ele.checked = false
            }
        })
    }


    return {check_input, check_click, check_click_modal, check_input_modal}
}

export default useButtonCheckbtnBusiness