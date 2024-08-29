import default_data from "../../../../utilData/defaultData"
import { connect_data_width_cookies } from "../../../../utilData/UtilFunction"
import { useEffect } from "react"

function useAccRegistLv1Business(data, states, refs, props){

    // =================================================
    // states //
    const {current_data, setCurrent_data, prev_data, setPrev_data} = states

    // =================================================
    // refs //
    const {categories} = refs

    // =================================================
    // props //
    const {login_user} = props

    // =================================================
    // data //
    const {accomodation, field_name} = data

    // =================================================
    // fatch function //
    async function fetch_acc(data){
        // const homeData = await connectData(`${default_data.d_base_url}/api/accomodation/register/update`, 'PUT', 
        // {seller : login_user._id,
        // _id : accomodation._id,
        // category : data
        // }, localStorage.getItem('log'))
    } 

    // =================================================
    // category 선택 //
    function click_box(id){
        for(let i=0; i<default_data.d_category_icon.length; i++){
            if(i == id){
                categories.current[id].classList.toggle('Acc-regist-lv1__active')
            }
            else{
                categories.current[i].classList.remove('Acc-regist-lv1__active')
            }
        }
        setCurrent_data(current_data ? null : default_data.d_category_icon[id])
    }

    // =================================================
    // param //   
    useEffect(()=>{

    },[])

    return {fetch_acc, click_box}
}

export default useAccRegistLv1Business