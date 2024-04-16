import { NavLink } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const Nav = () => {
    const { user, logout } = useContext(UserContext)
    return (
        <header>
            <h1>Rabbit Rabbit &#128007;</h1>
            <section>
                <div id='h' className='color-bar' />
                <div id='g' className='color-bar' />
                <div id='f' className='color-bar' />
                <div id='e' className='color-bar' />
                <div id='d' className='color-bar' />
                <div id='c' className='color-bar' />
                <div id='b' className='color-bar' />
                <div id='a' className='color-bar' />
            </section>
            <nav>
                <NavLink id='link' to='/' className=''>Home</NavLink>
                    {user ? 
                        (<>
                        <NavLink id='link' to='/new' className=''>New Entry</NavLink>
                        <NavLink id='link' to='/view' className=''>View Journal</NavLink>
                        <NavLink id='link' to='/categories' className=''>Dream Categories</NavLink>
                        <NavLink id='link' to='/' className='' onClick={logout}>Logout</NavLink>
                        </>) : null
                    }
            </nav>
        </header>
)}

export default Nav
