import { Text } from '../../ui/custom-ui/text';
import { Button } from '../../ui/button';
import { Login } from 'iconsax-react';
import { ModalWrapper } from '../../ui/custom-ui/dialog-layout';
import { LearnMore } from './learn-more';
import { Job_Section } from './job-section';
import { useSpring, animated, config } from 'react-spring';

export const ProjectCard = ({
  category,
  name,
  img,
  start_date,
  progress,
  compensation,
  overview,
}) => {
  // Fade-in and scale-up animation for the whole card
  const fadeInProps = useSpring({
    opacity: 1,
    transform: 'scale(1)',
    from: { opacity: 0, transform: 'scale(0.95)' },
    config: config.slow,
  });

  // Button hover and click animations
  const buttonSpring = useSpring({
    transform: 'scale(1)',
    from: { transform: 'scale(0.95)' },
    config: config.default,
    reset: true,
  });

  // Hover effect for card items
  const hoverProps = useSpring({
    transform: 'scale(1.05)',
    from: { transform: 'scale(1)' },
    config: config.default,
    reset: true,
  });

  return (
    <animated.div style={fadeInProps} className="flex flex-col gap-4 justify-center items-center">
      <animated.div
        style={hoverProps}
        className="flex flex-col gap-[0.5rem] justify-center items-center bg-lightblue pb-4 transition-transform duration-300"
      >
        <Text
          as="h1"
          style="text-lg font-semibold text-center mb-2 text-white drop-shadow-md"
        >
          {category.toUpperCase()}
        </Text>
        <div className="relative m-auto">
          <div className="w-[7rem]">
            <img src={img} alt="object not found" className="w-full" />
          </div>
          <div className="mx-2 p-1 bg-blue text-white absolute bottom-0 left-[1px] right-[1px]">
            <Text
              as="h4"
              style="text-center text-white text-[0.7rem] text-wrap w-[6rem] truncate"
            >
              {name.toUpperCase()}
            </Text>
          </div>
        </div>
        <div className="md:p-0 p-2">
          <Text as="h6" style="text-center text-black text-xs">
            You can now add a project for collaborators or join an existing
            project as a collaborator. Click here to add a project or view
            available projects for collaboration.
          </Text>
        </div>
      </animated.div>
      <div className="w-full text-sm text-wrap md:text-sm text-xs">
        <div className="font-semibold flex justify-between items-center p-2 w-full">
          {'Start Date'}
          <Text style="font-medium" as="h5">
            {start_date}
          </Text>
        </div>
        <div className="font-semibold flex justify-between items-center p-2 w-full">
          {'Progress'}
          <Text style="font-medium" as="h5">
            {progress}
          </Text>
        </div>
        <div className="font-semibold flex justify-between items-center p-2 w-full">
          {'Compensation'}
          <Text style="font-medium" as="h5">
            {compensation}
          </Text>
        </div>
      </div>
      <div className="w-full flex items-center justify-between">
        <ModalWrapper
          scrollable
          bigscreenwidth={'max-w-4xl'}
          trigger={
            <animated.div style={buttonSpring}>
              <Button className="flex gap-2 bg-blue md:text-sm text-xs">
                LEARN MORE <Login size="20" color="white" />
              </Button>
            </animated.div>
          }
        >
          <LearnMore
            title={name}
            social_links={overview?.social_links}
            profile={overview?.profile}
            vision_mission={overview?.vision_mission}
            developement_roadmap={overview?.developement_roadmap}
            contributors={overview?.contributors}
            compensation={overview?.compensation}
            default_compensation={overview?.default_compensation}
          />
        </ModalWrapper>
        <ModalWrapper
          trigger={
            <animated.div style={buttonSpring}>
              <Button className="bg-blue md:text-sm text-xs">JOBS</Button>
            </animated.div>
          }
          bigscreenwidth={'max-w-xl'}
        >
          <Job_Section jobs={overview?.jobs} />
        </ModalWrapper>
      </div>
    </animated.div>
  );
};
