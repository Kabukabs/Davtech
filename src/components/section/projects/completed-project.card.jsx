import { AiOutlineLogout } from 'react-icons/ai';
import { Text } from '../../ui/custom-ui/text';

export const CompletedProjectCard = ({
  title,
  info,
  contributors,
  start_date,
  end_date,
  img,
}) => {
  return (
    <div className="grid gap-12 md:grid-cols-2 grid-cols-1 mb-2">
      <div className=" border rounded">
        <div className="p-4">
          <Text as="h1" style="text-3xl font-semibold text-center mb-2">
            {title}
          </Text>
          <Text as="h1" style="text-md font-medium">
            {info}
          </Text>
        </div>
        <div className="grid gap-4 md:grid-cols-2 grid-cols-1 mt-8">
          <div>
            <div className=" gap-4 flex justify-between items-center mb-4 border  p-2 w-full border">
              {'Contributors :'}
              <Text as="h5">{contributors}</Text>
            </div>
            <div className="flex flex-col p-2 border gap-4">
              <div className=" gap-4 flex justify-between items-center w-full">
                {'Start Date :'}
                <Text as="h5">{start_date}</Text>
              </div>
              <div className=" gap-4 flex justify-between items-center w-full">
                {'End Date :'}
                <Text as="h5">{end_date}</Text>
              </div>
            </div>
          </div>
          <div className="p-4 bg-blue flex items-center justify-center md:flex-col flex-row text-white gap-2 rounded">
            {'Learn more'}
            <AiOutlineLogout color="white" />
          </div>
        </div>
      </div>
      <div>
        <div className="w-full ">
          <img src={img} alt="object not found" className="w-full" />
        </div>
      </div>
    </div>
  );
};
