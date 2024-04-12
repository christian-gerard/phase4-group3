import { NavLink } from 'react-router-dom'

const Nav = () => {
    return (
        <header>
            <h1>Rabbit Rabbit &#128007;</h1>
            <hr/>
            <nav>
                <NavLink id='link' to='/' className='nav-link'>Home</NavLink>
                <NavLink id='link' to='/new' className='nav-link'>New Entry</NavLink>
                <NavLink id='link' to='/view' className='nav-link'>View Journal</NavLink>
                <NavLink id='link' to='/' className='nav-link'>Logout</NavLink>
            </nav>
        </header>
)}

export default Nav