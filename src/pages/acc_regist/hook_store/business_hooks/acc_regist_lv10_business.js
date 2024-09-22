import { useForm } from "react-hook-form";
function useAccRegistLv10Business(){

    // =================================================
    // state form //
    const { register, setValue, watch } = useForm({
        defaultValues: {
            count: 0,
        }
    })

    // =================================================
    // data fetch //
    async function fetch_acc(data, index){
        // const homeData = await connectData(`${default_data.d_base_url}/api/accomodation/register/update`, 'PUT', 
        // {seller : userData._id,
        // _id : registData._id,
        // rules : data
        // }, localStorage.getItem('log'))        
    } 

    // 추가규칙 
    function changeAddRule(){      
    }

    return {register, setValue, watch, fetch_acc}
}

export default useAccRegistLv10Business