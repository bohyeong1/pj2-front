import { useUpdateUserWishlist } from "@/util/apis/user/user_information"
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

function useDetailHeaderBusiness(cons, states, refs, props){
    // =================================================
    // parameter //
    const params = useParams()
    const house_param = params.house

    // =================================================
    // const //
    const {
        user
    } = cons

    // =================================================
    // query client //
    const query_client = useQueryClient()

    // =================================================
    // mutation //
    const wishlist_mutation = useUpdateUserWishlist()

    // =================================================
    // click wish list button //
    function click_wish_list_button(){
        wishlist_mutation.mutate(
            {
                user_id : user._id,
                accomodation_id : house_param
            }
        )
    }

    return {
        click_wish_list_button
    }
}

export default useDetailHeaderBusiness