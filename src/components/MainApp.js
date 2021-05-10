import React, {useState} from 'react'
import { UserContext } from '../contexts/UserContext'
import { AppRouter } from '../routes/AppRouter'

export const MainApp = () => {
    const [users, setUsers] = useState([])
    const [authUser, setAuthUser] = useState()
    return (
        <>
            <UserContext.Provider value={{
                users, setUsers,authUser,setAuthUser
            }}> 
                <AppRouter /> 
            </UserContext.Provider>
        </>
    )
}
