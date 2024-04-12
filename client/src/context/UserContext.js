import { createContext, useState } from 'react'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const login = (user) => {
        setUser(user)
    }

    const logout = () => {
        fetch("/logout", {method: "DELETE"})
        .then(resp => {
            if (resp.status === 204) {
                setUser(null)
            }
        })
    }

    const updateEntries = (updatedEntries) => {
        setUser({...user, entries: updatedEntries})
    }

    return (
        <UserContext.Provider value={{ user, login, logout, updateEntries }}>
            {children}
        </UserContext.Provider>
)} 

export default UserProvider
