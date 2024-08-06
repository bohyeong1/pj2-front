import { useNavigate, useLocation, useParams } from "react-router-dom";

function useMenuSideBusiness(){
    const params = useParams()
    const location = useLocation()
    const navigate = useNavigate()

    // 페이지 초기화
    function initial_page(){
        navigate(`/${location.pathname.split('/')[1]+'/'+params.city}`)
        window.location.reload()
    }


    return {initial_page}
}

export default useMenuSideBusiness