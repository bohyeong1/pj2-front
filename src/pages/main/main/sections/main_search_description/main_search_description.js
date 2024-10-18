import './main_search_description.scss'
import useMainSearchDescriptionBusiness from '../../hook_store/business_hooks/main_search_description_business'

function MainSearchDescription({data, title}){

    const {click_box} = useMainSearchDescriptionBusiness()

    return(
        <div className="main-search-description__container">
            <div className="main-search-description__title">
                <span>
                    {title}
                </span>                
            </div>
            <div className="main-search-description__contents">
                {data?.map((el, id)=>{
                    return(
                        <span key={id} 
                              onClick={()=>{click_box(el.city)}}>
                                {el.city}
                        </span>
                    )
                })}
            </div>
        </div>
    )

}

export default MainSearchDescription