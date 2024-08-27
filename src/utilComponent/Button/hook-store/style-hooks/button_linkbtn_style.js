
function useButtonLinkbtnStyle(){
    // =================================================
    // button style check //
    function button_style(url, button_state, text, style){
        if(text === '이전'){
            if(style){
                return url ? 'button-enable' : 'button-disable'
            }
            else{
                return url ? false : true     
            }         
        }
        // 다음버튼
        else{
            if(style){
                return url && button_state ? 'button-enable' : 'button-disable'
            }
            else{
                return url && button_state ? false : true     
            } 
        }  
    }

    return {button_style}
}

export default useButtonLinkbtnStyle