import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Services } from '../../../lib/constants/home';
import { Text } from '../../ui/custom-ui/text';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const Service = () => {
  const controls = useAnimation();
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          controls.start('visible');
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
  }, [controls]);

  return (
    <motion.div
      ref={sectionRef}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      <Text as="h1" style="text-4xl font-extrabold text-center mb-8">
        SERVICES
      </Text>
      <div className="service_herobg w-full">
        <div className="max-w-[1540px] grid md:grid-cols-2 grid-cols-1 md:gap-8 gap-4 lg:px-[8rem] md:px-[4rem] xl:px-[14rem] md:py-0 p-4">
          {Services.map((info, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center justify-center gap-4 p-8 shadow rounded-2xl bg-white"
              variants={itemVariants}
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
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
