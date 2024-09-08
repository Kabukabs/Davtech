import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { db } from '/src/components/CareerForms/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export const EditModal = ({ projectId, formData, setFormData, onClose }) => {
  const [localFormData, setLocalFormData] = useState({
    name: '',
    category: '',
    compensation: [],
    progress: '',
    start_date: '',
    overview: {
      profile: '',
      vision_mission: [],
      contributors: [],
      social_links: {
        linkedin: '',
        telegram: '',
        twitter: '',
      },
      jobs: [],
    },
    ...formData,
  });  

  useEffect(() => {
    const fetchProjectData = async () => {
      if (projectId) {
        try {
          const projectRef = doc(db, 'projects', projectId);
          const projectSnap = await getDoc(projectRef);
          if (projectSnap.exists()) {
            const projectData = projectSnap.data();
            setLocalFormData(projectData);
          } else {
            console.log('No such document!');
          }
        } catch (error) {
          console.error('Error fetching project data: ', error);
        }
      }
    };

    fetchProjectData();
  }, [projectId]);

  useEffect(() => {
    setLocalFormData((prevData) => ({ ...prevData, ...formData }));
  }, [formData]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const projectRef = doc(db, 'projects', projectId);
      await updateDoc(projectRef, localFormData);
      setFormData(localFormData); // Update parent formData after save
      if (typeof onClose === 'function') onClose(); // Ensure onClose is a function before calling it
      window.location.reload(); // Reload the page to reflect the updates
    } catch (error) {
      console.error('Error updating project: ', error);
    }
  };

  const handleCompensationChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
      ...prevData,
      compensation: { ...prevData.compensation, [name]: value },
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Check if the field is part of the overview object
    if (name.startsWith('overview.')) {
      const field = name.split('.')[1]; // Get the specific field in the overview object (e.g., profile, vision_mission, etc.)
      
      setLocalFormData((prevData) => ({
        ...prevData,
        overview: {
          ...prevData.overview,
          [field]: value, // Update the corresponding field in the overview object
        },
      }));
    } else {
      // For other top-level fields
      setLocalFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  const handleTaskChange = (e, contributorIndex, taskIndex) => {
    const { value } = e.target;
    setLocalFormData((prevData) => {
      const updatedContributors = [...prevData.overview.contributors];
      const updatedTasks = [...updatedContributors[contributorIndex].tasks];
      updatedTasks[taskIndex] = value;
      updatedContributors[contributorIndex].tasks = updatedTasks;
      return { ...prevData, overview: { ...prevData.overview, contributors: updatedContributors } };
    });
  };

  const handleAddTask = (contributorIndex) => {
    setLocalFormData((prevData) => {
      const updatedContributors = [...prevData.overview.contributors];
      updatedContributors[contributorIndex].tasks = [
        ...(updatedContributors[contributorIndex].tasks || []),
        '',
      ];
      return { ...prevData, overview: { ...prevData.overview, contributors: updatedContributors } };
    });
  };

  const handleArrayChange = (e, index, name, subField = null) => {
    const { value } = e.target;
    setLocalFormData((prevData) => {
      let updatedArray;

      if (name.includes('.')) {
        const [parentField, childField] = name.split('.');
        updatedArray = [...(prevData[parentField][childField] || [])];
        if (subField) {
          updatedArray[index] = { ...updatedArray[index], [subField]: value };
        } else {
          updatedArray[index] = value;
        }
        return {
          ...prevData,
          [parentField]: {
            ...prevData[parentField],
            [childField]: updatedArray,
          },
        };
      } else {
        updatedArray = [...(prevData[name] || [])];
        if (subField) {
          updatedArray[index] = { ...updatedArray[index], [subField]: value };
        } else {
          updatedArray[index] = value;
        }
        return { ...prevData, [name]: updatedArray };
      }
    });
  };

  const handleAddToArray = (name) => {
    setLocalFormData((prevData) => {
      const newItem = name === 'overview.contributors' ? { name: '', role: '', tasks: [] } : '';
      if (name.includes('.')) {
        const [parentField, childField] = name.split('.');
        return {
          ...prevData,
          [parentField]: {
            ...prevData[parentField],
            [childField]: [...(prevData[parentField][childField] || []), newItem],
          },
        };
      } else {
        return {
          ...prevData,
          [name]: [...(prevData[name] || []), newItem],
        };
      }
    });
  };

  const handleRemoveFromArray = (name, index) => {
    setLocalFormData((prevData) => {
      if (name.includes('.')) {
        const [parentField, childField] = name.split('.');
        const updatedArray = [...prevData[parentField][childField]];
        updatedArray.splice(index, 1);
        return {
          ...prevData,
          [parentField]: {
            ...prevData[parentField],
            [childField]: updatedArray,
          },
        };
      } else {
        const updatedArray = [...prevData[name]];
        updatedArray.splice(index, 1);
        return { ...prevData, [name]: updatedArray };
      }
    });
  };

  const handleOverviewChange = (e) => {
    const { name, value } = e.target;
    setLocalFormData((prevData) => ({
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[500px] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Project</h2>
        <form onSubmit={handleEdit}>
          {/* Project Name */}
          <label className="block font-semibold">Project Name</label>
          <input
            type="text"
            name="name"
            value={localFormData.name || ''}
            onChange={handleChange}
            className="border w-full border-gray-300 p-2 rounded mt-2"
          />

          {/* Category */}
          <label className="block font-semibold">Category</label>
          <input
            type="text"
            name="category"
            value={localFormData.category || ''}
            onChange={handleChange}
            className="border w-full border-gray-300 p-2 rounded mt-2"
          />

          {/* Compensation */}
          <label className="block font-semibold">Compensation Title</label>
          <input
            type="text"
            name="title"
            value={localFormData.compensation.title || ''}
            onChange={handleCompensationChange}
            className="border border-gray-300 w-full p-2 rounded"
            placeholder="Compensation plan"
          />

          <label className="block font-semibold">Compensation Description</label>
          <textarea
            name="description"
            value={localFormData.compensation.description || ''}
            onChange={handleCompensationChange}
            className="border w-full border-gray-300 p-2 rounded mt-2"
            placeholder="Describe the compensation"
          ></textarea>

          {/* Progress */}
          <label className="block font-semibold">Progress</label>
          <input
            type="text"
            name="progress"
            value={localFormData.progress || ''}
            onChange={handleChange}
            className="border w-full border-gray-300 p-2 rounded mt-2"
          />

          {/* Start Date */}
          <label className="block font-semibold">Start Date</label>
          <input
            type="date"
            name="start_date"
            value={localFormData.start_date || ''}
            onChange={handleChange}
            className="border w-full border-gray-300 p-2 rounded mt-2"
          />

          {/* Project Overview */}
          <label className="block font-semibold">Project Overview</label>
          <textarea
            name="overview.profile"
            value={localFormData.overview.profile || ''}
            onChange={handleChange}
            className="border w-full border-gray-300 p-2 rounded mt-2"
          />

          {/* Vision & Mission */}
          <div>
            <label className="block font-semibold">Vision & Mission</label>
            {(localFormData.overview.vision_mission || []).map((item, index) => (
              <div key={index} className="border p-2 mt-2 rounded">
                <textarea
                  value={item.text || ''} // Extract the 'text' property
                  onChange={(e) =>
                    handleArrayChange(e, index, 'overview.vision_mission', 'text') // Update only the 'text' property
                  }
                  placeholder={`Vision/Mission ${index + 1}`}
                  className="border w-full border-gray-300 p-2 rounded mt-2"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFromArray('overview.vision_mission', index)}
                  className="bg-red-500 text-white p-2 rounded mt-2"
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddToArray('overview.vision_mission')}
              className="bg-blue-500 text-blue p-2 rounded mt-2"
            >
              Add Vision/Mission
            </button>
          </div>

          {/* Social Links */}
          <div>
            <label className="block font-semibold">Social Links</label>
            <label className="block font-bold">Linkedin</label>
            <input
              type="text"
              name="linkedin"
              value={localFormData.overview.social_links.linkedin || ''}
              onChange={handleOverviewChange}
              placeholder="LinkedIn URL"
              className="border w-full border-gray-300 p-2 rounded mb-2"
            />
            <label className="block font-bold">Telegram</label>
            <input
              type="text"
              name="telegram"
              value={localFormData.overview.social_links.telegram || ''}
              onChange={handleOverviewChange}
              placeholder="Telegram URL"
              className="border w-full border-gray-300 p-2 rounded mb-2"
            />
            <label className="block font-bold">Twitter</label>
            <input
              type="text"
              name="twitter"
              value={localFormData.overview.social_links.twitter || ''}
              onChange={handleOverviewChange}
              placeholder="Twitter URL"
              className="border w-full border-gray-300 p-2 rounded mb-2"
            />
          </div>

          {/* Contributors */}
          <div>
            <label className="block font-semibold">Contributors</label>
            {(localFormData.overview.contributors || []).map((item, index) => (
              <div key={index} className="border p-2 mt-2 rounded">
                <label className="block font-semibold">Contributor Name</label>
                <input
                  type="text"
                  value={item.name || ''}
                  onChange={(e) => handleArrayChange(e, index, 'overview.contributors', 'name')}
                  placeholder="Contributor Name"
                  className="border w-full border-gray-300 p-2 rounded mt-2"
                />
                <label className="block font-semibold">Contributor Role</label>
                <input
                  type="text"
                  value={item.role || ''}
                  onChange={(e) => handleArrayChange(e, index, 'overview.contributors', 'role')}
                  placeholder="Contributor Role"
                  className="border w-full border-gray-300 p-2 rounded mt-2"
                />

                {/* Tasks */}
                <div>
                  <label className="block font-semibold">Tasks</label>
                  {(item.tasks || []).map((task, taskIndex) => (
                    <input
                      key={taskIndex}
                      type="text"
                      value={task || ''}
                      onChange={(e) => handleTaskChange(e, index, taskIndex)}
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
                <button
                  type="button"
                  onClick={() => handleRemoveFromArray('overview.contributors', index)}
                  className="bg-red-500 text-white p-2 rounded mt-2"
                >
                  Delete Contributor
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddToArray('overview.contributors')}
              className="bg-blue-500 text-blue p-2 rounded mt-2"
            >
              Add Contributor
            </button>
          </div>

          {/* Jobs */}
          <div>
            <label className="block font-semibold">Jobs</label>
            {(localFormData.overview.jobs || []).map((job, index) => (
              <div key={index} className="border p-2 mt-2 rounded">
                <label className="block font-semibold">Job Title</label>
                <input
                  type="text"
                  value={job.job_title || ''}
                  onChange={(e) => handleArrayChange(e, index, 'overview.jobs', 'job_title')}
                  placeholder="Job Title"
                  className="border w-full border-gray-300 p-2 rounded mt-2"
                />
                <label className="block font-semibold">Job Description</label>
                <textarea
                  value={job.job_description || ''}
                  onChange={(e) => handleArrayChange(e, index, 'overview.jobs', 'job_description')}
                  placeholder="Job Description"
                  className="border w-full border-gray-300 p-2 rounded mt-2"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveFromArray('overview.jobs', index)}
                  className="bg-red-500 text-white p-2 rounded mt-2"
                >
                  Delete Job
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => handleAddToArray('overview.jobs')}
              className="bg-blue-500 text-blue p-2 rounded mt-2"
            >
              Add Job
            </button>
          </div>

          <Button type="submit" className="bg-green-500 text-white w-full mt-4">
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};
