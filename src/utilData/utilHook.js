import {useState, useRef} from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import default_data from "./defaultData";


const util_hooks = {
    // =================================================
    // 스와이퍼 버튼 로직 모음 //
    //// number -> 슬라이더 한 파트당 이미지 등장 개수
    useSwiperBtn : (number, handler)=>{
        const [RbtnState, setRbtnState] = useState(false)
        const [LbtnState, setLbtnState] = useState(true)
        const swiper_ref = useRef(null)
    
        // 오른쪽버튼
        function moveRSlide(){
            if (swiper_ref.current) {
                swiper_ref.current.slideNext()
                const btn_state = swiper_ref.current.isEnd
                if (LbtnState) {
                    setLbtnState(false)
                }
                if (btn_state) {
                    setRbtnState(true)
                }
            }
        }
    
        // 왼쪽버튼
        function moveLslide(){
            if (swiper_ref.current) {
                swiper_ref.current.slidePrev()
                const btn_state = swiper_ref.current.isBeginning
                if (btn_state) {
                    setLbtnState(true)
                }
                if (RbtnState) {
                    setRbtnState(false)
                }
            }
        }
    
        // 스와이퍼 드래그 했을 때 버튼 상태 추적 및 display 여부
        function swiper_change(){
            const index = swiper_ref.current.activeIndex
            const length = swiper_ref.current.slides.length
            if (index === 0) {
                if (!LbtnState) {
                    setLbtnState(true)
                }
            } else {
                if (LbtnState) {
                    setLbtnState(false)
                }
            }
    
            if (index === length - number) {
                if (!RbtnState) {
                    setRbtnState(true)
                }
            } else {
                if (RbtnState) {
                    setRbtnState(false)
                }
            }
            if(handler){
                // handler
                handler(index)
            }

        }
        return {RbtnState,setRbtnState,LbtnState,setLbtnState,swiper_ref, moveRSlide, moveLslide, swiper_change}
    },

    // =================================================
    // querystring 조회 후 query obj 객체 변환 훅 //
    useJoinUrl:()=>{    
        const params = useParams()       
        const [SearchParams, setSearchParams] = useSearchParams()

        const keyInv = []
        for(const key of SearchParams.keys()){
            if(!keyInv.includes(key)){
                keyInv.push(key)
            }
        }
        //서버로 보내는 쿼리 데이터 생성 for문
        const final_key = {}       
        const sort_key = {}          
        for(const value of keyInv){
            if(value === 'discount'){
                final_key[value] = {$exists:true}
            }
            else if(value === 'price-min'){
                final_key['price'] = {
                    ...final_key['price'],
                    $gte:parseInt(SearchParams.get(value).split('%')[0])}
            }
            else if(value === 'price-over'){
                if(SearchParams.get(value).split('%')[0] !== '500000'){
                    final_key['price'] = {
                        ...final_key['price'],
                        $lte:parseInt(SearchParams.get(value).split('%')[0])}
                }
            }
            else if(value === 'capacity'){
                final_key[value] = {$gte:SearchParams.get(value)}
            }
            else if(value ==='sort'){
                sort_key[value] = SearchParams.get(value)
            }
            else{
                final_key[`${value}.name`] = {$all:SearchParams.getAll(value)}
            }       
        }
        return {final_key, sort_key}
    },

    // =================================================
    // 유저데이터 파이어베이스 연동 훅 //
    useFireConnect : async(id, password)=>{
        try{
            const mapping_id = id + default_data.fire_mapping_email
            const user_data = await signInWithEmailAndPassword(auth, mapping_id, password)
            return user_data
        }catch(e){
            console.log(e)
        }
    }
}

export default util_hooks