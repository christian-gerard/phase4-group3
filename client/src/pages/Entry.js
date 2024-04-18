import { useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
<<<<<<< HEAD
import { Formik, Form, Field, useFormik } from 'formik'
import { object, string, date as yupDate } from 'yup'
import toast from 'react-hot-toast'
=======
>>>>>>> main
import { UserContext } from '../context/UserContext'
import toast from 'react-hot-toast'
import { useFormik } from 'formik'
import { object, string, date as yupDate } from 'yup'
import { useToaster } from 'react-hot-toast'

const editSchema = object({
    title: string().max(50, 'Title must be 50 characters or less'),
    date: yupDate().required('Date is required.'),
    body: string()
        .min(10, 'Entry must be at least 10 characters long')
        .max(40000, 'Entry may not be more than 40,000 characters'),
})

function Entry() {
    const { user, updateEntries } = useContext(UserContext)
    const [isEdit, setIsEdit] = useState(false)
    const navigate = useNavigate()
    const params = useParams()

    const currentEntry = user.entries.filter((entry) => entry.id === parseInt(params.id))[0]

    const editMode = () => {
        setIsEdit(!isEdit)
    }

    const handleGoHome = () => {
        navigate('/')
    }

    const handleDelete = () => {
            fetch(`/entries/${currentEntry.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                if (res.ok) {
                    const updatedEntries = user.entries.filter((entry) => entry.id !== currentEntry.id)
                    updateEntries(updatedEntries)
                    navigate('/view')
                    toast.success("Deleted")
                } else {
                    return res
                        .json()
                        .then((errorObj) => toast.error(errorObj.message))
                }
            })
            .catch((error) => console.error('Error:', error))
    }

    const editSchema = object({
        title: string().max(50, 'Title must be 50 characters or less'),
        date: yupDate().required('Date is required.'),
        body: string()
            .min(10, 'Entry must be at least 10 characters long')
            .max(40000, 'Entry may not be more than 40,000 characters'),
    })

    const initialValues = {
        title: currentEntry.title,
        date: currentEntry.date,
        body: currentEntry.body
    }

    const formik = useFormik({
		initialValues,
		validationSchema: editSchema,
		onSubmit: (formData) => { 
                fetch(`/entries/${currentEntry.id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                })
                .then((res) => {
					if (res.ok) {
                        return res.json().then((data) => {
                            const updatedEntries = user.entries.map((entry) => entry.id === parseInt(currentEntry.id)? data : entry)
                            updateEntries(updatedEntries)
                            navigate('/view')
                            toast.success("Updated")
						})
					} else {
						return res
							.json()
							.then((errorObj) => toast.error(errorObj.message))
					}
				})
				.catch((error) => console.error('Error:', error))
        }
    })
    
    const handleSave = () => {
    }

    return (
        user ? (
            <>
                {currentEntry ? (
                    isEdit ? 
                    <div id='new'>
                        <h2>Editing: {currentEntry.title}</h2>
                        <form className='new-entry' onSubmit={formik.handleSubmit}>
                            <label htmlFor='title'>Title &nbsp;</label>
                            <input
                                type='text'
                                name='title'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.title}
                                id = 'title'
                                placeholder={currentEntry.title}
                            />
                            {formik.errors.title && formik.touched.title && (
                                <div className='error-message show'>{formik.errors.title}</div>
                            )}
                            <br />
                            <label htmlFor='date'>Date &nbsp;</label>
                            <input
                                type='date'
                                name='date'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.date}
                                id='date'
                                placeholder={currentEntry.date}
                            />
                            {formik.errors.date && formik.touched.date && (
                                <div className='error-message show'>
                                    {formik.errors.date}
                                </div>
                            )}
                            <br />
                            <label htmlFor='body'>Entry</label>
                            <textarea
                                type='textarea'
                                name='body'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.body}
                                rows='30'
                                cols='100'
                                id='entry'
                                wrap='soft'
                                placeholder={currentEntry.body}
                            />
                            {formik.errors.body && formik.touched.body && (
                                <div className='error-message show'>
                                    {formik.errors.body}
                                </div>
                            )}
                            <div className='flex'>
                                <button id='submit-edit' onClick={handleSave}>Save</button>
                                <button id='submit-edit' onClick={handleDelete}>Delete</button>
                            </div>
                        </form>
                    </div>
                :
                    <div className='view'>
                        <h2>Viewing: {currentEntry.title}</h2>
                        <button className='button' onClick={editMode}>Edit</button>
                        <p className='datespan'>{currentEntry.date}</p>
                        <p className='dream'>{currentEntry.body}</p>
                        <button className='button' onClick={handleDelete}>Delete</button>
                    </div>
                ) : (
                        <>
                            <div className='entries-error-message entries'>Entry not found. Try logging in.</div>
                            <button className='error-nav' onClick={handleGoHome}>Go to Login</button>
                        </>
                )}
            </>
        ) : (
            <>
                <div className='entries-error-message entries'>You must be logged in to view this page.</div>
                <button className='error-nav' onClick={handleGoHome}>Go to Login</button>
            </>
        )
)}

export default Entry