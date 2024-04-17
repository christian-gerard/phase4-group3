import { createContext, useState } from 'react'
import toast from 'react-hot-toast'
import {useEffect} from 'react'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const login = (user) => {
        setUser(user)
    }

    const logout = () => {
        try {
            fetch("/logout", {method: "DELETE"})
            .then(resp => {
                if (resp.status === 204) {
                    setUser(null)
                    toast.success('Entry Deleted')
                } else {
                    toast.error('Deletion failed...')
                }
            })
        }
        catch(err) {
            throw err
    }}

    const updateEntries = (updatedEntries) => {
        setUser({...user, entries: updatedEntries})
    }

    // Refresh
    useEffect(() => {
        fetch("/me")
        .then(resp => {
            if (resp.ok) {
            resp.json().then(setUser)
            
            } else {
            toast.error("Please log in")
            }
        })
    }, [])

    return (
        <UserContext.Provider value={{ user, login, logout, updateEntries }}>
            {children}
        </UserContext.Provider>
)}

export default UserProvider