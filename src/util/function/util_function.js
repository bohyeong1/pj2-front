import default_data from "@/util/default_data/default_data"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/firebase"
import {differenceInMonths, differenceInDays, differenceInYears, format} from 'date-fns'
import { isInteger } from "lodash"
import { renew_fresh_token } from "@/firebase/firebase"
import { debounce } from "lodash"

// =================================================
// 데이터 fetch common 페이지에서 사용 //
async function connect_data(url, method, data = null, token = null){
    try{
        const response = await fetch(url,{
            headers:{
                'Content-Type':'application/json',
                'Authorization': `${token? 'Bearer ' + token : ''}`, 
            },
            method: method,
            body: data? JSON.stringify(data) : undefined 
        })

        if(!response.ok){
            const error_result = await response.json()
            throw error_result
        }

        const result = await response.json()
        return result
    }
    catch(e){
        if(typeof e === 'string'){
            throw new Error(e)
        }
        else{
            throw e
        }
    }

}
export default connect_data

// =================================================
// file data fetch utill function //
export async function file_data(url, method, data){
    try{
        const response = await fetch(url, {
            credentials: 'include',
            method : method,
            body : data
        })
    
        if(!response.ok){
            const error_result = await response.json()
            throw error_result
        }
        const result = await response.json()
        return result
    }
    catch(e){
        if(typeof e === 'string'){
            throw new Error(e)
        }
        else{
            throw e
        }
    }
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
            headers : 
            {
                'Authorization' : `Bearer ${user_token}`,
                'Content-Type' : 'application/json'
            },
            method : 'POST',
            body : JSON.stringify(
                {
                    userId : id
                }
            ),
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
// common page login 체크 && 유저 정보 얻는 함수 //
export async function check_optimistic_user(){
    try{
        await renew_fresh_token()

        const response = await fetch(`${default_data.d_base_url}/api/users/optimistic-user-check`,{
            method : 'GET',
            credentials : 'include'
        })

        if(!response.ok){
            const error_result = await response.json()
            throw error_result
        }

        const result = await response.json()
        return result

    }catch(e){
        if(typeof e === 'string'){
            throw new Error(e)
        }
        else{
            throw e
        }
    }
}

// =================================================
// login 체크 && 유저 정보 얻는 함수 //
export async function get_user(){
    try{
        await renew_fresh_token()

        const response = await fetch(`${default_data.d_base_url}/api/users/getuser`,{
            method : 'GET',
            credentials : 'include'
        })

        if(!response.ok){
            const error_result = await response.json()
            throw error_result
        }

        const result = await response.json()
        return result

    }catch(e){
        if(typeof e === 'string'){
            throw new Error(e)
        }
        else{
            throw e
        }
    }
}

// =================================================
// cookie 보내서 유저 정보 post 요청하는 함수 //
export async function connect_data_width_cookies(url, method, data = null){
    try{
        const response = await fetch(url,{
            method : method,
            credentials : 'include',
            headers : {
                'Content-Type': 'application/json'
            },
            body: data? JSON.stringify(data) : undefined 
        })
    
        if(!response.ok){
            const error_result = await response.json()
            throw error_result
        }
        const result = await response.json()
        return result
    }catch(e){
        if(typeof e === 'string'){
            throw new Error(e)
        }
        else{
            throw e
        }
    }
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
    if(copied_texts < 4){
        return price
    }
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

// =================================================
// compare unit8array //
export function compare_unit8_arrays(unit1, unit2){
    if(unit1.length !== unit2.length){
        return false
    }
    return unit1.every((el, index)=>{
        return el === unit2[index]
    })
}

// =================================================
// text 줄 수 이상 됬을 때 자르기 //
// textarea 전용
export function split_text(line, element, text, call_back = null){
    if(!text){
        console.log('text를 넣어 주세요!')
        call_back(null)
        return
    }
    if(element.tagName !== 'PRE'){
        console.log('pre 태그를 넣어주세요')
        return 
    }
    let line_height = window.getComputedStyle(element).lineHeight
    const font_size = parseFloat(window.getComputedStyle(element).fontSize)

    if(line_height === 'normal'){
        line_height = Math.round(font_size * 1.2)
    }
    else if(line_height.includes('%')){
        line_height = Math.round(font_size * parseFloat(line_height) / 100)
    }
    else{
        line_height = Math.round(parseFloat(line_height)) 
    }

    const max_height = line * line_height
    const original_text = text

    function get_scroll_height(text){
        element.value = text
        return element.scrollHeight
    }

    let current_height = element.scrollHeight

    if(current_height > max_height){
        let left = 0
        let right = original_text.length
        let result_text = original_text

        while(left <= right){
            const mid = Math.floor((left + right) / 2)
            let split_text = original_text.substring(0, mid)

            split_text = split_text + '...'

            const split_height = get_scroll_height(split_text)

            if(split_height <= max_height){
                left = mid + 1
                result_text = split_text
            }else{
                right = mid - 1
                result_text = split_text
            }
        }
        if(call_back){
            console.log(result_text)
            call_back(result_text)
        }
        element.value = result_text
    }else{
        element.value = original_text
        if(call_back){
            call_back(original_text)
        }
    }
}

// =================================================
// textarea onchange //
export function text_change(text, fake_box, row_text, alert_text, line, height, error_handler, error_state){
    fake_box.textContent = text
    const one_line_height = height
    const line_calculate = fake_box.scrollHeight / one_line_height
    let row = Math.round(line_calculate)

    row_text.textContent = `${row}/${line}`
    if(row > line){
        alert_text.style.display = 'block'
        if(!error_state){
            error_handler(true)
        }
    }else{
        alert_text.style.display = 'none'
        if(error_state){
            error_handler(false)
        }
    }
}

// =================================================
// get date difference //
export function get_date_difference(date, only_day = false){
    const year_difference = differenceInYears(new Date(), new Date(date))
    const month_difference = differenceInMonths(new Date(), new Date(date))
    const day_difference = differenceInDays(new Date(), new Date(date))

    if(only_day){
        return day_difference ? day_difference + '일' : 
        '0일'
    }
    else{
        return month_difference % 12 === 0 && year_difference ? year_difference + '년' :
        month_difference % 12 !== 0 && year_difference ? year_difference + '년' + (month_difference - year_difference * 12) + '월' :
        month_difference ? month_difference + '개월' : 
        day_difference ? day_difference + '일' :
        '0일'
    }

}

// =================================================
// get format date //
export function transform_date(date, year = true, query = false){
    if(query){
        return format(date, 'yyyy-MM-dd')
    }
    else{
        if(year){
            return format(date, 'yyyy.MM.dd')
        }
        else{
            return format(date, 'MM.dd')
        } 
    }   
}

// =================================================
// get discount price //
export function get_discount_price(price, rate){
    if(!isInteger(price) || !isInteger(price)){
        console.log('정수 타입으로 넣어주세요.')
        return
    }
    return (100 - rate) / 100 * price
}