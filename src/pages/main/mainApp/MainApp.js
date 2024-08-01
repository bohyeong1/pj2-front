import React,{useState,useEffect} from "react";
import './MainApp.css'
import Event_swiper from "../event-swiper/Event-swiper";
import Creator_description from "../creator-description/Creator-description";
import Lv1_description from "../lv1-description/Lv1-description";
import Lv2_description from "../lv2-description/Lv2-description";
import Lv3_description from "../lv3-description/Lv3-description";
import Lv4_description from "../lv4-description/Lv4-description";
import Lv5_description from "../lv5-description/lv5-description";
import Search_descripton from "../search-description/Search-descripton";
import Main_menu from "../../../menu/main-menu/main-menu";
import Search_menu from "../../../menu/search-menu/search-menu";
import Footer from "../../../menu/footer/Footer";
import connectData from "../../../utilData/UtilFunction";


function MainApp(){
    // console.log('렌더 회수 체크')
    const [dataStore, setDataStore] = useState(null)
    useEffect(()=>{
        async function All_data(){
            let sec1, sec2, sec3, sec4, sec5
            try {
            [sec1, sec2, sec3, sec4, sec5] = await Promise.all(
                [connectData('http://127.0.0.1:3700/api/common','POST',{
                    filter : 'city',
                    counts : 12
                }),
                connectData('http://127.0.0.1:3700/api/common','POST',{
                    filter : 'keywords',
                    keyword:'친환경',
                    counts : 20
                }), 
                connectData('http://127.0.0.1:3700/api/common','POST',{
                    filter : 'keywords',
                    keyword : '연인추천',
                    counts : 20
                }),
                connectData('http://127.0.0.1:3700/api/common','POST',{
                    filter : 'keywords',
                    keyword : '색다른 공간',
                    counts : 20
                }),                
                connectData('http://127.0.0.1:3700/api/common','POST',{
                    filter : 'discount',
                    counts : 8
                })])


            } catch (e) {
              console.log(e)
            } finally {
                setDataStore({
                    sec1: sec1 || null,
                    sec2: sec2 || null,
                    sec3: sec3 || null,
                    sec4: sec4 || null,
                    sec5: sec5 || null
                })
            }            
        }
        All_data()
    },[])   

const imgurl ='http://www.cbiz.kr/news/photo/201907/16757_21366_1236.jpg'


    return(
        <div className="mainApp">
            <div className="main-gnb">
                <Main_menu></Main_menu>
                <Search_menu shadow={true} subtitle={true} data={dataStore?.sec1.search}></Search_menu>
            </div>
            <div className="main-content">
                <Event_swiper></Event_swiper>
                <Lv1_description title={'국내 인기 여행지'} data ={dataStore?.sec1.search}></Lv1_description>
                {/* <Lv2_description title={'할인 해택 여행지'} data={m_discount}></Lv2_description> */}
                <Lv2_description title={'연인추천 숙소'} data={dataStore?.sec3.accomodations}></Lv2_description>
                <Lv2_description title={'뷰맛집 숙소'} data={dataStore?.sec4.accomodations}></Lv2_description>
                <Creator_description></Creator_description>
                <Lv5_description title={'유형별 숙소'}></Lv5_description>
                <Lv4_description title={'친환경 숙소'} data={dataStore?.sec2.accomodations} imgurl = {imgurl}></Lv4_description>
                <Lv3_description title={'할인 이벤트'} data={dataStore?.sec5.accomodations}></Lv3_description>
                <Search_descripton title={'국내여행지'} data={dataStore?.sec1.search}></Search_descripton>
            </div>
            <div className="main-footer">
                <Footer></Footer>
            </div>
        </div>

    )
}

export default MainApp