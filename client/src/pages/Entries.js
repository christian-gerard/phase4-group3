import {useState, useEffect, useContext} from 'react'
import EntryPreview from './EntryPreview'
import UserContext from '../context/UserContext'

function Entries() {

    const user = useContext(UserContext)
    const [entries, setEntries] = useState([])
    const [pages, setPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    console.log(user)

    useEffect(() => {
        if(user) {
            setEntries(user.entries)
        }

    }, [])

    useEffect(() => {

            setPages(Math.ceil(entries.length / 10))
    
    }, [entries])

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

    const renderEntryPreviews = entries.slice(startIndex, endIndex).map((entry) => <EntryPreview key={entry.id} {...entry} />)

    return ( 
        <>
        {renderEntryPreviews} 

        <div>
            <button onClick={handlePrev}>Prev</button>
            {currentPage} of {pages} 
            <button onClick={handleNext}>Next</button>
        </div>
        
        </>
        
        )

}
export default Entries