import React,{useState,useEffect} from "react";
import './MainApp.css'
import Event_swiper from "../event-swiper/Event-swiper";
import Creator_description from "../creator-description/Creator-description";
import Lv1_description from "../lv1-description/Lv1-description";
import Lv2_description from "../lv2-description/Lv2-description";
import Lv3_description from "../lv3-description/Lv3-description";
import Lv4_description from "../lv4-description/Lv4-description";
import Search_descripton from "../search-description/Search-descripton";
import Main_menu from "../../../menu/main-menu/main-menu";
import Search_menu from "../../../menu/search-menu/search-menu";
import Footer from "../../../menu/footer/Footer";
import connectData from "../../../utilData/UtilFunction";


function MainApp(){
  
    const [renderData,setRenderData] = useState()  
    const [searchData, setSearchData] = useState() 
    const [subdata, setSubdata]  = useState([])  ///////카테고리별 분류 데이터 프롭스로 내려주기

    const [dataStore, setDataStore] = useState()

    useEffect(()=>{
        // async function All_data(){
        //     let sec1, sec2, sec3, sec4, sec5
        //     try {
        //     [sec1, sec2, sec3, sec4, sec5] = await Promise.all(
        //         [connectData('http://127.0.0.1:3700/api/common','POST',{
        //             filter : 'city',
        //             counts : 10
        //         }),
        //         connectData('http://127.0.0.1:3700/api/common','POST',{
        //             filter : 'keywords',
        //             keyword:'친환경',
        //             counts : 20
        //         }), 
        //         connectData('http://127.0.0.1:3700/api/common','POST',{
        //             filter : 'keywords',
        //             keyword : '연인추천',
        //             counts : 20
        //         }),
        //         connectData('http://127.0.0.1:3700/api/common','POST',{
        //             filter : 'keywords',
        //             keyword : '색다른 공간',
        //             counts : 20
        //         }),                
        //         connectData('http://127.0.0.1:3700/api/common','POST',{
        //             filter : 'discount',
        //             counts : 8
        //         })])

        //     //   setLoading(true)
        //     } catch (e) {
        //       console.log(e)
        //     //   setLoading(false)
        //     } finally {
        //         setDataStore({
        //             sec1: sec1 || null,
        //             sec2: sec2 || null,
        //             sec3: sec3 || null,
        //             sec4: sec4 || null,
        //             sec5: sec5 || null
        //         })
        //     }            
        // }

        // All_data()

        connectData('http://127.0.0.1:3700/api/common','POST')
        .then(result => {     
            console.log(result)      
            setRenderData(result.accomodations)
            setSearchData(result.search)

            /////////////////////////////////slice로 20개까지 잘라서 스테이트에 담고 관리자 페이지 만들어서 분류할 키워드만 db에서 불러와서 쏴주는 식으로?
            /////////숙소 데이터량이 많아지면 프론트에서 필터링하는 방법이 맞는지???
            const eco = sectionFilterData(result.accomodations,'친환경')
            const love = sectionFilterData(result.accomodations, '연인추천')
            const view = sectionFilterData(result.accomodations,'색다른 공간')
            
            setSubdata([eco, love, view])
        })
    },[])
    
    //메인화면 색션 필터 util 함수 /////관리자 페이지로 메인화면 출력 선택하게 옮기면 함수 일부 수정ㅇㅇ//키워드 분류 함수//나중에 벡엔드에서 필터링해서 올지 고민해 볼 사항
    function sectionFilterData(data,value){
        const dataInv = []
        for(const section of data){
            const filterdData = section.keywords.filter((el)=>{return el.name === value})
            if(filterdData.length != 0){
                dataInv.push(section)
            }
        }                    
       return dataInv
    }
  

const imgurl ='http://www.cbiz.kr/news/photo/201907/16757_21366_1236.jpg'


    return(
        <div className="mainApp">
            <div className="main-gnb">
                <Main_menu></Main_menu>
                <Search_menu shadow={true} subtitle={true} data={renderData}></Search_menu>
            </div>
            <div className="main-content">
                <Event_swiper></Event_swiper>
                <Lv1_description title={'국내 인기 여행지'} data ={searchData}></Lv1_description>
                {/* <Lv2_description title={'할인 해택 여행지'} data={m_discount}></Lv2_description> */}
                <Lv2_description title={'연인추천 숙소'} data={subdata[1]}></Lv2_description>
                <Lv2_description title={'뷰맛집 숙소'} data={subdata[2]}></Lv2_description>
                <Creator_description></Creator_description>
                <Lv4_description title={'친환경 숙소'} data={subdata[0]} imgurl = {imgurl}></Lv4_description>
                <Lv3_description title={'할인 이벤트'} data={renderData}></Lv3_description>
                <Search_descripton title={'국내여행지'} data={searchData}></Search_descripton>
            </div>
            <div className="main-footer">
                <Footer></Footer>
            </div>
        </div>

    )
}

export default MainApp