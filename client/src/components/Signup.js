import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup"; // For form validation
import "../styles/Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  // Define Yup validation schema
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    username: Yup.string().min(3, "Must be at least 3 characters").required("Username is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  // Use Formik to manage form state and submission
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validationSchema,
    validateOnBlur: false, // Disable validation on blur
    validateOnChange: false, // Disable validation on change
    onSubmit: async (values, { setSubmitting, setFieldError, validateForm }) => {
      try {
        const response = await fetch("http://127.0.0.1:5555/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Signup failed");
        }

        const data = await response.json();
        console.log("Signup successful:", data);

        // Redirect to another page after success
        navigate("/weather");
      } catch (err) {
        // Trigger form validation and show errors only after unsuccessful signup
        const errors = await validateForm();
        if (Object.keys(errors).length > 0) {
          console.log("Validation errors:", errors);
        }
        setFieldError("general", err.message); // Show general error message
      } finally {
        setSubmitting(false); // Re-enable the form
      }
    },
  });

  return (
    <div className="signup-container">
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

      <form className="signup-form" onSubmit={formik.handleSubmit}>
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Enter an e-mail"
            className="input-field"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && formik.touched.email && <p className="error-text">{formik.errors.email}</p>}
        </div>
        <div className="input-group">
          <input
            type="text"
            name="username"
            placeholder="Create a username"
            className="input-field"
            value={formik.values.username}
            onChange={formik.handleChange}
          />
          {formik.errors.username && formik.touched.username && <p className="error-text">{formik.errors.username}</p>}
        </div>
        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            className="input-field"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.touched.password && <p className="error-text">{formik.errors.password}</p>}
        </div>
        {formik.errors.general && <p style={{ color: "red" }}>{formik.errors.general}</p>}

        <div className="button-group">
          <button type="submit" className="btn signup-btn" disabled={formik.isSubmitting}>
            {formik.isSubmitting ? "Submitting..." : "Sign Up"}
          </button>
          <Link to="/home" className="btn back-btn">
            Go Back
          </Link>
        </div>
        <div className="checkbox-group">
          <label>
            <input type="checkbox" />
            Subscribe to weather alerts to your e-mail
          </label>
          <label>
            <input type="checkbox" />
            Subscribe to our weekly newsletter
          </label>
        </div>
      </form>
      <p className="tagline">for when you just need the weather</p>
    </div>
  );
};

export default Signup;
