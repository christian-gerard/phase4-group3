import { useContext, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import toast, {Toaster} from 'react-hot-toast'
import * as Yup from 'yup'
import YupPassword from 'yup-password'
import { object, string } from 'yup'
import { Formik, Form, Field, useFormik } from 'formik'
import { UserContext } from '../../context/UserContext'

YupPassword(Yup)

// Signup
const signupSchema = object({
	username: string()
		.min(3, 'Username must be at least 3 characters long.')
		.max(20, 'Username must be 20 characters or less.')
		.required('Username is required.'),

	_password_hash: string()
		.min(8, 'Password must be at least 8 characters long.')
		.matches(/[a-zA-Z0-9]/, 'Password should contain letters and numbers.')
		.minLowercase(1, 'Password must contain at least 1 lowercase letter.')
		.minUppercase(1, 'Password must contain at least 1 uppercase letter.')
		.minNumbers(1, 'Password must contain at least 1 number.')
		.minSymbols(1, 'Password must contain at least 1 special character.')
		.required('Password is required.'),

	confirmPassword: string()
		.oneOf([Yup.ref('_password_hash'), null], 'Passwords must match.')
		.required('Confirm Password is required.')
})

// Login
const loginSchema = object({
	username: string().required('Username is required.'),
	// Add additional password requirements
	_password_hash: string()
		.min(8, 'Password must be at least 8 characters long.')
		.matches(
			/[a-zA-Z0-9]/,
			'Password can only contain letters and numbers.'
		)
		.required('Password is required.')
})

const initialValues = {
	username: '',
	_password_hash: '',
	confirmPassword: ''
}

const Auth = () => {
    const { user, login, logout } = useContext(UserContext)
	const [isLogin, setIsLogin] = useState(true)
    const navigate = useNavigate()
    
	const requestUrl = isLogin ? '/login' : '/signup'

	const handleIsLogin = () => {
		setIsLogin(!isLogin)
	}

	const formik = useFormik({
		initialValues,
		validationSchema: isLogin ? loginSchema : signupSchema,
		onSubmit: (formData) => {
			console.log(formData)
			fetch(requestUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			})
			.then((res) => {
				if (res.ok) {
					res.json()
					.then((userData) => {
						login(userData)
					})
					.then(() => {
						isLogin ? navigate('/view') : navigate('/new')
						toast.success("Logged in")
					})
					console.log(user)
				} else if (res.status === 422) {
						toast.error('Invalid Login')
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
			<Formik onSubmit={formik.handleSubmit}>
				<Form className='form' onSubmit={formik.handleSubmit}>
					<Field
						type='text'
						name='username'
						placeholder='Username'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.username}
						className='input'
						/>
					{formik.errors.username && formik.touched.username && (
						<div className='error-message show'>
							{formik.errors.username}
						</div>
					)}
					<Field
						type='password'
						name='_password_hash'
						placeholder='Password'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values._password_hash}
						className='input'
						/>
					{formik.errors._password_hash && formik.touched._password_hash && (
						<div className='error-message show'>
							{formik.errors._password_hash}
						</div>
					)}
					{!isLogin && (
						<>
							<Field
								type='password'
								name='confirmPassword'
								placeholder='Confirm Password'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.confirmPassword}
								className='input'
								/>
							{formik.errors.confirmPassword &&
								formik.touched.confirmPassword && (
									<div className='error-message show'>
										{formik.errors.confirmPassword}
									</div>
								)}
						</>
					)}
				<input type='submit' className='submit' value={isLogin ? 'Login' : 'Sign up'} />
				<button type='button' className='change-form' onClick={handleIsLogin }>SWITCH : {isLogin ? 'Sign up' : 'Login'}</button>
				</Form>
			</Formik>
		</div>
)}

export default Auth
