// =================================================
// 화면 알트탭해도 타이머는 계속 돌아가게하는 웹워커 //

let timer = 0
let interval = null

onmessage = function(e){
    if(e.data.action === 'start'){
        clearInterval(interval)
        timer = e.data.time

        interval = setInterval(() => {
            const minutes = Math.floor(timer / 60).toString().padStart(2, '0')
            const seconds = (timer % 60).toString().padStart(2, '0')
            
            postMessage({ minutes, seconds })

            timer--

            if(timer < 0){
                clearInterval(interval)
                postMessage({finish : true})
            }
        }, 1000)

    }
}

