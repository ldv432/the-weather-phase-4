import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import * as Yup from "yup" 
import "../styles/Login.css"
import toast from "react-hot-toast"

const Login = ( { updateCurrentUser } ) => {
  const navigate = useNavigate()

  // Define Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^(?=.*[A-Z])(?=.*\W).{10,}$/,
        "Password constraints: 10 characters, 1 uppercase, and 1 symbol."
      )
      .required("Password is required"),
  })
  

  // Use Formik for form management
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const response = await fetch("/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        })

        if (!response.ok) {
          throw new Error("Invalid email or password")
        }

        const data = await response.json()
        toast.success("Welcome to the weather!")
        updateCurrentUser(data)

        navigate("/weather")

      } catch (err) {
        setFieldError("general", err.message) 
      } finally {
        setSubmitting(false) 
      }
    },
  })

  return (
    <div className="login-container">
      {/* Title and Tagline */}
      <h1 className="title">
        THE <span className="highlight">WEATHER</span>
      </h1>
      <div className="weather-icons">
        <i className="wi wi-day-fog"></i>
        <i className="wi wi-day-rain"></i>
        <i className="wi wi-day-sunny"></i>
        <i className="wi wi-day-showers"></i>
        <i className="wi wi-windy"></i>
      </div>
      {/* Login Form */}
      <form className="login-form" onSubmit={formik.handleSubmit}>
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className={`input-field ${formik.errors.email && formik.touched.email ? "input-error" : ""}`}
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="error-text">{formik.errors.email}</p>
          )}
          <p className="helper-text">
            Don't have an account? <Link to="/signup">Click here to sign up</Link>
          </p>
        </div>
        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className={`input-field ${formik.errors.password && formik.touched.password ? "input-error" : ""}`}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <p className="error-text">{formik.errors.password}</p>
          )}
          <p className="helper-text">
            <Link to="/reset-password">Click here to change your password</Link>
          </p>

          
        </div>
        {formik.errors.general && <p className="error-text">{formik.errors.general}</p>}
        <div className="button-group">
          <button type="submit" className="btn login-btn" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Logging In..." : "Log In"}
          </button>
          <Link to="/home" className="btn back-btn">
            Go Back
          </Link>
        </div>
        <p className="tagline">for when you just need the weather</p>
      </form>
    </div>
  )
}

export default Login
