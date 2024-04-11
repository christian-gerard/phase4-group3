import {useState, useEffect} from 'react'
import EntryPreview from './EntryPreview'

function Entries() {

    const [entries, setEntries] = useState([])

    useEffect(() => {

        fetch('http://127.0.0.1:5555/api/v1/entries')
        .then(resp => resp.json())
        .then(data => setEntries(data))

    }, [entries])

    const renderEntryPreviews = entries.map((entry) => <EntryPreview key={entry.id} />)

    return (
        <>
        
        <h1>Journal</h1>

        {renderEntryPreviews}
        
        </>

    )
}
export default Entries