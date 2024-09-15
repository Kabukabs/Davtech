/*
 * The LearnMore component provides a detailed view of a project's information, including its profile, vision & mission,
 * development roadmap, contributors, compensation, and social media links. It uses React Spring for animations and 
 * presents this data in a structured format with various layout components.
 */

import React, { useState } from 'react';
import { useSpring, useTrail, animated, config } from 'react-spring'; // Animations from react-spring
import { Text } from '../ui/custom-ui/text'; // Custom Text component for styling text elements
import { TableCell, TableRow } from '@/components/ui/table'; // Custom table elements
import { TableLayout } from '../ui/custom-ui/table-layout'; // Layout for rendering tabular data
import { ProjectsJson } from './project.js'; // JSON data for the project

// Image paths for social media icons
const twitterImg = '../../../public/twitter-alt-square_12107611.svg';
const telegramImg = '../../../public/telegram_4401433.svg';
const linkedinImg = '../../../public/linkedin_3991775.svg';

export const LearnMore = ({ 
  title = '', // Project title
  profile = '', // Company profile text
  vision_mission = [], // Array of vision and mission statements
  contributors = [], // Array of contributors to the project
  compensation = [], // Array of compensation packages
  social_links = [], // Social media links object (Twitter, Telegram, LinkedIn)
}) => {
  const [selectedCompensation, setSelectedCompensation] = useState(null); // State for tracking selected compensation

  // Spring animation for fading elements in
  const fadeInProps = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: config.slow,
  });

  // Trail animation for roadmap items (from the project's development roadmap)
  const roadmapTrail = useTrail(ProjectsJson[0].overview.developement_roadmap.length, {
    transform: 'scale(1)',
    from: { transform: 'scale(0.9)' },
    config: config.default,
    reset: true,
  });

  // Spring animation for social media icons
  const socialSpring = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1500 },
    delay: 1000,
  });

  return (
    <div>
      {/* Project overview header */}
      <animated.div style={fadeInProps}>
        <Text as="h6" style="text-center text-black lg:text-4xl font-extrabold md:text-2xl text-xl mb-4">
          {`${title.toUpperCase()} PROJECT OVERVIEW`}
        </Text>
      </animated.div>

      {/* Company profile section */}
      <animated.div style={fadeInProps}>
        <Text as="h6" style="text-black lg:text-lg md:text-md text-md">COMPANY PROFILE:</Text>
        <Text as="p" style="text-black md:text-sm text-xs">{profile}</Text>
      </animated.div>

      {/* Vision and Mission section */}
      <animated.div style={fadeInProps}>
        <Text as="h6" style="text-black lg:text-lg md:text-md text-sm">VISION AND MISSION:</Text>
        <ul className="list-disc md:text-sm text-xs space-y-2">
          {vision_mission.map((info, index) => (
            <li key={index}>{info.text || info || 'No info available'}</li>
          ))}
        </ul>
      </animated.div>

      {/* Development roadmap section */}
      <animated.div style={fadeInProps}>
        <Text as="h6" style="text-center text-black lg:text-2xl font-extrabold md:text-xl text-lg mb-4 mt-12">
          DEVELOPMENT ROADMAP
        </Text>
        <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-4">
          {/* Loop over roadmap data and animate each item */}
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

      {/* Contributors section */}
      <animated.div style={fadeInProps}>
        <Text as="h6" style="text-center text-black lg:text-2xl font-extrabold md:text-xl text-lg mb-4 mt-12">
          CONTRIBUTORS
        </Text>
        <TableLayout tableHeadRow={['NAMES', 'ROLES', 'TASKS AND CONTRIBUTIONS']}>
          {/* Render each contributor in a table row */}
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

      {/* Compensation section */}
      <animated.div style={fadeInProps}>
        <Text as="h6" style="text-center text-black lg:text-2xl font-extrabold md:text-xl text-lg mb-4 mt-12">
          COMPENSATION
        </Text>
        <div>
          {/* Render each compensation item */}
          {compensation.map((item, index) => (
            <div className="flex flex-col gap-4 p-4 border justify-center text-center rounded-lg" key={index}>
              <Text as="h6" style="font-semibold">{item.title || 'N/A'}</Text>
              <Text style="text-sm" as="p">{item.description || 'N/A'}</Text>
            </div>
          ))}
        </div>
      </animated.div>

      {/* Social media links section */}
      <animated.div style={socialSpring} className="mt-[5rem]">
        <Text as="h6" style="text-center text-black mb-4">Connect with us</Text>
        <div className="flex justify-center gap-4">
          {/* Render each social media icon if the link is available */}
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
