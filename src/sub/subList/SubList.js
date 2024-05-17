import React from "react";
import { Link } from "react-router-dom";
import './SubList.css'
import Detail from "../../picture/detail/Detail";

function SubList({data}){
    // console.log(data)
    return(
        <div className="sublist-container">
            {data.map((ele, id)=>{
                return(
                    <div className="sublist-list" key={id}>
                        <div className="list-img">
                            <Detail data={ele}></Detail>
                        </div>
                        <div className="list-text">
                            <div className="list-text-tex1">{`${ele.grade}등급.${ele.category}`}</div>
                            <div className="list-text-tex2">{ele.title}</div>
                            <div className="list-text-tex3">{ele.cityName}</div>
                            <div className="list-text-tex4">{ele.adress}</div>
                            <div className="list-text-tex5">{ele.evaluation}</div>
                            <div className="list-text-tex6">{`${ele.price}원`}</div>
                        </div>
                    </div>
                )

            })

            }
        </div>
    )
}

export default SubList