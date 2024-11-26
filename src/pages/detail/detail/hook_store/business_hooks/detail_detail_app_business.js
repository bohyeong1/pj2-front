import { useParams } from "react-router-dom";
import { useEffect } from "react";
import connect_data from "@/util/function/util_function";
import default_data from "@/util/default_data/default_data";
import { useGetUserTargetWishList } from "@/util/apis/user/user_information";
import { useGetCommonDetailAccomodation } from "@/util/apis/common/common_detail";

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
    const common_detail_query = useGetCommonDetailAccomodation(house_param)

    // =================================================
    // get data //
    useEffect(()=>{
        if(common_detail_query.data){
            setSellect_data(common_detail_query.data)
            const copied_img = common_detail_query.data.accomodation.sub_img
            const limit_copied_img = copied_img.slice(0,4)
            setSub_img(limit_copied_img)
        }
    },[common_detail_query.data])

    return {
        house_param,
        data, 
        isLoading, 
        isError,
        common_detail_query
    }
}

export default useDetailDetailAppBusiness