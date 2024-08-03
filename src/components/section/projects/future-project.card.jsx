import { AiOutlineLogout } from 'react-icons/ai';
import { Text } from '../../ui/custom-ui/text';

export const FutureProjectCard = ({ start_date, project_name, img }) => {
  return (
    <div className="border mt-2">
      <div className="w-full mb-4">
        <img src={img} alt="object not found" className="w-full" />
      </div>
      <Text as="h1" style="text-3xl font-semibold text-center mb-2">
        PROJECT OVERVIEW
      </Text>
      <div className="grid md:grid-cols-3 grid-cols-1 divide-x-2 border mt-4">
        <div className="divide-y-2 md:col-span-2 col-span-1 gap-4">
          <div className="flex justify-between items-center p-2">
            {'Project Name :'}
            <Text as="h5">{project_name.toUpperCase()}</Text>
          </div>
          <div className="flex justify-between items-center p-2">
            {'Expected Start Date :'}
            <Text as="h5">{start_date}</Text>
          </div>
        </div>
        <div className="flex items-center justify-center p-2 bg-blue text-white gap-2 md:flex-col flex-row">
          {"Learn more"}
            <AiOutlineLogout color="white" />
          </div>
      </div>
    </div>
  );
};
