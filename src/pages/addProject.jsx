import { useState } from 'react';
import { db } from '../components/CareerForms/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/context/auth.context';

export const AddProject = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    start_date: '',
    progress: '',
    compensation: {
      title: '',
      description: '',
    },
    overview: {
      profile: '',
      vision_mission: [],
      social_links: {
        linkedin: '',
        telegram: '',
        twitter: '',
      },
      contributors: [],
      jobs: [],
    },
  });

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Check if the field is part of the overview object
    if (name.startsWith('overview.')) {
      const field = name.split('.')[1]; // Get the specific field in the overview object (e.g., profile, vision_mission, etc.)
      
      setFormData((prevData) => ({
        ...prevData,
        overview: {
          ...prevData.overview,
          [field]: value, // Update the corresponding field in the overview object
        },
      }));
    } else {
      // For other top-level fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

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

  const handleCompensationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      compensation: { ...prevData.compensation, [name]: value },
    }));
  };

  const handleAddToArray = (name) => {
    setFormData((prevData) => ({
      ...prevData,
      overview: {
        ...prevData.overview,
        [name]: [...prevData.overview[name], {}],
      },
    }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate('/loginAddProject');
      return;
    }

    try {
      await addDoc(collection(db, 'projects'), {
        ...formData,
        userId: user.uid,
      });
      navigate('/projects');
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
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

          {/* Overview section */}
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

          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded mt-4"
          >
            Submit Project
          </button>
        </form>
      </div>
    </div>
  );
};
