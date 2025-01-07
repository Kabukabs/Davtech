import { useNavigate } from 'react-router-dom';
import { Specialty_info } from '../../../lib/constants/home';
import { Text } from '../../ui/custom-ui/text';
import { Button } from '../../ui/button';

export const Specialty = () => {
  const navigate = useNavigate();
  return (
    <div className="max-w-[1540px] w-full md:gap-8 gap-4 lg:px-[8rem] xl:px-[14rem] md:px-[4rem] md:py-[5rem] p-4 py-[3rem]">
      <Text as="h1" style="text-4xl font-semibold text-center mb-8">
        Our Specialization
      </Text>
      <Text as="h4" style="text-md text-center mb-8 w-full">
        We specialize in developing software for investable industries across
        various sectors, including but not limited to:
      </Text>
      <div className="flex flex-wrap gap-4 justify-center mb-4">
        {Specialty_info.map((info, index) => {
          const { title, img } = info;
          return (
            <div
              key={index}
              className="flex flex-col gap-4 p-4 rounded-lg bg-[ghostwhite] md:w-[30%] w-full"
            >
              <div className="gap-2 flex items-center">
                <div className="w-[3rem]">
                  <img src={img} alt="object not found" className="w-full" />
                </div>
                <Text as="h1" style="text-md font-semibold text-lg">
                  {title}
                </Text>
              </div>
              <Text as="h5" style="text-sm text-center font-light">
                {info.info}
              </Text>
            </div>
          );
        })}
      </div>
      <div className="w-fit m-auto">
        <Button
          onClick={() => navigate('/about_us')}
          className="text-blue border border-[#F9FEFF] bg-[#F9FEFF] md:text-xl text-md font-semibol py-[1.5rem] rounded"
        >
          View More
        </Button>
      </div>
      <Text as="h5" style="md:text-md text-md text-center mt-4">
        Each sector benefits from our data-driven approach, helping stakeholders
        navigate uncertainties and capitalize on opportunities.
      </Text>
    </div>
  );
};
