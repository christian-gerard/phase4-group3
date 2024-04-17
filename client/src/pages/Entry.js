import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useToaster } from 'react-hot-toast'
import { Formik, Form, Field, useFormik } from 'formik'
import { object, string, date as yupDate } from 'yup'
import * as Yup from 'yup'
import { UserContext } from '../context/UserContext'

function Entry() {
    const { user, updateEntries } = useContext(UserContext)
    const params = useParams()
    const [isEdit, setIsEdit] = useState(false)
    const navigate = useNavigate()
    const toast = useToaster()

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
            .then((resp) => {
                if (resp.ok) {
                    const updatedEntries = user.entries.filter((entry) => entry.id !== currentEntry.id)
                    updateEntries(updatedEntries)
                    navigate('/view')
                } else {
                    return resp
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
                .then((resp) => {
					if (resp.ok) {
                        const updatedEntries = user.entries.map((entry) => entry.id === parseInt(currentEntry.id)? formData : entry)
                        updateEntries(updatedEntries)
                        navigate('/view')
					} else {
						return resp
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
                        <div>
                            <h2>Editing: {currentEntry.title}</h2>
                            <button onClick={editMode}>Edit</button>
                            <button onClick={handleDelete}>Delete</button>
                            <Formik enableReinitialize={true}>
                                <Form className='form'  onSubmit={formik.handleSubmit}>
                                    <Field
                                        type='text'
                                        name='title'
                                        placeholder={currentEntry.title}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.title}
                                        className='input'
                                    />
                                    {formik.errors.title && formik.touched.title && (
                                        <div className='error-message show'>
                                            {formik.errors.title}
                                        </div>
                                    )}
                                    <Field
                                        type='text'
                                        name='date'
                                        placeholder={currentEntry.date}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.date}
                                        className='input'
                                    />
                                    {formik.errors.date && formik.touched.date && (
                                        <div className='error-message show'>
                                            {formik.errors.date}
                                        </div>
                                    )}
                                    <Field
                                        type='text'
                                        name='body'
                                        placeholder={currentEntry.body}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.body}
                                        className='input'
                                    />
                                    {formik.errors.body && formik.touched.body && (
                                        <div className='error-message show'>
                                            {formik.errors.body}
                                        </div>
                                    )}
                                <button onClick={handleSave}>Save</button>
                                </Form>
                            </Formik>
                        </div>
                    :
                        <div>
                            <h2>Viewing: {currentEntry.title}</h2>
                            <button onClick={editMode}>Edit</button>
                            <button onClick={handleDelete}>Delete</button>
                            <p>{currentEntry.title}</p>
                            <p>{currentEntry.body}</p>
                            <p>{currentEntry.date}</p>
                            
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