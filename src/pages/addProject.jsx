/**
 * AddProject Component:
 * This component allows users to add new projects to a Firebase Firestore database. It includes a form with fields for project details, compensation, social media links, vision & mission, contributors, and job roles.
 * - Uses Firebase for database interaction and authentication.
 * - Handles form input changes, array additions, and form submission.
 * - Manages the state using the useState hook for various sections of the form.
 */

import { useState } from 'react';
import { db } from '../components/CareerForms/firebaseConfig'; // Firebase configuration
import { collection, addDoc } from 'firebase/firestore'; // Firestore database functions
import { useNavigate } from 'react-router-dom'; // For navigating between pages
import { useAuth } from '../lib/context/auth.context'; // Custom authentication hook
import { signOut } from "firebase/auth"; // Firebase authentication functions
import { auth } from "../components/CareerForms/firebaseConfig"; // Firebase authentication configuration

// AddProject component for adding a new project
export const AddProject = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    name: '', // Project name
    category: '', // Project category
    start_date: '', // Start date of the project
    progress: '', // Progress status of the project
    compensation: { // Compensation details
      title: '',
      description: '',
    },
    overview: { // Overview of the project
      profile: '',
      vision_mission: [], // Vision and mission statements
      social_links: { // Social media links
        linkedin: '',
        telegram: '',
        twitter: '',
      },
      contributors: [], // List of contributors
      jobs: [], // Job roles
    },
  });

  const navigate = useNavigate(); // Used to navigate to other routes
  const { user } = useAuth(); // Get the authenticated user from the custom auth hook

  /**
   * Handles changes in the form fields, including the nested 'overview' object.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Check if the field belongs to the 'overview' object
    if (name.startsWith('overview.')) {
      const field = name.split('.')[1]; // Extract field name from overview object
      setFormData((prevData) => ({
        ...prevData,
        overview: {
          ...prevData.overview,
          [field]: value, // Update the specific field in the overview object
        },
      }));
    } else {
      // For other top-level form fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  /**
   * Handles changes in the social links section of the overview.
   */
  const handleOverviewChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      overview: {
        ...prevData.overview,
        social_links: {
          ...prevData.overview.social_links,
          [name]: value,
        },
      },
    }));
  };

  /**
   * Handles changes in the compensation section.
   */
  const handleCompensationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      compensation: { ...prevData.compensation, [name]: value },
    }));
  };

  /**
   * Adds a new entry to an array field (like vision_mission, contributors, or jobs) in the form.
   */
  const handleAddToArray = (name) => {
    setFormData((prevData) => ({
      ...prevData,
      overview: {
        ...prevData.overview,
        [name]: [...prevData.overview[name], {}], // Adds a new object to the array
      },
    }));
  };

  /**
   * Handles updates in array fields like vision_mission and contributors.
   */
  const handleArrayChange = (e, index, name) => {
    const { name: key, value } = e.target;
    const updatedArray = formData.overview[name].map((item, i) =>
      i === index ? { ...item, [key]: value } : item
    );
    setFormData((prevData) => ({
      ...prevData,
      overview: {
        ...prevData.overview,
        [name]: updatedArray,
      },
    }));
  };

  /**
   * Handles changes in the tasks assigned to a specific contributor.
   */
  const handleTaskChange = (e, contributorIndex, taskIndex) => {
    const { value } = e.target;
    const updatedContributors = formData.overview.contributors.map((contributor, i) =>
      i === contributorIndex
        ? {
            ...contributor,
            tasks: contributor.tasks.map((task, j) =>
              j === taskIndex ? value : task
            ),
          }
        : contributor
    );
    setFormData((prevData) => ({
      ...prevData,
      overview: {
        ...prevData.overview,
        contributors: updatedContributors,
      },
    }));
  };

  /**
   * Adds a new task to a contributor.
   */
  const handleAddTask = (contributorIndex) => {
    const updatedContributors = formData.overview.contributors.map((contributor, i) =>
      i === contributorIndex
        ? { ...contributor, tasks: [...(contributor.tasks || []), ''] }
        : contributor
    );
    setFormData((prevData) => ({
      ...prevData,
      overview: {
        ...prevData.overview,
        contributors: updatedContributors,
      },
    }));
  };

  /**
   * Submits the form data and adds a new project to Firestore.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // If no user is authenticated, redirect to login page
    if (!user) {
      navigate('/loginAddProject');
      return;
    }

    try {
      await addDoc(collection(db, 'projects'), {
        ...formData,
        userId: user.uid, // Save the user ID with the project
      });
      navigate('/projects'); // Redirect to projects page after successful submission
    } catch (error) {
      console.error('Error adding project:', error); // Handle any errors during submission
    }
  };

  /**
   * Logs out the authenticated user.
   */
  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase sign out function
      navigate("/login");  // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out:", error); // Handle logout errors
    }
  };

  /**
   * Redirects the user to the dashboard page.
   */
  const handleDashboard = () => {
    try {
      navigate("/projects/dashboard");  // Redirect to dashboard page
    } catch (error) {
      console.error("Error navigating to dashboard:", error); // Handle navigation errors
    }
  };  
  
  /**
   * Handles changes in the development roadmap stage and updates the image.
   */
  const handleRoadmapChange = (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      development_roadmap: value,
    }));
  };

  return (
    <div>
      {/* Header with Logout and Dashboard buttons */}
      <div className="flex justify-between items-center w-full px-4">
        <button 
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full ml-3"
        >
          Logout
        </button>
        <button 
          onClick={handleDashboard}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full ml-3"
        >
          Dashboard
        </button>
      </div>
      
      {/* Main form for adding a new project */}
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Add New Project</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Basic project details */}
            <label className="block">Project Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Project Name"
              required
              className="border border-gray-300 p-2 rounded"
            />

        <label className="block">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded"
          >
            <option value="">Select Category</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Future">Future</option>
            <option value="Completed">Completed</option>
          </select>
          <label className="block">Start Date</label>
          <input
            type="date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
            className="border border-gray-300 p-2 rounded"
          />
          <label className="block">Progress</label>
          <input
            type="text"
            name="progress"
            value={formData.progress}
            onChange={handleChange}
            placeholder="Progress"
            required
            className="border border-gray-300 p-2 rounded"
          />

          {/* Compensation */}
          <label className="block">Compensation Title</label>
          <input
            type="text"
            name="title"
            value={formData.compensation.title || ''}
            onChange={handleCompensationChange}
            className="border border-gray-300 w-full p-2 rounded"
            placeholder="Compensation plan"
          />

          <label className="block">Compensation Description</label>
          <textarea
            name="description"
            value={formData.compensation.description || ''}
            onChange={handleCompensationChange}
            className="border w-full border-gray-300 p-2 rounded mt-2"
            placeholder="Describe the compensation"
          ></textarea>

          {/* Development Roadmap */}
          <label className="block">Development Roadmap Stage</label>
          <select
            name="development_roadmap"
            value={formData.development_roadmap || ''}
            onChange={handleRoadmapChange}
            className="border w-full border-gray-300 p-2 rounded mt-2"
          >
            <option value="">Select a stage</option>
            <option value="idea">Idea</option>
            <option value="design">Design</option>
            <option value="development">Development</option>
            <option value="testing">Testing</option>
            <option value="deployment">Deployment</option>
          </select>

          {/* Overview section */}
          <label className="block">Project Overview</label>
          <textarea
            name="overview.profile"
            value={formData.overview.profile}
            onChange={handleChange}
            placeholder="Project Overview"
            required
            className="border border-gray-300 p-2 rounded"
          />

          {/* Vision & Mission */}
          <div>
            <label>Vision & Mission</label>
            <br />
            {formData.overview.vision_mission.map((item, index) => (
              <textarea
                key={index}
                name="text" // Use 'text' as the key in your array item
                value={item.text || ''}
                onChange={(e) => handleArrayChange(e, index, 'vision_mission')}
                placeholder={`Vision/Mission ${index + 1}`}
                className="border w-full border-gray-300 p-2 rounded mt-2"
              />
            ))}
            <br />
            <button
              type="button"
              onClick={() => handleAddToArray('vision_mission')}
              className="bg-blue-500 text-blue p-2 rounded mt-2"
            >
              Add Vision/Mission
            </button>
          </div>

          {/* Social Links */}
          <div>
            <label>Social Links</label>
            <br />
            <input
              type="text"
              name="linkedin"
              value={formData.overview.social_links.linkedin}
              onChange={handleOverviewChange}
              placeholder="LinkedIn URL"
              className="border w-full border-gray-300 p-2 rounded mb-2"
            />
            <input
              type="text"
              name="telegram"
              value={formData.overview.social_links.telegram}
              onChange={handleOverviewChange}
              placeholder="Telegram URL"
              className="border w-full border-gray-300 p-2 rounded mb-2"
            />
            <input
              type="text"
              name="twitter"
              value={formData.overview.social_links.twitter}
              onChange={handleOverviewChange}
              placeholder="Twitter URL"
              className="border w-full border-gray-300 p-2 rounded mb-2"
            />
          </div>

          {/* Contributors */}
          <div>
            <label>Contributors</label>
            {formData.overview.contributors.map((item, index) => (
              <div key={index}>
                <input
                  name="name"
                  type="text"
                  value={item.name || ''}
                  onChange={(e) => handleArrayChange(e, index, 'contributors')}
                  placeholder="Contributor Name"
                  className="border w-full border-gray-300 p-2 rounded mt-2"
                />
                <input
                  name="role"
                  type="text"
                  value={item.role || ''}
                  onChange={(e) => handleArrayChange(e, index, 'contributors')}
                  placeholder="Contributor Role"
                  className="border w-full border-gray-300 p-2 rounded mt-2"
                />

                {/* Tasks */}
                <div>
                  <label>Tasks</label>
                  {item.tasks?.map((task, taskIndex) => (
                    <input
                      key={taskIndex}
                      type="text"
                      value={task}
                      onChange={(e) =>
                        handleTaskChange(e, index, taskIndex)
                      }
                      placeholder={`Task ${taskIndex + 1}`}
                      className="border w-full border-gray-300 p-2 rounded mt-2"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => handleAddTask(index)}
                    className="bg-blue-500 text-blue p-2 rounded mt-2"
                  >
                    Add Task
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddToArray('contributors')}
              className="bg-blue-500 text-blue p-2 rounded mt-2"
            >
              Add Contributor
            </button>
          </div>

          {/* Jobs */}
          <div>
            <label>Jobs</label>
            <br />
            {formData.overview.jobs.map((item, index) => (
              <div key={index}>
                <input
                  name="job_title"
                  type="text"
                  value={item.job_title || ''}
                  onChange={(e) => handleArrayChange(e, index, 'jobs')}
                  placeholder="Job Title"
                  className="border w-full border-gray-300 p-2 rounded mt-2"
                />
                <textarea
                  name="job_description"
                  value={item.job_description || ''}
                  onChange={(e) => handleArrayChange(e, index, 'jobs')}
                  placeholder="Job Description"
                  className="border w-full border-gray-300 p-2 rounded mt-2"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddToArray('jobs')}
              className="bg-blue-500 text-blue p-2 rounded mt-2"
            >
              Add Job
            </button>
          </div>

            {/* Submit button */}
            <button
              type="submit"
              className="bg-green-500 text-white p-2 rounded mt-4"
            >
              Submit Project
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
