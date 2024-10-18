import { useEffect } from "react";
import connect_data from "@/util/function/util_function";
import { useDispatch } from "react-redux";
import { set_search_data } from "@/redux/modules/searchSlice";
import my_session_storage from "@/sessionStorage/session_storage"
import default_data from "@/util/default_data/default_data";


function useMainBusiness(data, states, refs, props){

    // =================================================
    // redux state //
    const dispatch = useDispatch()

    // =================================================
    // states //  
    const {main_data,
           setMain_data} = states

    // =================================================
    // 초기 데이터 섹션별 fetch //
    useEffect(()=>{

        async function All_data(){
            let sec1, sec2, sec3, sec4, sec5
            try{
                [sec1, sec2, sec3, sec4, sec5] = await Promise.all(
                    [connect_data(`${default_data.d_base_url}/api/common`,'POST',{
                        filter : 'city',
                        counts : 12
                    }),
                    connect_data(`${default_data.d_base_url}/api/common`,'POST',{
                        filter : 'keywords',
                        keyword:'친환경',
                        counts : 20
                    }), 
                    connect_data(`${default_data.d_base_url}/api/common`,'POST',{
                        filter : 'keywords',
                        keyword : '연인추천',
                        counts : 20
                    }),
                    connect_data(`${default_data.d_base_url}/api/common`,'POST',{
                        filter : 'keywords',
                        keyword : '색다른 공간',
                        counts : 20
                    }),                
                    connect_data(`${default_data.d_base_url}/api/common`,'POST',{
                        filter : 'discount',
                        counts : 8
                    })])
            }catch(e){
              console.log(e)
            }finally{
                setMain_data({
                    sec1: sec1 || null,
                    sec2: sec2 || null,
                    sec3: sec3 || null,
                    sec4: sec4 || null,
                    sec5: sec5 || null
                })

                // 검색어 리덕스에 저장
                dispatch(set_search_data(sec1))

                // 세션 스토리지에 검색어 저장
                my_session_storage.save('search',sec1)
            }            
        }
        All_data()
    },[])   
    return {}
}

export default useMainBusiness