import './dropdown_state.scss'
import React, {useRef, useState} from 'react'
import default_data from "@/util/default_data/default_data";
import { state_store, reference_store } from '@/util/function/util_function'
import useMaterialDropdownStateBusiness from '../hook-store/business-hooks/material_dropdown_state_business';
import useMaterialDropdownStateStyle from '../hook-store/style-hooks/material_dropdown_state_style';

function DropdownState({menus = null, call_back, sellect, default_message}){

    // =================================================
    // refs //
    const drop_list = useRef(null)
    const drop_arrow = useRef(null)
    const drop_logo = useRef(null)
    const drop_options = useRef([])

    // =================================================
    // states //
    const [select_option , setSelect_option] = useState(null)

    // =================================================
    // hooks //
    // business
    const {click_option} = useMaterialDropdownStateBusiness(undefined,
        state_store([
            {
                'select_option' : select_option,
                'setSelect_option' : setSelect_option
            }
        ]),
        reference_store([
            {
                'drop_list' : drop_list
            },
            {
                'drop_logo' : drop_logo
            },
            {
                'drop_options' : drop_options
            }
        ]),
        {
            'sellect' : sellect,
            'call_back' : call_back,
            'menus' : menus
        })

    // style
    const {dropdown_toggle} = useMaterialDropdownStateStyle(undefined,undefined,
        reference_store([
            {
                'drop_list' : drop_list
            },
            {
                'drop_arrow'  :drop_arrow
            }
        ]))

    return(
        <div className="dropdown-state__custom-dr">
            <div className="dropdown-state__custom-logo" onClick={dropdown_toggle}>
                <span ref={drop_logo}>{sellect && sellect.name ? sellect.name : default_message}</span>
                <img className='dropdown-state__arrow-img' ref={drop_arrow} src={default_data.d_imgs.drop_arrow}></img>
            </div>
            <div className="dropdown-state__custom-options" ref={drop_list}>
                {menus && menus.map((el, id)=>{
                    if(!el){
                        return(
                            <div className={`dropdown-state__list ${!sellect ? 'dropdown-state__list-active' : ''}`} 
                                 ref={(el)=>{drop_options.current[id] = el}} 
                                 key={id} 
                                 onClick={()=>{click_option(id)}}>
                                선택 안함
                            </div>
                        )
                    }
                    return(
                        <div className={`dropdown-state__list ${sellect && sellect.name === el.name ? 'dropdown-state__list-active' : ''}`} 
                             ref={(el)=>{drop_options.current[id] = el}} 
                             key={id}
                             onClick={()=>{click_option(id)}}>
                            {el.name}
                        </div>
                    )
                })}
            </div>
      </div>
    )
}

export default DropdownState