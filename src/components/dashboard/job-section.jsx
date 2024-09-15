/*
  This component, `JobSection`, fetches and displays job listings associated with a project.
  It retrieves the job data from Firebase Firestore using the project ID passed as a prop.
  The component conditionally renders job listings or a message indicating that no jobs are available.
  Additionally, it includes animations using the `react-spring` library for fade-in and zoom effects.
  A modal for applying to jobs is provided via the `ApplyForJob` component.
*/

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../ui/custom-ui/text'; // Custom component to style headers
import { ModalWrapper } from '../ui/custom-ui/dialog-layout'; // Modal wrapper for form dialog
import { ApplyForJob } from './apply'; // Job application form component
import { useSpring, animated } from 'react-spring'; // React-spring for animations
import { getFirestore, doc, getDoc } from 'firebase/firestore'; // Firestore to fetch project data
import { app } from '/src/components/CareerForms/firebaseConfig'; // Firebase config

export const JobSection = ({ projectId, jobs = [] }) => {
  // State to store jobs and loading indicator
  const [setJobs] = useState(jobs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch jobs from Firestore if projectId is provided and jobs list is empty
    const fetchJobs = async () => {
      if (!projectId) {
        // Error handling if no projectId is passed
        console.error("Project ID is undefined");
        setLoading(false);
        return;
      }

      try {
        const db = getFirestore(app); // Initialize Firestore
        const projectRef = doc(db, 'projects', projectId); // Reference to the project document
        const projectSnapshot = await getDoc(projectRef); // Fetch the project document

        if (projectSnapshot.exists()) {
          const projectData = projectSnapshot.data(); // Retrieve data from the snapshot
          console.log('Project Data:', projectData);

          // Directly use the jobs array from the Firestore document
          setJobs(projectData.jobs || []);
        } else {
          console.error("No such document exists!"); // Error if project doesn't exist
        }
      } catch (error) {
        console.error("Error fetching project data: ", error); // Handle Firestore fetch errors
      } finally {
        setLoading(false); // Stop loading indicator once the fetch is complete
      }
    };

    // If jobs are not passed as a prop, fetch them from Firestore
    if (!jobs.length) {
      fetchJobs();
    } else {
      setLoading(false); // If jobs are already available, stop loading
    }
  }, [projectId, jobs]);

  // Animation for fade-in effect
  const fadeInProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  // Animation for zoom effect when hovering
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
      {/* Display loading text or job listings */}
      {loading ? (
        <p className="text-center">Loading job listings...</p>
      ) : (
        <div className="flex flex-col gap-4">
          {jobs.length > 0 ? (
            // Map through the list of jobs and display each job
            jobs.map((job, index) => (
              <animated.div style={fadeInProps} className="grid md:grid-cols-5 grid-cols-1 text-sm" key={index}>
                {/* Job title */}
                <div className="col-span-1 text-black bg-grey flex justify-center items-center text-center">
                  {job.job_title || 'No title available'} {/* Show title or fallback */}
                </div>
                <div className="md:col-span-4 col-span-1 border">
                  <div className="flex justify-between w-full">
                    {/* Job description */}
                    <div className="flex items-center px-2 flex-grow">
                      <div className="flex-grow truncate md:w-[10rem] w-[5rem]">
                        {job.job_description || 'No description available'} {/* Show description or fallback */}
                      </div>
                    </div>
                    {/* Apply button triggers a modal with job application form */}
                    <ModalWrapper
                      trigger={
                        <animated.div style={zoomProps} className="bg-blue text-white p-4 text-sm cursor-pointer">
                          Apply
                        </animated.div>
                      }
                    >
                      {/* Pass job title to ApplyForJob component in the modal */}
                      <ApplyForJob jobTitle={job.job_title} />
                    </ModalWrapper>
                  </div>
                </div>
              </animated.div>
            ))
          ) : (
            // Fallback message if no jobs are available
            <p className="text-center">No job listings available at the moment.</p>
          )}
        </div>
      )}
      {/* Link to additional resources */}
      <div className="md:text-md text-sm gap-2 mt-4">
        Add Link to relevant resources:{' '}
        <Link to="/" className="text-blue text-none mx-2">
          CLICK HERE
        </Link>
      </div>
    </div>
  );
};
