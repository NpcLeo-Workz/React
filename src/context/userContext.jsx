import {createContext} from 'react'

const UserContext = createContext({
    user: undefined,
    setUser: (user) => {
        console.warn('setSelectedUser is not implemented, provide a value to fix this')
    }
})
export default UserContext
