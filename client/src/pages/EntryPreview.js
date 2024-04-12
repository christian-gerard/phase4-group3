import { NavLink } from 'react-router-dom'

function EntryPreview({id, title, body, date, category}) {


    return (
        <NavLink to={`/view/${id}`} className=''>
            <div>
                <h5>{date} | {title}</h5>
                <h4>{category.name}</h4>
                <p>{body}</p>
            </div>
        </NavLink>
    )
}

export default EntryPreview