function useSubSubListBusiness(data,states,refs,props){
    
    // 페이지네이션 버튼 클릭
    function sellectPageData(page){
        props.setCurrent_page(page)
    }

    return {sellectPageData}
}

export default useSubSubListBusiness