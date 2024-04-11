import { NavLink } from 'react-router-dom'

const Nav = () => {
    return (
        <header>
            <h1>Rabbit Rabbit &#128007;</h1><hr/>
            <nav>
                <NavLink id='link' to='/' className=''>Home</NavLink>
                <NavLink id='link' to='/new' className=''>New Entry</NavLink>
                <NavLink id='link' to='/view' className=''>View Journal</NavLink>
                <NavLink id='link' to='/' className=''>Logout</NavLink>
            </nav>
        </header>
)}

export default Nav