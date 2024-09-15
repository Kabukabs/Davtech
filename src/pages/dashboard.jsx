/*
  This is a React component for a user dashboard. It checks if a user is authenticated using Firebase authentication.
  If the user is logged in, it displays the dashboard content, including options to log out or add a new project.
  If the user is not logged in, it redirects them to the login page.
*/

import React, { useEffect, useState } from "react";  // Importing hooks from React
import { onAuthStateChanged, signOut } from "firebase/auth";  // Importing Firebase auth functions
import { auth } from "../components/CareerForms/firebaseConfig";  // Firebase configuration
import { Projects } from "../components/dashboard/projects";  // Importing the Projects component
import { Navigate, useNavigate } from "react-router-dom";  // Importing navigation from React Router

// Dashboard component definition
export const Dashboard = () => {
  // State to hold the authenticated user object and loading state
  const [user, setUser] = useState(null);  // Initialize user state to null
  const [loading, setLoading] = useState(true);  // Loading state to show while checking authentication
  const navigate = useNavigate();  // Hook to programmatically navigate between routes

  /*
    useEffect hook to check the user's authentication status.
    onAuthStateChanged listens for changes in the user's sign-in state.
    It updates the user state if authenticated and stops loading.
  */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);  // Update the user state with the current user
      setLoading(false);  // Stop the loading state
    });
    return () => unsubscribe();  // Cleanup the listener on unmount
  }, []);

  // If loading, display a simple loading message
  if (loading) {
    return <p>Loading...</p>;
  }

  // If no user is authenticated, redirect to the login page
  if (!user) {
    return <Navigate to="/login" />;  // Navigate to login if the user is not authenticated
  }

  /*
    Function to handle logout. It signs out the user using Firebase's signOut function.
    After signing out, it redirects the user to the login page.
  */
  const handleLogout = async () => {
    try {
      await signOut(auth);  // Sign out the user
      navigate("/login");  // Redirect to login after successful logout
    } catch (error) {
      console.error("Error logging out:", error);  // Handle logout errors
    }
  };

  /*
    Function to handle adding a new project. It temporarily signs out and redirects
    the user to the project addition page.
  */
  const handleAddProject = async () => {
    try {
      await signOut(auth);  // Sign out the user (if necessary for the flow)
      navigate("/projects/add");  // Redirect to add project page
    } catch (error) {
      console.error("Error logging out:", error);  // Handle errors during redirection
    }
  };

  // JSX rendering the dashboard interface, including buttons for logging out and adding projects
  return (
    <>
      <div className="flex justify-around w-screen">  {/* Flex container for buttons */}
        <button 
          onClick={handleLogout}  // Attach handleLogout to the logout button
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full ml-3"
        >
          Logout
        </button>
        <button 
          onClick={handleAddProject}  // Attach handleAddProject to the add project button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full ml-3"
        >
          Add Project
        </button>
      </div>
      <Projects />  {/* Renders the Projects component */}
    </>
  );
};