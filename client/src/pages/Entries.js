import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import EntryPreview from '../components/EntryPreview'

function Entries() {
    const { user } = useContext(UserContext)
    const [pages, setPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const startIndex = (currentPage - 1) * 10
    const endIndex = currentPage * 10
    const navigate = useNavigate()

    const handleGoHome = () => {
        navigate('/')
    }

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage((currentPage) => currentPage - 1)
    }}

    const handleNext = () => {
        if (pages > currentPage) {
            setCurrentPage((currentPage) => currentPage + 1)
    }}

    return (
        user ? (
            <>
                <article className='all-entries-wrapper'>
                    <h2>View Journal Entries</h2>
                        {user.entries.slice(startIndex, endIndex).map((entry) => <EntryPreview key={entry.id} {...entry} />)}
                    <div>
                        <button className='all-entries' onClick={handlePrev}>Prev</button>
                        &nbsp; {currentPage} of {pages} &nbsp;
                        <button className='all-entries' onClick={handleNext}>Next</button>
                    </div> 
                </article>
            </>
        ) : (
            <>
                <div className='entries-error-message entries'>You must be logged in to view this page.</div>
                <button className='error-nav' onClick={handleGoHome}>Go to Login</button>
            </>
    )
)}

export default Entries