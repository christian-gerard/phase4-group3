import { NavLink } from 'react-router-dom'

function EntryPreview({id, title, body, date, category}) {
    return (
        <NavLink className='entry-link' to={`/view/${id}`}>
            <p>
                <span className='entry-short'>{date} | {title} </span>
                {body}
            </p>
        </NavLink>
)}

export default EntryPreview