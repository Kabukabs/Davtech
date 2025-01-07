import { AiOutlineLogout } from 'react-icons/ai';
import { Text } from '../../ui/custom-ui/text';

export const OngoingProjectCard = ({
  title,
  info,
  contributors,
  start_date,
  in_progress,
  img,
}) => {
  return (
    <div className="mt-2 border">
        <div className="p-4">
      <div className="w-full mb-4">
        <img src={img} alt="object not found" className="w-full" />
      </div>
      <Text as="h1" style="text-3xl font-semibold text-center mb-2">
        {title}
      </Text>
      <Text as="h1" style="text-md font-medium">
        {info}
      </Text>
      </div>
      <div className="flex justify-between flex-wrap gap-12">
        <div>
        <div className="px-4 py-2 text-white bg-blue flex items-center justify-center gap-4">
          Learn More <AiOutlineLogout color="white" />
        </div>
        </div>
        <div>
        <div className="px-4 py-2 text-white bg-blue flex items-center justify-center text-white">
          <Text as="h1" style="font-semibold">
            Area of Need
          </Text>
        </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 divide-x-2 border mt-4">
        <div className="divide-y-2 md:col-span-2 col-span-1 gap-4 w-full">
          <div className="flex justify-between items-center p-2 w-full">
            {'Start Date :'}
            <Text as="h5">
            {start_date}</Text>
          </div>
          <div className="flex justify-between items-center p-2 w-full">
            {'End Date :'}
            <Text as="h5">
            {in_progress}</Text>
          </div>
        </div>
        <div className="flex justify-between items-center p-2">
          {'Contributors :'}
          <Text as="h5">
            {contributors}</Text>
        </div>
      </div>
    </div>
  );
};
