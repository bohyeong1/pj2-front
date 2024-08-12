import './dropdown.css'
import React, {useRef, useState} from 'react'
import default_data from '../../../utilData/defaultData'
import { state_store, reference_store } from '../../../utilData/UtilFunction'
import useMaterialDropdownBusiness from '../hook-store/business-hooks/material-dropdown-business'
import useMaterialDropdownStyle from '../hook-store/style-hooks/material-dropdown-style'


function Dropdown(){

    //ref
    const drop_list = useRef(null)
    const drop_arrow = useRef(null)
    const drop_logo = useRef(null)
    const drop_options = useRef([])

    // state
    const [select_option , setSelect_option] = useState(null)

    ////////////////////////////////////
    ////////////// hooks ///////////////
    ////////////////////////////////////
    // business
    const {click_option} = useMaterialDropdownBusiness(undefined,
        state_store([
            {
                'select_option':select_option,
                'setSelect_option':setSelect_option
            }
        ]),
        reference_store([
            {
                'drop_list':drop_list
            },
            {
                'drop_logo':drop_logo
            },
            {
                'drop_options':drop_options
            }
        ]))

    // style
    const {dropdown_toggle} = useMaterialDropdownStyle(undefined,undefined,
        reference_store([
            {
                'drop_list':drop_list
            },
            {
                'drop_arrow':drop_arrow
            }
        ]))

    return(
        <div className="dropdown__custom-dr">
            <div className="dropdown__custom-logo" onClick={dropdown_toggle}>
                <span ref={drop_logo}>{select_option?.textContent}</span>
                <img className='dropdown__arrow-img' ref={drop_arrow} src={default_data.d_imgs.drop_arrow}></img>
            </div>
            <div className="dropdown__custom-options" ref={drop_list}>
                {default_data.dropdown_menus.map((el, id)=>{
                    return(
                        <div className={`dropdown__list ${select_option === drop_options.current[id] ? 'dropdown__list-active' : ''}`} ref={(el)=>{drop_options.current[id] = el}} 
                        key={id} data-value={el.name} onClick={click_option}>{el.title}</div>
                    )
                })}
            </div>
      </div>
    )
}

export default Dropdown