import { useGetUserEvaluations } from "@/util/apis/user/user_information"

function useUserProfileMainBusiness(cons, staes, refs, props){
    // =================================================
    // const //
    const {user_data} = cons

    // =================================================
    // react query //
    const {data, isLoading, isError} = useGetUserEvaluations(user_data._id)

    return {
        data,
        isLoading,
        isError
    }
}

export default useUserProfileMainBusiness