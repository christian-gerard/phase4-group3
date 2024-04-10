import { NavLink } from 'react-router-dom'

const Nav = () => {
    return (
        <nav>
            <NavLink id='link' to='/' className=''>Home</NavLink>
            <NavLink id='link' to='/new' className=''>New Entry</NavLink>
            <NavLink id='link' to='/view' className=''>View Journal</NavLink>
            <NavLink id='link' to='/reg' className=''>Registration</NavLink>
            <NavLink id='link' to='/' className=''>Logout</NavLink>
        </nav>
    )
}

export default Nav