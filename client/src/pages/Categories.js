import {useEffect, useState} from 'react'
import toast from 'react-hot-toast'
import CategoryCard from '../components/CategoryCard'

const Categories = () => {
    const [categories, setCategories] = useState([])

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
        <div>
            <h2>Learn About Dream Categories</h2>
            {mappedCategories}
        </div>
    )
}

export default Categories