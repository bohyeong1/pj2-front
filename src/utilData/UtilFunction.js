//////////////////////////////////////////////////
///////////////////데이터 연결 유틸 함수///////////
/////////////////////////////////////////////////
async function connectData(url, method, data = null, token = null){
    const dataJson = await fetch(url,{
      headers:{
        'Content-Type':'application/json',
        'Authorization': `${token? 'Bearer' + token : ''}`, 
      },
      method: method,
      body: data? JSON.stringify(data) : null 
    })

    const result = await dataJson.json()
    return result
  }
export default connectData

//////////////////////////////////////////
////////////스테이트 저장소////////////////
/////////////////////////////////////////
////생명주기:임포트 해온 컴포넌트 범위/////
////////파라미터 객체 형태로 넣을 것//////
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


//////////////////////////////////////////
//////////////Ref 저장소//////////////////
/////////////////////////////////////////
////생명주기:임포트 해온 컴포넌트 범위/////
/////////파라미터 배열형태로 넣을것//////
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


//////////////////////////////////////////////////
///////////////////////가격 콤마찍기///////////////
/////////////////////////////////////////////////
export function pop_three_texts(price){
  let copied_texts = String(price)
  let text_inv = []
  for(let i=0; i<copied_texts.length; i +=3){
      text_inv.push(copied_texts.substring(i,i+3))
      if(copied_texts.length > text_inv.join(',').length - i){
          text_inv.push(',')
      }
  }

  return text_inv.join('')
}


//////////////////////////////////////////
//////플러스, 마이너스 버튼 로직 모음///////
/////////////////////////////////////////

// 플러스 버튼 눌렀을 때
export function clickPlus(e, input, input_board, input_text, minus_btn){
    e.stopPropagation()

    input_board.current.innerText = Number(input_board.current.innerText)+1
    input_text.current.value= `인원수 ${input_board.current.innerText}명`
    input.current.value= `${input_board.current.innerText}`
    if(input_board.current.innerText==='10'){
        e.target.disabled = true
    }else{
        const lb_btn = minus_btn.current
        lb_btn.disabled=false
    }
}
// 마이너스 버튼 눌렀을 때
export function clickMinus(e, input, input_board, input_text, plus_btn){
    e.stopPropagation()

    input_board.current.innerText = Number(input_board.current.innerText)-1
    // console.log(b_box3_ref.current)
    input_text.current.value= `인원수 ${input_board.current.innerText}명`
    input.current.value= `${input_board.current.innerText}`
    if(input_board.current.innerText==='0'){
        e.target.disabled = true
    }else{
        const rb_btn = plus_btn.current
        rb_btn.disabled=false
    }
}

