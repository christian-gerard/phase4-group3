import {useState, useEffect, useContext} from 'react'
import EntryPreview from './EntryPreview'
import { UserContext } from '../context/UserContext'

function Entries() {

    const { user } = useContext(UserContext)
    const [pages, setPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {

    
    }, [user])

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage((currentPage) => currentPage - 1)
        } 
    }

    const handleNext = () => {
        if (pages > currentPage) {
            setCurrentPage((currentPage) => currentPage + 1)
        } 
    }

    const startIndex = (currentPage - 1) * 10
    const endIndex = currentPage * 10


    return ( 
        <>
        {
            user ? 

            user.entries.slice(startIndex, endIndex).map((entry) => <EntryPreview key={entry.id} {...entry} />) 

            : 
            
            <h1>User not Logged in</h1>
        }

        <div>
            <button onClick={handlePrev}>Prev</button>
            {currentPage} of {pages} 
            <button onClick={handleNext}>Next</button>
        </div>
        
        </>
        
        )

}
export default Entries