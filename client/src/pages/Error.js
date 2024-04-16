import { useNavigate, useRouteError } from 'react-router-dom'

const Error = () => {
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
            <p className='nav-error'>{ err.error.message }</p>
            <button className='error-nav' onClick={handleGoBack}>Go Back</button>
            <button className='error-nav' onClick={handleGoHome}>Return Home</button>
        </article>
)}

export default Error