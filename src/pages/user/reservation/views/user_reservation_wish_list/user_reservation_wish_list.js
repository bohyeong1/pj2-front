import './user_reservation_wish_list.scss'
import { UserContext } from "@/context/user_context/config/user_context"
import { useContext } from 'react'
import useUserReservationWishListBusiness from '../../hook_store/business_hooks/user_reservation_wish_list_business'
import Loading from "@/utilComponent/material/loading/loading"
import OriginalImg from '@/picture/original_img/original_img';
import close_icon from '@/assets/icon/close-icon.png'

function UserReservationWishList(){

    // =================================================
    // context state //
    const {user_data, setUser_data} = useContext(UserContext)

    // =================================================
    // hooks //
    // business
    const {
        data, 
        isLoading, 
        error,
        delete_wishlist_mutation,
        click_delete_wish_list,
        click_wish_list_box
    } = useUserReservationWishListBusiness(
        {
            user_data,
            setUser_data
        }
    )

    if(isLoading || delete_wishlist_mutation.isPending){
        return (
            <Loading></Loading>
        )
    }

    if(error){
        // redirection url
    }
    
    return (
        <div className='user-reservation-wish-list__container'>
            <span className='user-reservation-wish-list__title'>찜목록</span>
            <div className='user-reservation-wish-list__contents'>
                {data.wishlists.map((el, id) => {
                    return (
                        <div 
                            className='user-reservation-wish-list__item'
                            onClick={() => {click_wish_list_box(el.accomodation_id)}}
                            key={id}>
                            <button 
                                className='user-reservation-wish-list__item-button'
                                onClick={() => {click_delete_wish_list(el.accomodation_id)}}>
                                <img src={close_icon}/>
                            </button>
                            <div className='user-reservation-wish-list__item-img-wrapper'>
                                <OriginalImg url = {el.accomodation_id.main_img}/>
                            </div>
                            <span>
                                {el.accomodation_id.title}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default UserReservationWishList