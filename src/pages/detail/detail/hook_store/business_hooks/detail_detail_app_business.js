import { useParams } from "react-router-dom";
import { useEffect } from "react";
import connect_data from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";
import { useGetUserTargetWishList } from "@/util/apis/user/user_information";

function useDetailDetailAppBusiness(cons, states, refs, props){
    // =================================================
    // parameter //
    const params = useParams()
    const house_param = params.house

    // =================================================
    // states //
    const {sellect_data,
           setSellect_data,
           sub_img,
           setSub_img,
           loading,
           setLoading} = states
    
    // =================================================
    // const //
    const {
        user_data,
        setUser_data
    } = cons

    // =================================================
    // react query //
    const {data, isLoading, isError} = useGetUserTargetWishList(user_data?._id, house_param, user_data)

    // =================================================
    // get data //
    useEffect(()=>{
        connect_data(`${default_data.d_base_url}/api/common/detail/${house_param}`, 'POST', {_id : house_param})
        .then((result)=>{
            setSellect_data(result)
            const copied_img = result.accomodation.sub_img
            const limit_copied_img = copied_img.slice(0,4)
            setSub_img(limit_copied_img)
        })
        .catch((e) => {
            console.log(e)
        })
        .finally(() => {
            setLoading(false)
        })
    },[])

    return {
        house_param,
        data, 
        isLoading, 
        isError
    }
}

export default useDetailDetailAppBusiness