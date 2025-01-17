import { Partnership_info } from '../../../lib/constants/home';
import { Text } from '../../ui/custom-ui/text';
export const Partnership = () => {
  return (
    <div className="bg-[ghostwhite]  max-w-[1540px] md:gap-8 gap-4 lg:px-[8rem] xl:px-[14rem] md:px-[4rem] md:py-[4rem] px-4 py-[3rem]">
      <Text as="h1" style="text-4xl font-semibold mb-8 text-blue text-center">
        Partnership
      </Text>
      <Text as="h4" style="md:text-lg text-sm mb-8 text-[grey] text-center">
        At DavTechInvest, we believe in the strength of collaboration and are
        proud to partner with leading organizations that share our commitment to
        innovation and excellence. Our partnerships span across technology
        providers, industry associations, and academic institutions, fostering a
        rich ecosystem of knowledge and resources.
      </Text>
      <div className="flex flex-wrap gap-4 justify-center mb-4 ">
        {Partnership_info.map((info, index) => {
          const { title, img } = info;
          return (
            <div
              key={index}
              className="flex flex-col bg-white rounded-t-lg md:w-[30%] w-full justify-between items-center rounded-b-lg"
            >
              <div className="w-full p-4 bg-[#F9FEFF] h-[9rem] flex items-center flex-col rounded-t-lg">
                <div className="w-[7rem] p-4">
                  <img src={img} alt="object not found" className="w-full" />
                </div>
              </div>
              <div className="p-4 bg-white rounded-b-lg">
                <Text as="h1" style="text-lg mb-2 font-semibold text-lg">
                  {title}
                </Text>
                <Text as="h5" style="text-md text-[grey]">
                  {info.info}
                </Text>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
