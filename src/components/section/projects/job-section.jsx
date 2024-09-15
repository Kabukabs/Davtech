/*
  The `JobSection` component displays a list of job listings for a given project.
  It fetches job data from Firestore if not provided via props, displays the jobs with animations, 
  and provides a modal to apply for a job. It also includes a link to relevant resources.
  The component uses `react-spring` for animations and Firebase Firestore for data retrieval.
*/

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../../ui/custom-ui/text'; // Custom text component
import { ModalWrapper } from '../../ui/custom-ui/dialog-layout'; // Custom modal component
import { ApplyForJob } from './apply'; // Component for job application
import { useSpring, animated } from 'react-spring'; // Animation library
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Firestore methods
import { app } from '/src/components/CareerForms/firebaseConfig'; // Firebase app configuration

export const JobSection = ({ projectId, jobs = [] }) => {
  const [setJobs] = useState(jobs); // State to manage job listings
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    // Fetch jobs from Firestore if projectId is provided and jobs are not passed as props
    const fetchJobs = async () => {
      if (!projectId) {
        console.error("Project ID is undefined");
        setLoading(false);
        return;
      }

      try {
        const db = getFirestore(app); // Get Firestore database instance
        const projectRef = doc(db, 'projects', projectId); // Reference to the project document
        const projectSnapshot = await getDoc(projectRef); // Fetch the project document

        if (projectSnapshot.exists()) {
          const projectData = projectSnapshot.data(); // Retrieve project data
          console.log('Project Data:', projectData);

          // Directly use the jobs from projectData
          setJobs(projectData.jobs || []);
        } else {
          console.error("No such document exists!");
        }
      } catch (error) {
        console.error("Error fetching project data: ", error); // Error handling
      } finally {
        setLoading(false);
      }
    };

    if (!jobs.length) {
      fetchJobs(); // Fetch jobs if not already provided
    } else {
      setLoading(false);
    }
  }, [projectId, jobs]); // Dependency array ensures effect runs when projectId or jobs change

  // Animation for fading in job listings
  const fadeInProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  // Animation for zoom effect on Apply button
  const zoomProps = useSpring({
    transform: 'scale(1.1)',
    from: { transform: 'scale(1)' },
    config: { tension: 200, friction: 10 },
    reset: true,
  });

  return (
    <div>
      {/* Section title */}
      <Text
        as="h6"
        style="text-center text-blue md:text-2xl font-extrabold border-b-2 border-blue mb-8 w-fit m-auto"
      >
        JOB SECTION
      </Text>
      {loading ? (
        <p className="text-center">Loading job listings...</p>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Display job listings or a message if no jobs are available */}
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <animated.div style={fadeInProps} className="grid md:grid-cols-5 grid-cols-1 text-sm" key={index}>
                <div className="col-span-1 text-black bg-grey flex justify-center items-center text-center">
                  {job.job_title || 'No title available'} {/* Display job title */}
                </div>
                <div className="md:col-span-4 col-span-1 border">
                  <div className="flex justify-between w-full">
                    <div className="flex items-center px-2 flex-grow">
                      <div className="flex-grow truncate md:w-[10rem] w-[5rem]">
                        {job.job_description || 'No description available'} {/* Display job description */}
                      </div>
                    </div>
                    <ModalWrapper
                      trigger={
                        <animated.div style={zoomProps} className="bg-blue text-white p-4 text-sm cursor-pointer">
                          Apply {/* Trigger for modal */}
                        </animated.div>
                      }
                    >
                      <ApplyForJob jobTitle={job.job_title} /> {/* Modal content */}
                    </ModalWrapper>
                  </div>
                </div>
              </animated.div>
            ))
          ) : (
            <p className="text-center">No job listings available at the moment.</p>
          )}
        </div>
      )}
      {/* Link to relevant resources */}
      <div className="md:text-md text-sm gap-2 mt-4">
        Add Link to relevant resources:{' '}
        <Link to="/" className="text-blue text-none mx-2">
          CLICK HERE
        </Link>
      </div>
    </div>
  );
};
