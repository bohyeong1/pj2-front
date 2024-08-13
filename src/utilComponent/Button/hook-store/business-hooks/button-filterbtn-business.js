import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { delete_modaldata, add_modaldata } from "../../../../redux/modules/modaldataSlice";

function useButtonFilterbtnBusiness(data, states, refs, props){
    // querystring
    const [SearchParams,setSearchParams] = useSearchParams()

    // states
    const {toggle, setToggle} = states

    // props
    const {keyValue, text} = props

    // redux
    const dispatch = useDispatch()

    //////////////////////////////////////////
    //////////////// url 방식 ////////////////
    /////////////////////////////////////////
    function filter_data_url(){
        setToggle(!toggle)
        if(!toggle){
            SearchParams.append(keyValue, text)
            setSearchParams(SearchParams)
        }else{
            const copiedParams = SearchParams.getAll(keyValue)
            const filterParams = copiedParams.filter((ele)=>{
                return ele !== text})
            SearchParams.delete(keyValue)
            filterParams.forEach((ele)=>{SearchParams.append(keyValue,ele)})
            setSearchParams(SearchParams)
        }
    }


    //////////////////////////////////////////
    ////////////////state 방식////////////////
    /////////////////////////////////////////
    function filter_data_state(){
        setToggle(!toggle)
        if(!toggle){
            dispatch(add_modaldata({key:keyValue, value:text}))
        }else{
            dispatch(delete_modaldata({key:keyValue, value:text}))
        }
    }


    return {filter_data_url,filter_data_state}
}

export default useButtonFilterbtnBusiness