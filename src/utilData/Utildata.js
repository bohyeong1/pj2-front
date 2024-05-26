
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