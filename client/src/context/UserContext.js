import { createContext, useState } from 'react'

export const UserContext = createContext()
export const url = '#'

const UserProvider = ({ children }) => {
    const [user, setUser] = useState([])

    // useEffect(() => {
    //     (async () => {
    //         try {
    //             const res = await fetch(url)
    //             const data = await res.json()
    //             setUser(data)
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     })()
    // }, [])

    const handleNewUser = async () => {
        try {

        } catch (err) {
            
        }
        
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
)}

export default UserProvider
