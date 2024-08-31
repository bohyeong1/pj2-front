
function useButtonLinkbtnStyle(){
    // =================================================
    // button style check //
    function button_style(url, button_state, text, style, fetch_state){
        if(text === '이전'){
            if(style){
                return url && fetch_state !== null ? 'button-enable' : 'button-disable'
            }
            else{
                return url && fetch_state !== null ? false : true     
            }         
        }
        // 다음버튼
        else{
            if(style){
                return url && button_state && fetch_state !== null ? 'button-enable' : 'button-disable'
            }
            else{
                return url && button_state && fetch_state !== null ? false : true     
            } 
        }  
    }
    return {button_style}
}

export default useButtonLinkbtnStyle