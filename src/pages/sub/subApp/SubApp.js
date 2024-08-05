import React, { useState } from "react";
import './SubApp.css'
import Side_menu from "../../../utilComponent/menu/side-menu/side-menu";
import Main_menu from "../../../utilComponent/menu/main-menu/main-menu";
import SubList from "../subList/SubList";
import Footer from "../../../utilComponent/menu/footer/Footer";
import default_data from "../../../utilData/defaultData";

import useSubSubAppBusiness from "../hook-store/business-hooks/sub-subApp-business";
import useSubSubAppStyle from "../hook-store/style-hooks/sub-subApp-style";
import { state_store, reference_store } from "../../../utilData/UtilFunction";

function SubApp (){

    // state
    const [list, setList] = useState([])   //////////지역 필터 데이터
    const [def_list, setDef_list] = useState([])

    ////////////////////////////////////
    ////////////// hooks ///////////////
    ////////////////////////////////////
    // business
    const {city} = useSubSubAppBusiness(undefined, state_store([
        {
            'list':list,
            'setList':setList
        },
        {
            'def_list':def_list,
            'setDef_list':setDef_list
        }
    ]))
    // style
    const {} = useSubSubAppStyle()

    



    return(
        <div className="subApp">
            <Main_menu></Main_menu>
            <div className="sub-content">
                <Side_menu default_data={default_data}></Side_menu>
                <div className="sub-main-content">
                    <div className="sub-board">
                        <span className="sub-board__list-count">
                            {`'${city}' 숙소`}
                        </span>
                    </div>
                    <SubList data={list}></SubList>
                </div>
            </div>
            <div className="sub-footer">
              <Footer></Footer>
            </div>

        </div>
    )
}

export default SubApp