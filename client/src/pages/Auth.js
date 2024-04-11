import { useContext, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import toast from 'react-hot-toast'
import * as Yup from 'yup'
import YupPassword from 'yup-password'
import { object, string } from 'yup'
import { useFormik } from 'formik'
import { UserContext } from '../context/UserContext'

YupPassword(Yup)

// Signup
const signupSchema = object({
	username: string()
		.min(3, 'Username must be at least 3 characters long.')
		.max(20, 'Username must be 20 characters or less.')
		.required('Username is required.'),
	// Check password requirements
	password: string()
		.min(8, 'Password must be at least 8 characters long.')
		// .matches(/[a-zA-Z0-9]/, "Password should contain letters and numbers.")
		.minLowercase(1, 'Password must contain at least 1 lowercase letter.')
		.minUppercase(1, 'Password must contain at least 1 uppercase letter.')
		.minNumbers(1, 'Password must contain at least 1 number.')
		.minSymbols(1, 'Password must contain at least 1 special character.')
		.required('Password is required.')
})

// Login
const loginSchema = object({
	username: string().required('Username is required.'),
	// Add additional password requirements
	password: string()
		.min(8, 'Password must be at least 8 characters long.')
		// .matches(/[a-zA-Z0-9]/, "Password can only contain letters and numbers.")
		.required('Password is required.')
})

const initialValues = {
	username: '',
	password: ''
}

const Auth = () => {
    const { user } = useContext(UserContext)
	const { setUser } = useOutletContext()
	const [formStatus, setformStatus] = useState('')
    const navigate = useNavigate()
	const requestUrl = user ? '/login' : '/signup'

	const formik = useFormik({
		initialValues,
		validationSchema: user ? loginSchema : signupSchema,
		onSubmit: (formData) => {
			fetch(requestUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			}).then((res) => {
				if (res.ok) {
					res.json()
						.then(setUser)
						.then(() => navigate('/'))
				} else {
					return res
						.json()
						.then((errorObj) => toast.error(errorObj.message))
				}
			})
		}
	})

	return (
		<div className='auth'>
			<h2>Sign up or log in to get started</h2>
			<button onClick={() => setUser((currentState) => !currentState)}>{user ? 'Sign up' : 'Login'}</button>

			<form onSubmit={formik.handleSubmit}>
				{!user && (
					<>
						<label>Username </label>
						<input
							type='text'
							name='username'
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.username}
						/>
						{formik.errors.username && formik.touched.username && (
							<div className='error-message show'>
								{formik.errors.username}
							</div>
						)}
					</>
				)}
				<label>Password </label>
				<input
					type='password'
					name='password'
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					value={formik.values.password}
				/>
				{formik.errors.password && formik.touched.password && (
					<div className='error-message show'>
						{formik.errors.password}
					</div>
				)}
				<input type='submit' value={user ? 'Login' : 'Sign up'} />
			</form>
		</div>
)}

export default Auth
