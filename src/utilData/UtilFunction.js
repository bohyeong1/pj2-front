////데이터 연결 유틸 함수
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


/////////// 가격 콤마 찍기
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