import { UserContext } from "../config/user_context"
import { useState } from "react"

function UserProvider({children}){
    // =================================================
    // states //   
    // user data
    const [user_data, setUser_data] = useState(null)

    return (
        <UserContext.Provider  
        value = {{ 
            user_data, 
            setUser_data}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider