import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'


function Entry() {

    const params = useParams()
    const [singleEntry, setSingleEntry] = useState({})
    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {

        fetch(`/entries/${params.id}`)
        .then(resp => {
            if(resp.ok) {
               return resp.json()
            } else if (resp.status === 403) {
                return "User not logged in"
            }

        })
        .then(data => setSingleEntry(data))

        setIsEdit(false)

    },[params.id])

    const editMode = () => {
        setIsEdit(!isEdit)
    }

    const handleDelete = () => {
        console.log('DELETE TRIGGERED')
    }

    const handleSave = () => {
        console.log('Save Triggered')
    }

    return isEdit ? 
        <div>
            <h2>EDIT MODE</h2>
            <button onClick={editMode}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            <input placeholder={singleEntry.title}></input>
            <input placeholder={singleEntry.date}></input>
            <input placeholder={singleEntry.body}></input>
            <button onClick={handleSave}>Save</button>
        </div>
        :
        <div>
            <h2>VIEW MODE</h2>
            <button onClick={editMode}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
            <p>{singleEntry.title}</p>
            <p>{singleEntry.body}</p>
            <p>{singleEntry.date}</p>
            
        </div>

    
}

export default Entry