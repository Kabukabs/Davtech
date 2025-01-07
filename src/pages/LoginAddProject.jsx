/*
  This is a React component for the admin login page that allows users to log in using Firebase authentication.
  Upon successful login, the user is redirected to the project addition page. It uses email and password for login.
  Firebase's session persistence is set to browserSessionPersistence, which means the session will last as long as the browser session.
*/

import React, { useState } from "react";  // Import React and useState hook
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";  // Import Firebase auth functions
import { auth } from "../components/CareerForms/firebaseConfig";  // Firebase configuration

// LoginAddProject component definition
const LoginAddProject = () => {
  // States for holding user inputs and error messages
  const [email, setEmail] = useState("");  // State to store email input
  const [password, setPassword] = useState("");  // State to store password input
  const [error, setError] = useState("");  // State to store error messages

  /*
    handleLogin is the function called when the login form is submitted.
    It prevents the default form submission behavior, sets session persistence, and signs in the user with Firebase auth.
    If successful, it redirects the user to the "/projects/add" page.
    If an error occurs, it captures and displays the error message.
  */
  const handleLogin = async (e) => {
    e.preventDefault();  // Prevent default form submission
    console.log("Login button clicked");  // Log to console for debugging

    try {
      // Set Firebase session persistence to browserSessionPersistence
      await setPersistence(auth, browserSessionPersistence);

      // Sign in the user with email and password using Firebase authentication
      await signInWithEmailAndPassword(auth, email, password);

      // Redirect to the project addition page after successful login
      window.location.href = "/projects/add";
    } catch (error) {
      // If there's an error (e.g., invalid credentials), set the error state
      setError(error.message);
    }
  };

  // JSX rendering the login form and error messages
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">  {/* Full-screen centered container */}
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">  {/* Card-like container for the form */}
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Admin Login</h2>  {/* Heading for the login form */}
        
        {/* Form submission triggers handleLogin function */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            {/* Input field for email with two-way data binding using setEmail */}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  // Update email state on change
              placeholder="Email"
              required  // This input is required for form submission
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"  // Styling
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            {/* Input field for password with two-way data binding using setPassword */}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  // Update password state on change
              placeholder="Password"
              required  // This input is required for form submission
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"  // Styling
            />
          </div>
          <button
            type="submit"  // Button to submit the form
            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        
        {/* Error message displayed if login fails */}
        {error && <p className="mt-4 text-sm text-red-600 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default LoginAddProject;