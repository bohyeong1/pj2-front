import { useParams, useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import connectData from "../../../../utilData/UtilFunction"
import default_data from "../../../../utilData/defaultData"

function useSubSubAppBusiness(data,states,refs){
    const params = useParams()              //파라미터
    const [SearchParams, setSearchParams] = useSearchParams()

    ///쿼리스트링 키값 조회 함수    
    const keyInv = []
    for(const key of SearchParams.keys()){
        if(!keyInv.includes(key)){
            keyInv.push(key)
        }
    }

    console.log(states)

    ////서버로 보내는 쿼리 데이터 생성 for문
    const finalKey = {}              ///스테이트로 뺄까말까 추후 고려사항/랜더링 너무 많아질듯
    for(const value of keyInv){
        if(value === 'discount'){
            finalKey[value] = {$exists:true}
        }
        else if(value === 'price'){
            if(SearchParams.get(value).includes('%')){
                finalKey[value] = {$gte:SearchParams.get(value).split('%')[0]}
            }else{
                finalKey[value] = {$lt:SearchParams.get(value)}
            }
        }
        else if(value === 'capacity'){
            finalKey[value] = {$gte:SearchParams.get(value)}
        }
        else{
            finalKey[`${value}.name`] = {$all:SearchParams.getAll(value)}
        }       
    }


    // console.log(finalKey)

    // 데이터 패치
    useEffect(()=>{
        const select_city = params.city
        connectData(`${default_data.d_base_url}/api/common/sub`,'POST',{
            city:select_city,
            filters:finalKey
        })
        .then(result => {
            // console.log(result)
            if(result.code === 200){
                states.setList(result.accomodations)
            }else{
                console.log(states.message)
            }

        })
    },[SearchParams.toString(),params.city])

    // 도시이름
    const city = params.city

    return {city}
}

export default useSubSubAppBusiness