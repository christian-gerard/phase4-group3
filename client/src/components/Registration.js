import React, { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import toast from "react-hot-toast"
import { object, string } from 'yup';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { useFormik } from 'formik';

YupPassword(Yup)

// Yup signup validation
const signupSchema = object({
    username: string()
        .min(3, "Username must be at least 3 characters long.")
        .max(20, "Username must be 20 characters or less.")
        .required("Username is required."),
    // Check password requirements
    password: string()
        .min(8, "Password must be at least 8 characters long.")
        // .matches(/[a-zA-Z0-9]/, "Password can only contain letters and numbers.")
        .minLowercase(1, "Password must contain at least 1 lowercase letter.")
        .minUppercase(1, "Password must contain at least 1 uppercase letter.")
        .minNumbers(1, "Password must contain at least 1 number.")
        .minSymbols(1, "Password must contain at least 1 special character.")
        .required("Password is required.")
});

// Yup login validation
const loginSchema = object({
    username: string().required("Username is required."),
    // Add additional password requirements
    password: string()
        .min(8, "Password must be at least 8 characters long.")
        // .matches(/[a-zA-Z0-9]/, "Password can only contain letters and numbers.")
        .required("Password is required.")
});

// Formik form setup
const initialValues = {
    username: "",
    password: ""
}
const Registration = () => {
    const [isLogin, setIsLogin] = useState(false);
    const {updateCurrentUser} = useOutletContext()
    const navigate = useNavigate()
    const requestUrl = isLogin ? "/login" : "/signup"
    const formik = useFormik({
        initialValues,
        validationSchema: isLogin ? loginSchema : signupSchema,
        onSubmit: (formData) => {
            fetch(requestUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then(resp => {
                if (resp.ok) {
                    resp.json()
                    .then(updateCurrentUser)
                    .then(() => navigate("/"))
                } else {
                    return resp
                    .json()
                    .then((errorObj) => toast.error(errorObj.message));
                }
            })
        }
    })

    return (
        <div>
            <h2>Sign up or log in to get started</h2>
            {/* <h3>{isLogin ? "Not a member?" : "Already signed up?"}</h3> */}
            <button onClick={() => setIsLogin((currentState) => !currentState)}>
            {isLogin ? "Sign up" : "Login"}
            </button>

            <Form onSubmit={formik.handleSubmit}>
            {!isLogin && (
                <>
                    <label>Username </label>
                    <input
                        type="text"
                        name="username"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.username}
                    />
                    {formik.errors.username && formik.touched.username && (
                        <div className="error-message show">{formik.errors.username}</div>
                    )}
                </>
                )}
            <label>Password </label>
            <input
                type="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
            />
            {formik.errors.password && formik.touched.password && (
                <div className="error-message show">{formik.errors.password}</div>
            )}

            <input type="submit" value={isLogin ? "Login" : "Sign up"} />
            
            </Form>
        </div>
    );
}

export default Registration