import { useEffect } from "react"
import confetti from 'canvas-confetti'

function useMaterialCongratulationStyle(data, states, refs, props){
    // =================================================
    // ref //   
    const {confetti_ref} = refs


    useEffect(() => {
        if (confetti_ref.current) {
            const my_conpetti = confetti.create(confetti_ref.current, {resize: true})
            const x_position = [0.1, 0.9, 0.3, 0.7, 0.6, 0.8]
            const y_position = [0.9, 0.8, 0.6, 1, 0.5, 0.4]
            for(let i = 0; i < 6; i++){
                setTimeout(() => {
                    my_conpetti({
                        particleCount: 150,
                        angle: 90,
                        spread: 80,
                        origin: {x: x_position[i]  , y: y_position[i]},
                        gravity: 1,
                        scalar: 0.5,
                        ticks : 1000
                    })
                }, i * 200)
            }
        }
    }, [])

    return {}
}

export default useMaterialCongratulationStyle