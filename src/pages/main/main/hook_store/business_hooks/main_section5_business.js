import { useUpdateCommonCategoryData } from '@/util/apis/common/common_main';
import { useGetCommonMainData } from "@/util/apis/common/common_main";

function useMainSection5Business(data, states, refs, props){

    // =================================================
    // states //
    const {toggle,
           setToggle,
           data_store,
           setData_store} = states

    // =================================================
    // data //       
    const {toggle_btn} = data

    // =================================================
    // react query //   
    const main_category_query = useGetCommonMainData('all', 12)

    // =================================================
    // mutation //   
    const category_mutation = useUpdateCommonCategoryData()

    // =================================================
    // 분류 버튼 클릭 //
    function main_click(e){
        const key_value = e.target.dataset.value
        setToggle({key : key_value})
        category_mutation.mutate(
            {
                filter : key_value === 'default' ? 'all' : 'category',
                keyword : key_value === 'default' ? null : key_value
            }
        )
        toggle_btn()
    }

    return {
        main_click,
        main_category_query,
        category_mutation
    }
}

export default useMainSection5Business