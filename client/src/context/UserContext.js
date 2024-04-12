import { createContext, useState, useEffect } from 'react'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
    const url = 'http://localhost:5555/api/v1'
    const [user, setUser] = useState(null)

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`${url}/login`)
                const data = await res.json()
                setUser(data)
            } catch (err) {
                throw new Error('Not found')
            }
        })()
    }, [])

    const login = (user) => {
        setUser(user)
    }

    const logout = (user) => {
        setUser(null)
    }

    // const handleNewUser = async () => {
    //     try {

    //     } catch (err) {
            
    //     }
        
    // }

    return (
        <UserContext.Provider value={{ user, login, logout }}>
            {children}
        </UserContext.Provider>
)}

export default UserProvider
