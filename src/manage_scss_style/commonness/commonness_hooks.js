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

// =================================================
// set vw //
export function useSetVw(){
    function set_vw(){
        const vw = window.innerWidth * 0.01
        document.documentElement.style.setProperty('--vw', `${vw}px`)
    }
    useEffect(()=>{
        set_vw()        
        window.addEventListener('resize', set_vw)
    
        return () => {
          window.removeEventListener('resize', set_vw)
        }
    },[])
}
