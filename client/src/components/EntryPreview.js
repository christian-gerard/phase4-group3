import { NavLink } from 'react-router-dom'

function EntryPreview({id, title, body, date, category}) {

    return (
        <NavLink to={`/view/${id}`}>
            <p className='entry-link'>{date} | {title}</p>
            <p className='entry-link long-desc'>{body}</p>
        </NavLink>
)}

export default EntryPreview