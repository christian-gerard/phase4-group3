import {useState, useContext} from 'react'
import EntryPreview from '../components/EntryPreview'
import { UserContext } from '../context/UserContext'

function Entries() {
    const { user } = useContext(UserContext)
    const [pages, setPages] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const startIndex = (currentPage - 1) * 10
    const endIndex = currentPage * 10

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage((currentPage) => currentPage - 1)
    }}

    const handleNext = () => {
        if (pages > currentPage) {
            setCurrentPage((currentPage) => currentPage + 1)
    }}
//! include chips for categories for filtering
    return (
        <article className='all-entries-wrapper'>
            <h2>View Journal Entries</h2>
            {user ? 
                user.entries.slice(startIndex, endIndex).map((entry) => <EntryPreview key={entry.id} {...entry} />) 
                : 
                <div className='entries-error-message entries'>You must be logged in to view entries!</div>
            }
            <div>
                <button className='all-entries' onClick={handlePrev}>Prev</button>
                &nbsp; {currentPage} of {pages} &nbsp;
                <button className='all-entries' onClick={handleNext}>Next</button>
            </div>
        </article>
    )
}

export default Entries