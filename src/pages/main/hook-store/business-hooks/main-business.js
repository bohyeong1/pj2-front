import { useEffect } from "react";
import connectData from "../../../../utilData/UtilFunction";

function useMainBusiness(data, states, refs){
    // 초기 데이터 섹션별 fetch
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
                states.setDataStore({
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
    return {}
}

export default useMainBusiness