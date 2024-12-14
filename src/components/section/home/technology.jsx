import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../../ui/custom-ui/text';

export const Technology = () => {
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
      className={`max-w-[1540px] md:gap-8 gap-4 lg:px-[8rem] xl:px-[14rem] md:px-[4rem] md:py-[5rem] p-4 py-[3rem] ${
        inView ? 'animate-fadeIn' : 'opacity-0'
      }`}
    >
      <div className="gap-12 grid md:grid-cols-2 grid-cols-1">
        <div>
          <Text as="h2" style="text-2xl font-extrabold mb-8 text-blue">
            Overview
          </Text>
          <Text as="h6" style="md:text-lg text-md mb-8">
          Our platform connects startups, tech learners, mentors, and investors to foster growth by providing industry data insights, collaboration opportunities, mentorship, and investment support.
          </Text>
          <div className="md:text-lg text-sm font-semibold gap-2">
          Join us,  
            <Link to="/contact us" className="text-blue text-none mx-2">
              Contact us
            </Link>{' '}
            today Let's build something great together!
          </div>
        </div>
        <div>
          <div className={`w-full ${inView ? 'animate-fadeInUp' : 'opacity-0'}`}>
            <img
              src="/technology.jpg"
              alt="object not found"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
