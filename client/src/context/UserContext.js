import { createContext, useState } from 'react'
import toast from 'react-hot-toast'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null)

	const login = (user) => {
		setUser(user)
	}

	const logout = () => {
		try {
			fetch('/logout', { method: 'DELETE' }).then((resp) => {
				if (resp.status === 204) {
					setUser(null)
					toast.success('Entry Deleted')
				} else {
					toast.error('Could not delete!')
				}
			})
		} catch (err) {
			throw err
    }}

	const updateEntries = (updatedEntries) => {
		setUser({ ...user, entries: updatedEntries })
	}

	return (
		<UserContext.Provider value={{ user, login, logout, updateEntries }}>
			{children}
		</UserContext.Provider>
)}

export default UserProvider