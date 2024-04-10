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
        <>
            <h1>{ err.error.message }</h1>
            <button onClick={handleGoBack}>Go Back</button>
            <button onClick={handleGoHome}>Return Home</button>
        </>
)}

export default Error