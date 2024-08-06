// 세션 스토리지 관리
class my_session_storage {
  
    // 데이터를 세션 스토리지에 저장
    save(key,data){
      try {
        const json_data = JSON.stringify(data)
        sessionStorage.setItem(key, json_data)
      }
      catch(e){
        console.error(e)
      }
    }
  
    // 세션 스토리지에서 데이터 불러오기
    load(key){
      try{
        const json_data = sessionStorage.getItem(key)
        if (json_data === null) {
          return undefined
        }
        return JSON.parse(json_data)
      }
      catch(e){
        console.error(e)
        return undefined
      }
    }
  
    // 세션 스토리지에서 데이터 삭제
    clear(key){
      try{
        sessionStorage.removeItem(key)
      }catch(e){
        console.error(e)
      }
    }

    // 세션 스토리지 현재 저장되있는 키 조회
    get_all_key(){
        try{
            const keys = []
            for(let i = 0; i<sessionStorage.length; i++){
                keys.push(sessionStorage.key(i))
            }
            return keys
        }catch(e){

        }
    }

    // 재대로 생성됬나 확인
    hiru(){
        return '제대로 생성됬어'
    }
}
  
export default new my_session_storage()