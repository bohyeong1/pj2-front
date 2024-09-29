import { useEffect } from "react"
// =================================================
// set vh //
export default function useSetVh(){
    function set_vh(){
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    }
    useEffect(()=>{
        set_vh()        
        window.addEventListener('resize', set_vh)
    
        return () => {
          window.removeEventListener('resize', set_vh)
        }
    },[])
}

