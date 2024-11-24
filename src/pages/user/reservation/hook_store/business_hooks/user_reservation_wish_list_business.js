import { useGetAllUserWishList, useDeleteUserWishlist } from "@/util/apis/user/user_information"
import { useNavigate } from "react-router-dom"

function useUserReservationWishListBusiness(cons, states, refs, props){

    // =================================================
    // const //
    const {
        user_data,
        setUser_data
    } = cons

    // =================================================
    // react query //
    const {data, isLoading, error} = useGetAllUserWishList(user_data._id, user_data)

    // =================================================
    // mutation //
    const delete_wishlist_mutation = useDeleteUserWishlist()

    // =================================================
    // navigate //
    const navigate = useNavigate()

    // =================================================
    // click delete wish list //
    function click_delete_wish_list(data){
        delete_wishlist_mutation.mutate(
            {
                user_id : user_data._id,
                accomodation_id : data._id
            }
        )
    }

    // =================================================
    // click wish list box //
    function click_wish_list_box(data){
        navigate(`/detail/${data._id}`)
    }

    return {
        data, 
        isLoading, 
        error,
        delete_wishlist_mutation,
        click_delete_wish_list,
        click_wish_list_box
    }
}

export default useUserReservationWishListBusiness