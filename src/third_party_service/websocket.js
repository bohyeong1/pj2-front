import io from 'socket.io-client'

// =================================================
// initialized web message socket //
export function set_socket(message_room_id, user_id){
    return io('https://127.0.0.1:3700', {
        withCredentials : true,
        query : {
          message_room_id : message_room_id,
          user_id : user_id
        },
    })
}
