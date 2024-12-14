import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Specialty_info } from '../../../lib/constants/home';
import { Text } from '../../ui/custom-ui/text';
import { Button } from '../../ui/button';

export const Specialty = () => {
  const navigate = useNavigate();
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`max-w-[1540px] w-full md:gap-8 gap-4 lg:px-[8rem] xl:px-[14rem] md:px-[4rem] md:py-[5rem] p-4 py-[3rem] ${
        inView ? 'animate-fadeInUp' : 'opacity-0'
      }`}
    >
      <Text as="h1" style="text-4xl font-semibold text-center mb-8">
        How It Works
      </Text>
      <Text as="h4" style="text-md text-center mb-8 w-full">
      Our platform connects startups, learners, mentors, and investors. Startups list projects, learners apply, and mentors guide the process to develop MVPs. Weekly shows highlight progress, while investors evaluate and fund promising ventures.
      </Text>
      <div className="flex flex-wrap gap-4 justify-center mb-4">
        {Specialty_info.map((info, index) => {
          const { title, img } = info;
          return (
            <div
              key={index}
              className={`flex flex-col gap-4 p-4 rounded-lg bg-[ghostwhite] md:w-[30%] w-full ${
                inView ? 'animate-fadeInUp' : 'opacity-0'
              }`}
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
    </div>
  );
};
