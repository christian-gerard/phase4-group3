import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import toast from 'react-hot-toast'
import CategoryCard from '../components/CategoryCard'

const Categories = () => {
    const { user } = useContext(UserContext)
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])

    const handleGoHome = () => {
        navigate('/')
    }

    useEffect(() => {
        fetch("/categories")
        .then(resp => {
            if (resp.ok) {
                return resp.json().then(setCategories)
            }
            return resp.json().then(errorObj => toast.error(errorObj.message))
        })
        .catch(err => {
            toast.error("An unexpected error occurred.")
        })
    }, []);

    const mappedCategories = categories.map(category => (
        <CategoryCard key={category.id} name={category.name} description={category.description} />
    ))
    return(
        user ? (
            <>
                <div>
                    <h2 className='learn'>Learn About Dream Categories</h2>
                    {mappedCategories}
                </div>
            </>
        ) : (
        <>
            <div className='entries-error-message entries'>You must be logged in to view this page.</div>
            <button className='error-nav' onClick={handleGoHome}>Go to Login</button>
        </>
    ))
}

export default Categories