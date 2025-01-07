import { Services } from '../../../lib/constants/home';
import { Text } from '../../ui/custom-ui/text';

export const Service = () => {
  return (
    <div>
      <Text as="h1" style="text-4xl font-extrabold text-center mb-8">
        SERVICES
      </Text>
      <div className="service_herobg w-full">
        <div className="max-w-[1540px] grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4 lg:px-[8rem] md:px-[4rem] xl:px-[14rem] md:py-0 p-4">
          {Services.map((info, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center gap-4 p-8 shadow rounded-2xl bg-white"
            >
              <div className="md:w-[8rem] w-[5rem]">
                <img src={info.img} alt="object not found" className="w-full" />
              </div>
              <Text as="h2" style="text-xl font-semibold text-center">
                {info.title}
              </Text>
              <Text as="h3" style="md:text-md text-sm text-center">
                {info.info}
              </Text>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
