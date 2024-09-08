import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../ui/custom-ui/text';
import { ModalWrapper } from '../ui/custom-ui/dialog-layout';
import { ApplyForJob } from './apply';
import { useSpring, animated } from 'react-spring';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { app } from '/src/components/CareerForms/firebaseConfig';

export const JobSection = ({ projectId, jobs = [] }) => {
  const [setJobs] = useState(jobs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      if (!projectId) {
        console.error("Project ID is undefined");
        setLoading(false);
        return;
      }

      try {
        const db = getFirestore(app);
        const projectRef = doc(db, 'projects', projectId);
        const projectSnapshot = await getDoc(projectRef);

        if (projectSnapshot.exists()) {
          const projectData = projectSnapshot.data();
          console.log('Project Data:', projectData);

          // Directly use the jobs from projectData
          setJobs(projectData.jobs || []);
        } else {
          console.error("No such document exists!");
        }
      } catch (error) {
        console.error("Error fetching project data: ", error);
      } finally {
        setLoading(false);
      }
    };

    if (!jobs.length) {
      fetchJobs();
    } else {
      setLoading(false);
    }
  }, [projectId, jobs]);

  const fadeInProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1000 },
  });

  const zoomProps = useSpring({
    transform: 'scale(1.1)',
    from: { transform: 'scale(1)' },
    config: { tension: 200, friction: 10 },
    reset: true,
  });

  return (
    <div>
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
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <animated.div style={fadeInProps} className="grid md:grid-cols-5 grid-cols-1 text-sm" key={index}>
                <div className="col-span-1 text-black bg-grey flex justify-center items-center text-center">
                  {job.job_title || 'No title available'}
                </div>
                <div className="md:col-span-4 col-span-1 border">
                  <div className="flex justify-between w-full">
                    <div className="flex items-center px-2 flex-grow">
                      <div className="flex-grow truncate md:w-[10rem] w-[5rem]">
                        {job.job_description || 'No description available'}
                      </div>
                    </div>
                    <ModalWrapper
                      trigger={
                        <animated.div style={zoomProps} className="bg-blue text-white p-4 text-sm cursor-pointer">
                          Apply
                        </animated.div>
                      }
                    >
                      <ApplyForJob jobTitle={job.job_title} />
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
      <div className="md:text-md text-sm gap-2 mt-4">
        Add Link to relevant resources:{' '}
        <Link to="/" className="text-blue text-none mx-2">
          CLICK HERE
        </Link>
      </div>
    </div>
  );
};
