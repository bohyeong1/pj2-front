import React from "react";
import './Acc_regist_lv6.css'
import Main_menu from "../../../menu/main-menu/main-menu";
import Host_footer from "../../../menu/host-footer/Host-footer";
import default_data from "../../../utilData/defaultData";

function Acc_regist_lv6(){

    async function multerFetch(e){
        e.preventDefault()
        if(e.target.imgFile.files && e.target.imgFile.files[0]){
            const image = e.target.imgFile.files[0]
            const imgData = new FormData()
            imgData.append('image', image)


            console.log(imgData)
            try{
                const result = await fetch((`${default_data.d_base_url}/api/accomodation/multer`),{
                    headers:{
                      'Content-Type':'multipart/form-data',
                    //   'Authorization': `${token? 'Bearer' + token : ''}`, 
                    },
                    method: 'POST',
                    body:{
                        data: imgData 
                    }

                  })
            }
            catch(e){
                console.log(e)
            }
        }

        
    }

    return(
        <div className="Acc_regist_lv6-container">
            <Main_menu></Main_menu>

            <div className="Acc_regist_lv6">
                <div className="Acc_regist_lv6-con-title">
                    숙소를 대표하는 이미지를 등록해주세요
                    <div className="Acc_regist_lv6-con-title-s1">최소 5장을 등록하셔야 합니다</div>
                </div>
                <div className="Acc_regist_lv6-con-sec1">
                    <form onSubmit={multerFetch}>

                        <input type='file' id="imgFile"></input>
                        <input  type='submit' value='이미지 재출'></input>
                    </form>
                    
                </div>
            </div>

            <div className="Acc_regist_lv6-footer">
                <Host_footer></Host_footer>
            </div>


        </div>
    )
}

export default Acc_regist_lv6