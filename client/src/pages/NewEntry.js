import React, { useState, useContext } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import toast from 'react-hot-toast'
import { object, string } from 'yup'
import { date as yupDate } from 'yup'
import { useFormik } from 'formik'
import { UserContext } from '../context/UserContext'

// Yup entry validation
const entrySchema = object({
	title: string().max(50, 'Title must be 50 characters or less'),
	date: yupDate().required('Date is required.'),
	entry: string()
		.min(10, 'Entry must be at least 10 characters.')
		.max(40000, 'Entry must be 40,000 characters or less')
		.required('Entry is required.'),
	category: string().required('Category is required.')
})

// Formik form setup
const initialValues = {
	title: '',
	date: '',
	body: '',
	category: ''
}

const NewEntry = () => {
	const { user, updateEntries } = useContext(UserContext)
	const [isRecording, setIsRecording] = useState(false)
	const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
	const recognition = new SpeechRecognition()
	recognition.interimResults = true
	recognition.continuous = true

    const handleGoHome = () => {
        navigate('/')
    }

	recognition.onresult = async function (event) {

			if(!event.results[0].isFinal) {
				const transcript = event.results[0][0].transcript
				const newText = formik.values.entry + ' ' + transcript[0].toUpperCase() + transcript.substring(1) + '.'
				formik.setFieldValue('entry', newText)

			} else {
				const transcript = event.results[0][0].transcript
				const newText = formik.values.entry + ' ' + transcript[0].toUpperCase() + transcript.substring(1) + '.'
				formik.setFieldValue('entry', newText)
				recognition.stop()
			}
		}

	recognition.onend = async function (event) {
		// recognition.start()
		console.log(event)
		setIsRecording(false)
	}
	
	const voiceToText = async () => {

		if(!isRecording) {
			setIsRecording(true)
			recognition.start()
		} else {
			setIsRecording(false)
			recognition.stop()
		}
	}

	const navigate = useNavigate()
	const formik = useFormik({
		initialValues,
		validationSchema: entrySchema,
		onSubmit: (formData) => {
			fetch('/entries', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title: formData.title,
					date: formData.date,
					body: formData.entry,
					category_id: parseInt(formData.category),
					user_id: user.id
				})
			})
				.then((resp) => {
					if (resp.ok) {
						return resp.json().then((data) => {

							const updatedEntries = [...user.entries, data]
							updateEntries(updatedEntries)
							navigate('/view')
							toast.success("Entry Submited")
						})
					} else {
						return resp
							.json()
							.then((errorObj) => toast.error(errorObj.message))
					}
				})
		}
	})
	 
	return (
		user ? (
			<>
				<article id='new'>
					<h2>New Journal Entry</h2>
					<form className='new-entry' onSubmit={formik.handleSubmit}>
						<label htmlFor='title'>Title &nbsp;</label>
						<input
							type='text'
							name='title'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.title}
							id = 'title'
							placeholder='Title'
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
						/>
						{formik.errors.date && formik.touched.date && (
							<div className='error-message show'>
								{formik.errors.date}
							</div>
						)}
						<br />
						<label htmlFor='entry'>Entry</label>
						<button type='button' className='record' onClick={voiceToText}>{isRecording ? "Stop" : "Record" }</button>
						<textarea
							type='textarea'
							name='entry'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.entry}
							rows='30'
							cols='100'
							id='entry'
							wrap='soft'
							placeholder="Last night's dream..."
						/>
						{formik.errors.entry && formik.touched.entry && (
							<div className='error-message show'>
								{formik.errors.entry}
							</div>
						)}
						<br />
						<label htmlFor='category'>Category</label>
						<select
							name='category'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.category}>
							<option value='' label=''></option>
							<option value='1' label='Normal'>
								Normal
							</option>
							<option value='7' label='Epic'>
								Epic
							</option>
							<option value='4' label='False Awakening'>
								False Awakening
							</option>
							<option value='8' label='Healing'>
								Healing
							</option>
							<option value='2' label='Lucid'>
								Lucid
							</option>
							<option value='5' label='Nightmare'>
								Nightmare
							</option>
							<option value='6' label='Prophetic'>
								Prophetic
							</option>
							<option value='3' label='Recurring'>
								Recurring
							</option>
						</select>
						{formik.errors.category && formik.touched.category && (
							<div className='error-message show'>
								{formik.errors.category}
							</div>
						)}
						<br />
						<input type='submit' id='submit-new' value={'Add new entry'} />
					</form>
				</article>
			</>
		) : (
			<>
				<div className='entries-error-message entries'>You must be logged in to view this page.</div>
				<button className='error-nav' onClick={handleGoHome}>Go to Login</button>
			</>
		))
}

export default NewEntry
