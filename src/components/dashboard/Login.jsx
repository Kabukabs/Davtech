/**
 * Login Component
 * 
 * This component handles user login functionality using Firebase Authentication. 
 * It provides a form for users to input their email and password, authenticates the user upon submission, 
 * and redirects them to the dashboard if authentication is successful.
 * 
 * Key Features:
 * - Utilizes Firebase's `signInWithEmailAndPassword` for authentication.
 * - Implements session persistence with `browserSessionPersistence`.
 * - Redirects to a specific route using `useNavigate` from `react-router-dom`.
 * - Displays error messages if authentication fails.
 */

import React, { useState } from "react";
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from "../CareerForms/firebaseConfig"; // Firebase configuration file
import { useNavigate } from 'react-router-dom'; // For redirecting upon successful login

const Login = () => {
  // State hooks to manage email, password, and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // useNavigate hook for redirection

  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    try {
      // Set the session persistence to browser session (clears on tab close)
      await setPersistence(auth, browserSessionPersistence);
      
      // Authenticate the user with Firebase using email and password
      await signInWithEmailAndPassword(auth, email, password);

      // Redirect the user to the dashboard upon successful login
      navigate("/projects/dashboard"); 
    } catch (error) {
      // If there's an error (e.g., wrong credentials), set the error message
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Admin Login</h2>
        
        {/* Login form with email and password inputs */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          {/* Submit button to trigger login */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
        </form>
        
        {/* Display error message if login fails */}
        {error && <p className="mt-4 text-sm text-red-600 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
