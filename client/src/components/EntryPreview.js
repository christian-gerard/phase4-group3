import { NavLink } from 'react-router-dom'

function EntryPreview({id, title, body, date, category}) {
    return (
        <NavLink className='entry-link' to={`/view/${id}`}>
            <p className='entry-short'>
                <span>
                    <h5>{date}</h5>
                    {title} | {body} 
                </span>
                
            </p>
        </NavLink>
)}

export default EntryPreview