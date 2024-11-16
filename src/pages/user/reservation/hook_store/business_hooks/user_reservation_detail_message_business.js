import { useQuery, useQueryClient } from "@tanstack/react-query"
import { get_reservation_massage_detail } from "@/util/apis/user/user_reservation"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { set_socket } from "@/third_party_service/websocket"

function useUserReservationDetailMessage(cons, states, refs, props){

    // =================================================
    // parameter //
    const params = useParams()

    // =================================================
    // cons //
    const {
        user_data, 
        setUser_data
    } = cons

    // =================================================
    // states //
    const {
        socket,
        setSocket,
        messages,
        setMessages
    } = states

    // =================================================
    // react query //
    const query_client = useQueryClient()

    const {data, error, isLoading} = useQuery({
        queryKey : ['reservation_message_detail', params.reservation], 
        queryFn : ({queryKey}) => {
            const [, parameter] = queryKey
            return get_reservation_massage_detail(parameter)
        }, 
        onError : (e) => {
            console.log(e)
            query_client.removeQueries('reservation_message_detail')
        }
    })

    // =================================================
    // set initial message //
    useEffect(()=>{
        if(data){
            setMessages([...data.message.messages])
        }
    },[data])

    // =================================================
    // connect web socket //
    useEffect(()=>{
        const new_socket = set_socket(params.reservation, user_data._id)
        setSocket(new_socket)

        new_socket.emit('join_room', {
            message_room_id: params.reservation,
            user_id: user_data._id
        })

        new_socket.on('new_message', (cur) => {
            console.log(cur)
            setMessages((prev) => [...prev, cur.message])
        })

        new_socket.on('error', (e) => {
            console.error(e)
        })

        return () => {
            new_socket.disconnect()
        }

    },[params.reservation, user_data._id])

    // =================================================
    // send message //
    function send_message(content){
        if(!content){
            return
        }
 
        if(socket){
            socket.emit('send_message', {
                room_id: params.reservation,
                sender_id: user_data._id,
                content: content
            })
        }
    }

    return {
        data,
        error,
        isLoading,
        send_message
    }
}

export default useUserReservationDetailMessage