import React, { useState } from 'react';
import { useSpring, useTrail, animated, config } from 'react-spring';
import { Text } from '../ui/custom-ui/text';
import { TableCell, TableRow } from '@/components/ui/table';
import { TableLayout } from '../ui/custom-ui/table-layout';
import { ProjectsJson } from './project.js';

const twitterImg = '../../../public/twitter-alt-square_12107611.svg';
const telegramImg = '../../../public/telegram_4401433.svg';
const linkedinImg = '../../../public/linkedin_3991775.svg';

export const LearnMore = ({ 
  title = '', 
  profile = '', 
  vision_mission = [], 
  contributors = [],
  compensation = [],
  social_links = [],
}) => {
  const [selectedCompensation, setSelectedCompensation] = useState(null);

  const fadeInProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: config.slow,
  });

  const roadmapTrail = useTrail(ProjectsJson[0].overview.developement_roadmap.length, {
    transform: 'scale(1)',
    from: { transform: 'scale(0.9)' },
    config: config.default,
    reset: true,
  });

  const socialSpring = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1500 },
    delay: 1000,
  });

  return (
    <div>
      <animated.div style={fadeInProps}>
        <Text as="h6" style="text-center text-black lg:text-4xl font-extrabold md:text-2xl text-xl mb-4">
          {`${title.toUpperCase()} PROJECT OVERVIEW`}
        </Text>
      </animated.div>

      <animated.div style={fadeInProps}>
        <Text as="h6" style="text-black lg:text-lg md:text-md text-md">COMPANY PROFILE:</Text>
        <Text as="p" style="text-black md:text-sm text-xs">{profile}</Text>
      </animated.div>

      <animated.div style={fadeInProps}>
        <Text as="h6" style="text-black lg:text-lg md:text-md text-sm">VISION AND MISSION:</Text>
        <ul className="list-disc md:text-sm text-xs space-y-2">
          {vision_mission.map((info, index) => (
            <li key={index}>{info.text || info || 'No info available'}</li>
          ))}
        </ul>
      </animated.div>

      <animated.div style={fadeInProps}>
        <Text as="h6" style="text-center text-black lg:text-2xl font-extrabold md:text-xl text-lg mb-4 mt-12">
          DEVELOPMENT ROADMAP
        </Text>
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4">
          {ProjectsJson[0].overview.developement_roadmap.length > 0 && roadmapTrail.map((style, index) => (
            <animated.div key={index} style={style} className="flex flex-col items-center justify-center">
              <div className="w-[7rem]">
                <img
                  src={ProjectsJson[0].overview.developement_roadmap[index]?.img || '/default-img.png'}
                  alt="Roadmap item"
                  className="w-full"
                />
              </div>
              <Text as="h4" style="text-center text-black md:text-sm text-xl mt-2">
                {ProjectsJson[0].overview.developement_roadmap[index]?.title?.toUpperCase() || 'N/A'}
              </Text>
            </animated.div>
          ))}
        </div>
      </animated.div>

      <animated.div style={fadeInProps}>
        <Text as="h6" style="text-center text-black lg:text-2xl font-extrabold md:text-xl text-lg mb-4 mt-12">
          CONTRIBUTORS
        </Text>
        <TableLayout tableHeadRow={['NAMES', 'ROLES', 'TASKS AND CONTRIBUTIONS']}>
          {contributors.map((info, index) => (
            <TableRow key={index} className="text-black">
              <TableCell className="font-medium">{info.name || 'N/A'}</TableCell>
              <TableCell className="font-medium">{info.role || 'N/A'}</TableCell>
              <TableCell className="font-medium">
                <ul className="list-disc space-y-2">
                  {Array.isArray(info.tasks) && info.tasks.length > 0 ? (
                    info.tasks.map((details, idx) => (
                      <li key={idx}>{details || 'N/A'}</li>
                    ))
                  ) : (
                    <li>N/A</li>
                  )}
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </TableLayout>
      </animated.div>

      <animated.div style={fadeInProps}>
        <Text as="h6" style="text-center text-black lg:text-2xl font-extrabold md:text-xl text-lg mb-4 mt-12">
          COMPENSATION
        </Text>
        <div>
          {compensation.map((item, index) => (
            <div className="flex flex-col gap-4 p-4 border justify-center text-center rounded-lg" key={index}>
              <Text as="h6" style="font-semibold">{item.title || 'N/A'}</Text>
              <Text style="text-sm" as="p">{item.description || 'N/A'}</Text>
            </div>
          ))}
        </div>
      </animated.div>

      <animated.div style={socialSpring} className="mt-[5rem]">
        <Text as="h6" style="text-center text-black mb-4">Connect with us</Text>
        <div className="flex justify-center gap-4">
          {social_links.twitter && (
            <a href={social_links.twitter} target="_blank" rel="noopener noreferrer">
              <img src={twitterImg} alt="Twitter" className="w-8 h-8 cursor-pointer" />
            </a>
          )}
          {social_links.telegram && (
            <a href={social_links.telegram} target="_blank" rel="noopener noreferrer">
              <img src={telegramImg} alt="Telegram" className="w-8 h-8 cursor-pointer" />
            </a>
          )}
          {social_links.linkedin && (
            <a href={social_links.linkedin} target="_blank" rel="noopener noreferrer">
              <img src={linkedinImg} alt="LinkedIn" className="w-8 h-8 cursor-pointer" />
            </a>
          )}
        </div>
      </animated.div>
    </div>
  );
};
