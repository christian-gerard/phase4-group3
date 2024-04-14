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
        .catch(err => console.log(err))
        toast.error("An unexpected error occurred.")
    }, []);


    const mappedCategories = categories.map(category => (
        <CategoryCard key={category.id} category={category}/>
    ))
    return(
        <div>
            {mappedCategories}
        </div>
    )
}

export default Categories