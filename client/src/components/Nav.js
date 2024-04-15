import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Nav = () => {
    const { user, logout } = useContext(UserContext)
    console.log(user)
    return (
        <header>
            <h1>Rabbit Rabbit &#128007;</h1>
            <hr/>
            <nav>
                <NavLink id='link' to='/' className=''>Home</NavLink>
                    {user ? 
                        (<>
                        <NavLink id='link' to='/new' className=''>New Entry</NavLink>
                        <NavLink id='link' to='/view' className=''>View Journal</NavLink>
                        <NavLink id='link' to='/' className='' onClick={logout}>Logout</NavLink>
                        </>) : null
                    }
            </nav>
        </header>
)}

export default Nav