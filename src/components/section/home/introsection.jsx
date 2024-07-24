import { useAppContext } from '../../../lib/context/app.context';
import { Text } from '../../ui/custom-ui/text';
import { Button } from '@/components/ui/button';

export const Introsection = () => {
  const {showToast } = useAppContext();
  return (
    <div className="max-w-[1540px] grid md:grid-cols-2 grid-cols-1 lg:gap-[10rem] md:gap-[5rem] gap-4 md:py-[2rem] xl:px-[14rem] md:px-[4rem] px-4 py-[3rem]">
      <div className="w-full ">
        <img src="/intro-hero.svg" alt="object not found" className="w-full" />
      </div>
      <div className="flex flex-col md:gap-[3rem] gap-[2rem] md:order-none order-first">
        <div>
          <Text
            as="h2"
            style="lg:text-5xl text-wrap md:text-4xl text-4xl font-extrabold"
          >
            EMPOWERING
          </Text>
          <Text
            as="h2"
            style="lg:text-5xl text-wrap md:text-4xl text-4xl font-extrabold text-blue"
          >
            INVESTMENT
          </Text>
          <Text
            as="h2"
            style="lg:text-5xl text-wrap md:text-4xl text-4xl font-extrabold"
          >
            THROUGH
          </Text>
          <Text
            as="h2"
            style="lg:text-5xl text-wrap md:text-4xl text-4xl font-extrabold text-blue"
          >
            DATA-DRIVEN
          </Text>
          <Text
            as="h2"
            style="lg:text-5xl text-wrap md:text-4xl text-4xl font-extrabold"
          >
            SOLUTIONS
          </Text>
        </div>
        <div>
          <Text
            as="h4"
            style="md:text-xl text-lg font-semibold lg:w-[75%] w-full"
          >
            Leveraging Web2 & Web3 Technologies For Investable Industry Success
          </Text>
        </div>
        <div className="grid grid-cols-2">
          <Button 
            onClick={()=>showToast(<div>helo toast here!</div>)}
            className="text-blue border border-blue bg-[#F9FEFF] md:text-xl text-md font-semibol py-[1.5rem] rounded">
            Sign Up
          </Button>
          {/* <Button className="text-white border bg-blue border border-blue md:text-xl text-md font-semibold py-[1.5rem] rounded mr-[-0.3rem]">
            Contact Us
          </Button> */}
        </div>
      </div>
    </div>
  );
};
