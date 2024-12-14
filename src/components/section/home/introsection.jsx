import { useAppContext } from '../../../lib/context/app.context';
import { Text } from '../../ui/custom-ui/text';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const Introsection = () => {
  //const {showToast } = useAppContext();
  const navigate = useNavigate();
  const handleClick = () => {
    //showToast(<div>Hello, toast here!</div>);
    navigate('/contact us');
  };

  return (
    <div className="max-w-[1540px] grid md:grid-cols-2 grid-cols-1 lg:gap-[10rem] md:gap-[5rem] gap-4 md:py-[2rem] xl:px-[14rem] md:px-[4rem] px-4 py-[3rem]">
      <div className="w-full animate-fadeInLeft">
        <img src="/intro-hero.svg" alt="object not found" className="w-full" />
      </div>
      <div className="flex flex-col md:gap-[3rem] gap-[2rem] md:order-none order-first animate-fadeInRight">
        <div className="animate-fadeInUp">
          <Text
            as="h2"
            style="lg:text-2xl text-wrap md:text-2xl text-1xl font-extrabold"
          >
          Empowering Startups.
          </Text>
          <Text
            as="h2"
            style="lg:text-2xl text-wrap md:text-2xl text-1xl font-extrabold text-blue"
          >
          Connecting Talents.
          </Text>
          <Text
            as="h2"
            style="lg:text-2xl text-wrap md:text-2xl text-1xl font-extrabold"
          >
          Mentoring Talents.
          </Text>
          <Text
            as="h2"
            style="lg:text-2xl text-wrap md:text-2xl text-1xl font-extrabold text-blue"
          >
          Startups Investment.
          </Text>
          <Text
            as="h2"
            style="lg:text-2xl text-wrap md:text-2xl text-xl font-extrabold"
          >
            Connect. Collaborate. Innovate.
        
          </Text>
        </div>
        <div className="animate-fadeInUp flex justify-center">
          <Text
            as="h5"
           style="lg:text-1xl text-wrap md:text-1xl text-xl "
          >
            "Explore Opportunities and Let's create the future together."
          </Text>
        </div>
        <div className="grid grid-cols-2">
          <Button
            onClick={handleClick}
            className="text-blue border border-blue bg-[#F9FEFF] md:text-xl text-md font-semibol py-[1.5rem] rounded animate-fadeInUp"
          >
            Contact Us
          </Button>
        </div>
      </div>
    </div>
  );
};
