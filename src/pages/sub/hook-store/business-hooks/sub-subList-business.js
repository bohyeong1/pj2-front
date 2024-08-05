import { useEffect } from "react"

function useSubSubListBusiness(data,states,refs,props){


    useEffect(()=>{
        if(data){
            states.setPageData(data.slice(0,6))   //한페이지 출력하는 data개수
            states.setCurrentPage(1)                  ///초기 렌더링시 디폴트 페이지 넘버
            states.setPageCount(Math.ceil(data.length / 6)) //총페이지 개수
        }
    },[data])


    function sellectPageData(){      

    }

    return {sellectPageData}
}

export default useSubSubListBusiness