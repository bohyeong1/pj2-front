import { useForm } from "react-hook-form";
import * as Yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";

function useAccRegistLv8Business(data, states, refs, props){
    // =================================================
    // states //

    // =================================================
    // validation schema //
    const validation_schema = Yup.object().shape({
        // text
        text:Yup.string()
        .required('숙소의 이름을 작성해 주세요!')
    })

    // =================================================
    // state form //
    const {register, formState:{errors, isValid}, watch} = useForm({
        resolver:yupResolver(validation_schema),
        mode:'onSubmit'
    })
    
    // =================================================
    // data fetch  //
    async function fetch_acc(data, index){
        // const homeData = await connectData(`${default_data.d_base_url}/api/accomodation/register/update`, 'PUT', 
        // {seller : userData._id,
        // _id : registData._id,
        // title : data.title,
        // capacity : data.capacity
        // }, localStorage.getItem('log'))
    }
    return {fetch_acc, register, errors, isValid, watch}
}

export default useAccRegistLv8Business