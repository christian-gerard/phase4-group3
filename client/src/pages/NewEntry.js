import React, { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import toast from 'react-hot-toast'
import { object, string } from 'yup'
import { date as yupDate} from 'yup'
import { useFormik } from 'formik'

// Form fields:
// title
// date
// entry
// category

// Yup entry validation
//! Figure out date and category
const entrySchema = object({
    title: string().max(50, 'Title must be 50 characters or less'),
    date: yupDate().required('Date is required.'),
    entry: string().min(10, 'Entry must be at least 10 characters.').max(40000, 'Entry must be 40,000 characters or less').required('Entry is required.'),
    category: string().required('Category is required.')
})

// Formik form setup
const initialValues = {
    title: '',
    date: '',
    entry: '',
    category: ''
}
const NewEntry = () => {
    // const [isLogin, setIsLogin] = useState(false)
    // const { updateCurrentUser } = useOutletContext()
    const navigate = useNavigate()
    
    //! User_id and created_at set on the backend
    const formik = useFormik({
        initialValues,
        validationSchema: entrySchema,
        onSubmit: (formData) => {
            fetch("/entries", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                // body: JSON.stringify(formData)
                body: JSON.stringify({
                    title: formData.title,
                    date: formData.date,
                    entry: formData.entry,
                    id_category: formData.category
                })
            }).then((resp) => {
                if (resp.ok) {
                    resp.json()
                        .then(() => navigate('/'))
                        .catch((error) => console.error('Error:', error))
                } else {
                    return resp
                        .json()
                        .then((errorObj) => toast.error(errorObj.message))
                }
            }).catch((error) => console.error('Error:', error))
        }
    })
    
    
    return (
        <div>
			<h2>Create a new journal entry</h2>

			<form onSubmit={formik.handleSubmit}>
                <label>Title</label>
                <input
                    type='text'
                    name='title'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                />
                {formik.errors.title && formik.touched.title && (
                    <div className='error-message show'>
                        {formik.errors.title}
                    </div>
                )}
                <br />
				<label>Date</label>
				<input
                    type='date'
					name='date'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.date}
				/>
				{formik.errors.date && formik.touched.date && (
					<div className='error-message show'>
						{formik.errors.date}
					</div>
				)}
                <br />
                <label>Entry</label>
				<input
                    type='text'
					name='entry'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.entry}
				/>
				{formik.errors.entry && formik.touched.entry && (
					<div className='error-message show'>
						{formik.errors.entry}
					</div>
				)}
                <br />
                <label>Category</label>
                <select
                    name='category'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.category}
                >
                    <option value="" label=""></option>
                    <option value="1" label="Normal">Normal</option>
                    <option value="7" label="Epic">Epic</option>
                    <option value="4" label="False Awakening">False Awakening</option>
                    <option value="8" label="Healing">Healing</option>
                    <option value="2" label="Lucid">Lucid</option>
                    <option value="5" label="Nightmare">Nightmare</option>
                    <option value="6" label="Prophetic">Prophetic</option>
                    <option value="3" label="Recurring">Recurring</option>
                </select>
				{formik.errors.category && formik.touched.category && (
					<div className='error-message show'>
						{formik.errors.category}
					</div>
				)}
                <br />
				<input type='submit' value={'Submit'} />
			</form>
		</div>
	)
}

export default NewEntry