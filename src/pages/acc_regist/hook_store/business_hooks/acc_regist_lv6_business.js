import { file_data } from "../../../../utilData/UtilFunction"
import session_storage from "../../../../sessionStorage/session_storage"
import default_data from "../../../../utilData/defaultData"
import _ from 'lodash'
import { is_equal_file } from "../../../../utilData/UtilFunction"
import { useParams } from "react-router-dom"

function useAccRegistLv6Business(data, states, refs, props){
    // =================================================
    // params //
    const param = useParams()

    // =================================================
    // states //
    const {loading, setLoading, prev_main_img, setPrev_main_img, prev_sub_img, setPrev_sub_img} = states

    // =================================================
    // props //
    const {login_user} = props

    // =================================================
    // img upload  //
    function img_upload(main_img, sub_img){
        // data check
        const isValid_files = sub_img.every((el)=>{
            return el.size > 0
        })

        if(isValid_files && main_img && login_user && login_user.userId){
            const img_files = new FormData()
            // 메인 이미지
            img_files.append('mainImg',main_img,'mainImg') 
            // 서브이미지
            for(const file of sub_img){
                img_files.append('subImg', file, 'subImg')
            }
            // user id
            img_files.append('userId', login_user.userId)
            return img_files
        }else{
            return null
        }
    }

    // =================================================
    // data fetch  //
    async function fetch_acc(data, index){
        setLoading(false)

        if(is_equal_file([prev_main_img], [data.main_img]) && is_equal_file(prev_sub_img, data.sub_img)){
            setLoading(true)
            return session_storage.load('house') && session_storage.load('house')._id ? {
                accomodation : {
                    _id : session_storage.load('house')._id
                }
            } : false
        }
        // prev_data와 current_data 다를 경우 패치 진행
        else{     
            // form data
            const imgs_form = img_upload(data.main_img, data.sub_img)
            // error
            if(!imgs_form){
                return false
            }

            const acc_data = await file_data(`${default_data.d_base_url}/api/accomodation/registLv6/${param.house}`, 'PUT', imgs_form)
        
            if(acc_data && acc_data.acc_state){
                session_storage.save('house',acc_data.accomodation)
            }        
            console.log(acc_data)
            setLoading(true)
            return acc_data.acc_state ? acc_data : false
        }
    }
    return {fetch_acc}
}

export default useAccRegistLv6Business