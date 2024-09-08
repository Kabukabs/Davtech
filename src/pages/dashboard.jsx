import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../components/CareerForms/firebaseConfig";  // Adjust the path as necessary
import { Projects } from "../components/dashboard/projects";
import { Navigate, useNavigate } from "react-router-dom";  // Assuming you're using React Router

export const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  // Hook to programmatically navigate

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" />;  // Redirect to login if not authenticated
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");  // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <div>
        <button 
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full ml-3"
        >
          Logout
        </button>
      </div>
      <Projects />
    </>
  );
};
