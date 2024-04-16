import { NavLink } from 'react-router-dom'

function EntryPreview({id, title, body, date, category}) {

    return (
        <NavLink to={`/view/${id}`} className=''>
            <div>
                <h5>{date} | {title}</h5>
                <p>{body}</p>
                <p>Category:{category}</p>
            </div>
        </NavLink>
)}

export default EntryPreview