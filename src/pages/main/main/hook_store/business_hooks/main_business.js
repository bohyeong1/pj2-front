import { useDispatch } from "react-redux";
import { useGetCommonMainData } from "@/util/apis/common/common_main";

function useMainBusiness(data, states, refs, props){

    // =================================================
    // redux state //
    const dispatch = useDispatch()

    // =================================================
    // states //  
    const {
        main_data,
        setMain_data
    } = states

    // =================================================
    // react query //
    const section1_query = useGetCommonMainData('city', 12)
    const section2_query = useGetCommonMainData('keywords', 20, '친환경')
    const section3_query = useGetCommonMainData('keywords', 20, '연인추천')
    const section4_query = useGetCommonMainData('keywords', 20, '색다른 공간')
    const section5_query = useGetCommonMainData('discount', 8)

    return {
        section1_query,
        section2_query,
        section3_query,
        section4_query,
        section5_query
    }
}

export default useMainBusiness