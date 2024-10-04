import default_data from "@/util/default_data/default_data"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/firebase"

// =================================================
// 데이터 fetch 비로그인 페이지에서 사용 //
async function connect_data(url, method, data = null, token = null){
    const data_json = await fetch(url,{
        headers:{
        'Content-Type':'application/json',
        'Authorization': `${token? 'Bearer ' + token : ''}`, 
        },
        method: method,
        body: data? JSON.stringify(data) : undefined 
    })

        const result = await data_json.json()
        return result
    }
export default connect_data

// =================================================
// file data fetch utill function //
export async function file_data(url, method, data){
    if(!url || !method || !data){
        alert('파라미터를 제대로 넣어주세요')
        return
    }
    const data_file = await fetch(url,{
        method : method,
        body : data
    })

    const result = await data_file.json()
    return result
}


// =================================================
// 유저데이터 파이어베이스 연동 & db login 쿠키 저장 함수 //
export async function user_login(id, password){
    try{
        // firebasse login
        const mapping_id = id + default_data.fire_mapping_email
        const user_data = await signInWithEmailAndPassword(auth, mapping_id, password)
        const user_token = await user_data.user.getIdToken()

        // db login
        if(user_data && user_token){
        const data = await fetch(`${default_data.d_base_url}/api/users/login`,{
            headers:{
            'Authorization' : `Bearer ${user_token}`,
            'Content-Type' : 'application/json'
            },
            method:'POST',
            body:JSON.stringify({
            userId : id
            }),
            credentials : 'include'
        })
        const parsing_data = await data.json()
        return parsing_data
        }
        else{
        console.log('firebase login 실패')
        }
    }catch(e){
        console.log(e)
    }
}

// =================================================
// 1시간 주기로 토큰 재생성 및 업데이트 시 쿠키 재설정 함수 //
export async function update_user_token(user_token){
    const data = await fetch(`${default_data.d_base_url}/api/users/updateToken`,{
        headers:{
        'Authorization' : `Bearer ${user_token}`
        },
        method:'GET',
        credentials : 'include'
    })
    const parsing_data = await data.json()
    return parsing_data
}

// =================================================
// login 상태 체크 유저 정보 얻는 함수 //
export async function get_user(boolean_value){
    // boolean_value = true(사용자 정보 획득) false(db안거치고 http cookie에서 토큰 존재 유무만 체크)

    const data = await fetch(`${default_data.d_base_url}/api/users/${boolean_value ? 'getuser' : 'maintain'}`,{
        method : 'GET',
        credentials : 'include'
    })

    const result = await data.json()
    return result
}

// =================================================
// cookie 보내서 유저 정보 post 요청하는 함수 //
export async function connect_data_width_cookies(url, method, data = null){
    const user_data = await fetch(url,{
        method : method,
        credentials : 'include',
        headers : {
        'Content-Type': 'application/json'
        },
        body: data? JSON.stringify(data) : undefined 
    })

    const result = await user_data.json()
    return result
}


// =================================================
// state 전달 함수 //
//생명주기:임포트 해온 컴포넌트 범위
export function state_store(states){
    const state_store = {}
    
    // 배열 검사
    if(Array.isArray(states) && states.length > 0){
        // 배열 엘리먼트 객체 && 밸류값 2개인지(state + setstate)검사
        if(states.every((el)=>{return typeof el === 'object' && el !== null && Object.values(el).length === 2})){
        // 저장
        states.forEach((el)=>{
            const key_inv = Object.keys(el)
            const value_inv = Object.values(el)
            key_inv.forEach((ele,index)=>{
            state_store[ele] = value_inv[index]
            })
        })      
        }else{
        throw new Error('배열요소는 객체 & state + setstate로 구성')
        }
    }else{
        throw new Error('배열 넣자')
    }
    return state_store
}


// =================================================
// reference 전달 함수 //
//생명주기:임포트 해온 컴포넌트 범위
export function reference_store(refs){
    const reference_store = {}
    // 배열 검사
    if (Array.isArray(refs) && refs.length > 0) {
        // 파라미터 타입검사 객체&&키 개수 1개 이상
        if (refs.every((el)=>{return typeof el === 'object' && el !== null && Object.values(el).length === 1})) {
        refs.forEach((el)=>{
            const key = Object.keys(el)[0]
            reference_store[key] = el[key]
        })
        }else{
        throw new Error('배열요소는 객체 & 1개로 구성')
        }
    }else{
        throw new Error('배열넣자')
    }

    return reference_store
}


