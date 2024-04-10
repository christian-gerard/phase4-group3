import React, { useState, useEffect } from 'react'
// import { v4 as uuid } from 'uuid'

export const Context = React.createContext()
export const url = '#'

const ContextProvider = ({ children }) => {
    const [user, setUser] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(url)
                const data = await res.json()
                setUser(data)
            } catch (err) {
                console.log(err)
            }
        })()
    }, [])


    return (
        <Context.Provider value={{ user }}>
            {children}
        </Context.Provider>
    )
}

export default ContextProvider