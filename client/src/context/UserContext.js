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

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
)} 

export default UserProvider