// =================================================
// 가격 3자리마다 콤마찍기 //
export function pop_three_texts(price){
    let copied_texts = String(price)
    let text_inv = []
    for(let i = 0; i < copied_texts.length; i += 3){
        text_inv.push(copied_texts.substring(i,i+3))
        if(copied_texts.length > text_inv.join(',').length - i){
            text_inv.push(',')
        }
    }

    return text_inv.join('')
}


// =================================================
// 플러스 마이너스 버튼 //

// 플러스 버튼 눌렀을 때
export function clickPlus(e, input, input_board, input_text, minus_btn, max_num){
    e.stopPropagation()

    input_board.current.innerText = Number(input_board.current.innerText)+1
    input_text.current.value = `인원수 ${input_board.current.innerText}명`
    input.current.value= `${input_board.current.innerText}`
    if(input_board.current.innerText === `${max_num}`){
        e.target.disabled = true
    }else{
        const lb_btn = minus_btn.current
        lb_btn.disabled = false
    }
    }
    // 마이너스 버튼 눌렀을 때
    export function clickMinus(e, input, input_board, input_text, plus_btn){
    e.stopPropagation()

    input_board.current.innerText = Number(input_board.current.innerText)-1
    // console.log(b_box3_ref.current)
    input_text.current.value= `인원수 ${input_board.current.innerText}명`
    input.current.value = `${input_board.current.innerText}`
    if(input_board.current.innerText === '0'){
        e.target.disabled = true
    }else{
        const rb_btn = plus_btn.current
        rb_btn.disabled = false
    }
}


// =================================================
// state -> query obj 객체 변경 함수 //
export function make_query_obj(obj){
    if(!obj){return}
    // 정렬 기준 없음
    const keyInv = []
    for(const key of Object.keys(obj)){
        if(!keyInv.includes(key)){
            keyInv.push(key)
        }
    }

    // 서버로 보내는 쿼리 데이터 생성 for문
    const final_key = {}             
    for(const value of keyInv){
        if(value === 'discount'){
        final_key[value] = {$exists:true}
        }
        else if(value === 'price-min'){
        final_key['price'] = {
            ...final_key['price'],
            $gte:parseInt(obj[value].split('%')[0])}
        }
        else if(value === 'price-over'){
        if(obj[value].split('%')[0] !== '500000'){
            final_key['price'] = {
            ...final_key['price'],
            $lte:parseInt(obj[value].split('%')[0])}
        }
        }
        else if(value === 'capacity'){
        final_key[value] = {$gte:obj[value]}
        }
        else if(value === 'category'){
        final_key[`${value}.name`] = {$all:[obj[value]]}
        }    
        else{
        final_key[`${value}.name`] = {$all:obj[value]}
        }       
    }
    return {final_key}
}

// =================================================
// prove accomodation adress field //
export function prove_accomodation(acc_data, field){
    const case1 = field[0]
    const case2 = field[1]
    const case3 = field[2]

    // main_adress field
    if(!acc_data[case1] || !acc_data[case1].name || acc_data[case1].name.length === 0 || acc_data[case1].coor.length !== 2){
        return null
    }
    // sub_adress field
    if(!acc_data[case2] || !acc_data[case2].name || acc_data[case2].name.length === 0 || acc_data[case2].coor.length !== 2){
        return null
    }
    // search_adress field
    if(!acc_data[case3] || acc_data[case3].length === 0){
        return null
    }

    return {
        main_adress : acc_data[case1],
        sub_adress : acc_data[case2],
        search_adress : acc_data[case3]
    }
}

// =================================================
// get img's url //
export function get_img_url(file){
    if(file){
        return URL.createObjectURL(file)
    }
}

// =================================================
// file data 비교 함수 //
export function is_equal_file(prev, current){
    if(!Array.isArray(prev) || !Array.isArray(current)){
        alert('array 형태로 넣을 것')
    }
    // prev의 element가 null값 찍힐 때
    if(prev.every((el)=>{
        return !el
    })){
        return false
    }

    // currnet의 element가 null값 찍힐 때
    if(current.every((el)=>{
        return !el
    })){
        return false
    }

    return prev.length === current.length && prev.every((el, index) => {
        const current_el = current[index]
        return el.name === current_el.name && el.size === current_el.size && el.lastModified === current_el.lastModified
    })
}

// =================================================
// control button state //
export function button_state(button_state, fetch_state){
    return button_state && fetch_state ? false : true     
}

