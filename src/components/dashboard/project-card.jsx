import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../ui/custom-ui/text';
import { Button } from '../ui/button';
import { Login } from 'iconsax-react';
import { useSpring, animated, config } from 'react-spring';
import { LearnMore } from './learn-more';
import { JobSection } from './job-section';
import { EditModal } from './edit';
import { DeleteModal } from './delete';
import { ModalWrapper } from '../ui/custom-ui/dialog-layout';

export const ProjectCard = ({ project }) => {
  const [loading, setLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState(project);

  useEffect(() => {
    setSelectedProject(project);
  }, [project]);

  const fadeInProps = useSpring({
    opacity: 1,
    transform: 'translateY(0)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: config.slow,
  });

  const buttonSpring = useSpring({
    transform: 'scale(1)',
    from: { transform: 'scale(0.95)' },
    config: config.wobbly,
    reset: true,
  });

  if (loading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  if (!selectedProject) {
    return <div className="flex justify-center items-center h-full">No project data found.</div>;
  }

  const {
    id,
    category = 'N/A',
    name = 'Unknown Project',
    start_date = 'N/A',
    progress = 'N/A',
    compensation = ['N/A'],
    overview = {},
  } = selectedProject;

  const handleEdit = (updatedData) => {
    setSelectedProject(prev => ({
      ...prev,
      ...updatedData,
    }));
  };

  // Ensure compensation is an array
  const compensationArray = Array.isArray(compensation) ? compensation : [compensation];

  return (
    <animated.div
      style={fadeInProps}
      className="w-fit max-w-md mx-auto p-6 bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-tl hover:from-gray-700 hover:via-gray-600 hover:to-gray-500"
    >
      <div className="flex flex-col items-center text-white">
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

        <Text as="h1" style="text-xl font-bold text-center uppercase tracking-wider">
          {category}
        </Text>

        <Text as="p" style="text-center mt-2 text-sm italic opacity-80">
          {overview.profile || 'No profile available'}
        </Text>

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

        <div className="flex flex-wrap justify-center mt-6 gap-4 w-full">
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
