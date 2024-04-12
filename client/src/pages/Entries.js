import {useState, useEffect} from 'react'
import EntryPreview from './EntryPreview'

function Entries() {

    const [entries, setEntries] = useState([])
    const [pages, setPages] = useState()
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {

        fetch('http://127.0.0.1:5555/api/v1/entries')
        .then(resp => resp.json())
        .then(data => setEntries(data))

        


    }, [])

    useEffect(() => {

        setPages(entries.length / 10)

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