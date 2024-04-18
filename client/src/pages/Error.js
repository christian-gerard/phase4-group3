import { useContext } from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

const Error = () => {
    const { user } = useContext(UserContext)
    const err = useRouteError()
    const navigate = useNavigate()

    const handleGoBack = () => {
        navigate(-1)
    }

    const handleGoHome = () => {
        navigate('/')
    }

    return (
        <article className='non-route'>
            {user ?  <p className='nav-error'>{ err.message }</p> : <p className='nav-error'>Please login to view this page.</p>}
            <button className='error-nav' onClick={handleGoBack}>Go Back</button>
            <button className='error-nav' onClick={handleGoHome}>Return Home</button>
        </article>
)}

export default Error