import { Link } from 'react-router-dom';
import { Text } from '../../ui/custom-ui/text';
import { ModalWrapper } from '../../ui/custom-ui/dialog-layout';
import { ApplyForJob } from './apply';

export const Job_Section = ({ jobs }) => {
  return (
    <div>
      <Text
        as="h6"
        style=" text-center text-blue md:text-2xl font-extrabold border-b-2 border-blue mb-8 w-fit m-auto"
      >
        JOB SECTION
      </Text>
      <div className="flex flex-col gap-4">
        {jobs.map((job, index) => (
          <div className="grid md:grid-cols-5 grid-cols-1 text-sm" key={index}>
            <div className="col-span-1 text-black bg-grey flex justify-center items-center text-center">
              {job.title}
            </div>
            <div className="md:col-span-4 col-span-1 border">
              <div className="flex justify-between w-full">
                <div className="flex items-center px-2 flex-grow">
                  <div className="flex-grow truncate md:w-[10rem] w-[5rem]">{job.desc}</div>
                  <div className="text-blue text-nowrap">View More</div>
                </div>
                <ModalWrapper
                  trigger={
                    <div className="bg-blue text-white p-4 text-sm">Apply</div>
                  }
                >
                  <ApplyForJob />
                </ModalWrapper>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="md:text-md text-sm gap-2 mt-4">
        Add Link to relevante resources :{' '}
        <Link to="/" className="text-blue text-none mx-2">
          CLICK HERE
        </Link>
      </div>
    </div>
  );
};
