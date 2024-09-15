/*
 * This React component, ProjectCard, is responsible for rendering an individual project card.
 * It displays project details like name, category, start date, progress, and compensation.
 * The component also allows the user to view more details, edit the project, and delete it via modals.
 * Animations are used to add fade-in effects and button interactions.
 */

import React, { useState, useEffect } from 'react';
import { Text } from '../ui/custom-ui/text'; // Custom Text component
import { Button } from '../ui/button'; // Custom Button component
import { Login } from 'iconsax-react'; // Icon for the 'Learn More' button
import { useSpring, animated, config } from 'react-spring'; // Animation library
import { LearnMore } from './learn-more'; // Component for the 'Learn More' modal
import { JobSection } from './job-section'; // Component for job-related functionality
import { EditModal } from './edit'; // Modal for editing the project
import { DeleteModal } from './delete'; // Modal for deleting the project
import { ModalWrapper } from '../ui/custom-ui/dialog-layout'; // Wrapper for modal dialogs

export const ProjectCard = ({ project }) => {
  // State to manage the loading state
  const [loading] = useState(false);
  // State to hold the currently selected project, updated when the project prop changes
  const [selectedProject, setSelectedProject] = useState(project);

  // Effect to update the selected project when the project prop changes
  useEffect(() => {
    setSelectedProject(project);
  }, [project]);

  // Animation for fading in the project card when it renders
  const fadeInProps = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: config.slow,
  });

  // Animation for buttons to scale up slightly when hovered
  const buttonSpring = useSpring({
    transform: 'scale(1)',
    from: { transform: 'scale(0.95)' },
    config: config.wobbly,
    reset: true,
  });

  // Render a loading message if data is still loading
  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  // Display a message if there is no project data
  if (!selectedProject) {
    return <div className="flex justify-center items-center h-full">No project data found.</div>;
  }

  // Destructure project properties with default values
  const {
    id,
    category = 'N/A',
    name = 'Unknown Project',
    start_date = 'N/A',
    progress = 'N/A',
    compensation = ['N/A'],
    overview = {},
  } = selectedProject;

  // Function to handle updating the project when edited
  const handleEdit = (updatedData) => {
    setSelectedProject(prev => ({
      ...prev,
      ...updatedData,
    }));
  };

  // Ensure compensation is always an array
  const compensationArray = Array.isArray(compensation) ? compensation : [compensation];

  return (
    <animated.div
      style={fadeInProps} // Apply fade-in animation to the card
      className="w-fit max-w-md mx-auto p-6 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-tl hover:from-gray-700 hover:via-gray-600 hover:to-gray-500"
    >
      <div className="flex flex-col items-center text-white">
        {/* Project image and name */}
        <div className="relative w-full h-24 mb-4 rounded-full overflow-hidden border-4 border-white">
          <img
            src="../../../public/project_img1.svg"
            alt="Project thumbnail"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-center text-xs py-1">
            {name.toUpperCase()}
          </div>
        </div>

        {/* Project category */}
        <Text as="h1" style="text-xl font-bold text-center uppercase tracking-wider">
          {category}
        </Text>

        {/* Project profile */}
        <Text as="p" style="text-center mt-2 text-sm italic opacity-80">
          {overview.profile || 'No profile available'}
        </Text>

        {/* Project details: start date, progress, and compensation */}
        <div className="mt-4 w-full text-sm text-gray-300">
          <div className="flex justify-between items-center border-b border-gray-500 py-2">
            <span>Start Date</span>
            <Text as="span" style="font-medium">{start_date}</Text>
          </div>
          <div className="flex justify-between items-center border-b border-gray-500 py-2">
            <span>Progress</span>
            <Text as="span" style="font-medium">{progress}</Text>
          </div>
          <div className="flex justify-between items-center border-b border-gray-500 py-2">
            <span>Compensation</span>
            <Text as="span" style="font-medium">{compensation.title}</Text>
          </div>
        </div>

        {/* Buttons for different modals (Learn More, Jobs, Edit, Delete) */}
        <div className="flex flex-wrap justify-center mt-6 gap-4 w-full">
          {/* Learn More Modal */}
          <ModalWrapper
            scrollable
            bigscreenwidth="max-w-4xl"
            trigger={
              <animated.div style={buttonSpring}>
                <Button className="flex gap-2 bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg hover:bg-gray-200">
                  LEARN MORE <Login size="20" color="gray-800" />
                </Button>
              </animated.div>
            }
          >
            <LearnMore
              title={name}
              social_links={overview?.social_links || []}
              profile={overview?.profile || 'No profile available'}
              vision_mission={overview?.vision_mission || []}
              contributors={overview?.contributors || []}
              compensation={compensationArray || []}
            />
          </ModalWrapper>

          {/* Jobs Modal */}
          <ModalWrapper
            title="Jobs"
            trigger={
              <animated.div style={buttonSpring}>
                <Button className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-lg hover:bg-gray-200">
                  Jobs
                </Button>
              </animated.div>
            }
          >
            <JobSection 
              jobs={overview?.jobs || []}
              projectId={id}
            />
          </ModalWrapper>

          {/* Edit Modal */}
          <ModalWrapper
            title="Edit"
            trigger={
              <animated.div style={buttonSpring}>
                <Button className="bg-green-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-green-500">
                  Edit
                </Button>
              </animated.div>
            }
          >
            <EditModal
              projectId={id}
              formData={{
                name: name || '',
                category: category || '',
                compensation: compensationArray || [],
                progress: progress || '',
                start_date: start_date || '',
                overview: {
                  profile: overview?.profile || 'No profile available',
                  vision_mission: overview?.vision_mission || [],
                  contributors: overview?.contributors || [],
                  compensation: overview?.compensation || [],
                  default_compensation: overview?.default_compensation || null,
                  social_links: overview?.social_links || [],
                  jobs: overview?.jobs || [],
                },
              }}
              setFormData={handleEdit}
            />
          </ModalWrapper>

          {/* Delete Modal */}
          <ModalWrapper
            title="Delete"
            trigger={
              <animated.div style={buttonSpring}>
                <Button className="bg-red-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-red-500">
                  Delete
                </Button>
              </animated.div>
            }
          >
            <DeleteModal projectId={id} />
          </ModalWrapper>
        </div>
      </div>
    </animated.div>
  );
};
